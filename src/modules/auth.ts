/**
 * Google Auth Integration
 */
import { NotificationManager } from './notifications';

declare const google: any;

/** Maximum retries for waiting on Google library */
const GOOGLE_LIB_MAX_RETRIES = 50; // 50 * 100ms = 5 seconds

export const AuthManager = {
    user: null as any,
    googleClientId: '908543213432-7t6krf6iksi8tfoh4pu4mgulfs5lk34r.apps.googleusercontent.com',
    googleSheetsEndpoint: 'https://script.google.com/macros/s/AKfycbxUJ6mzP1jubnhHK31Y_74FY6EIG61MdJW8VlrBX56r6hK2-Ing3EW_9o7uHs--9_3t/exec',

    init() {
        console.log('[AuthManager] Initializing...');

        // Check for existing session
        const storedUser = localStorage.getItem('jufipai_user');
        if (storedUser) {
            try {
                this.user = JSON.parse(storedUser);
                this.showUserProfile();
                console.log('[AuthManager] Restored session for:', this.user.name);
            } catch {
                localStorage.removeItem('jufipai_user');
            }
        }

        // Wait for Google library to load
        this.waitForGoogleLibrary();

        // Sign out handler
        document.getElementById('signOutBtn')?.addEventListener('click', () => {
            this.signOut();
        });

        console.log('[AuthManager] Initialized');
    },

    googleLibRetries: 0,

    waitForGoogleLibrary() {
        if (typeof google !== 'undefined' && google.accounts) {
            this.googleLibRetries = 0;
            this.initializeGoogleSignIn();
        } else {
            this.googleLibRetries++;
            if (this.googleLibRetries >= GOOGLE_LIB_MAX_RETRIES) {
                console.warn('[AuthManager] Google Sign-In library failed to load after timeout');
                this.showAuthError('Sign-in unavailable');
                return;
            }
            // Retry after a short delay
            setTimeout(() => this.waitForGoogleLibrary(), 100);
        }
    },

    initializeGoogleSignIn() {
        try {
            google.accounts.id.initialize({
                client_id: this.googleClientId,
                callback: this.handleCredentialResponse.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true
            });

            // Render the sign-in button if user is not signed in
            if (!this.user) {
                google.accounts.id.renderButton(
                    document.getElementById('googleSignInBtn'),
                    {
                        theme: 'filled_blue',
                        size: 'medium',
                        text: 'signin_with',
                        shape: 'pill',
                        width: 200
                    }
                );
            }

            // Clear any previous auth error indicator
            this.clearAuthError();
            console.log('[AuthManager] Google Sign-In button rendered');
        } catch (err) {
            console.error('[AuthManager] Failed to initialize Google Sign-In:', err);
            this.showAuthError('Sign-in failed to load');
        }
    },

    handleCredentialResponse(response: any) {
        console.log('[AuthManager] Credential response received');

        try {
            // Decode JWT token
            const payload = this.decodeJWT(response.credential);

            this.user = {
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                sub: payload.sub,
                signedInAt: new Date().toISOString()
            };

            // Store locally
            localStorage.setItem('jufipai_user', JSON.stringify(this.user));

            // Send to backend (Google Sheets)
            this.storeUserToSheets();

            // Update UI
            this.showUserProfile();

            // Show welcome message
            NotificationManager.showToast(`Welcome, ${this.user.name.split(' ')[0]}!`, 'success');

            console.log('[AuthManager] User signed in:', this.user.name);
        } catch (err) {
            console.error('[AuthManager] Failed to process credential:', err);
            NotificationManager.showToast('Sign-in failed. Please try again.', 'error');
        }
    },

    decodeJWT(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join('')
        );
        return JSON.parse(jsonPayload);
    },

    showUserProfile() {
        const signInBtn = document.getElementById('googleSignInBtn');
        const profile = document.getElementById('userProfile');
        const avatar = document.getElementById('userAvatar') as HTMLImageElement;
        const name = document.getElementById('userName');

        if (signInBtn) signInBtn.style.display = 'none';
        if (profile) profile.style.display = 'flex';
        if (avatar) avatar.src = this.user.picture || '';
        if (name) name.textContent = this.user.name?.split(' ')[0] || 'User';
    },

    signOut() {
        console.log('[AuthManager] Signing out...');

        // Disable auto-select for next time
        if (typeof google !== 'undefined' && google.accounts) {
            google.accounts.id.disableAutoSelect();
        }

        // Clear local storage
        localStorage.removeItem('jufipai_user');
        this.user = null;

        // Update UI
        const signInBtn = document.getElementById('googleSignInBtn');
        const profile = document.getElementById('userProfile');

        if (profile) profile.style.display = 'none';
        if (signInBtn) {
            signInBtn.style.display = 'block';
            // Re-render the button
            this.initializeGoogleSignIn();
        }

        // Show message
        NotificationManager.showToast('Signed out successfully', 'info');

        console.log('[AuthManager] User signed out');
    },

    async storeUserToSheets() {
        try {
            await fetch(this.googleSheetsEndpoint, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'action': 'sign_in',
                    'email': this.user.email,
                    'name': this.user.name,
                    'signedInAt': this.user.signedInAt,
                    'source': 'google_signin'
                })
            });
            console.log('[AuthManager] User data sent to Google Sheets');
        } catch (error) {
            console.error('[AuthManager] Failed to store user to Sheets:', error);
        }
    },

    isSignedIn(): boolean {
        return this.user !== null;
    },

    getUser() {
        return this.user;
    },

    showAuthError(message: string) {
        const container = document.getElementById('authContainer');
        if (!container) return;

        // Don't show if already signed in
        if (this.user) return;

        // Remove any existing error indicator
        this.clearAuthError();

        const errorEl = document.createElement('div');
        errorEl.className = 'auth-error-indicator';
        errorEl.id = 'authErrorIndicator';
        errorEl.setAttribute('role', 'status');
        errorEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        errorEl.title = 'Click to retry sign-in';
        errorEl.addEventListener('click', () => {
            this.clearAuthError();
            this.googleLibRetries = 0;
            this.waitForGoogleLibrary();
        });

        container.appendChild(errorEl);
    },

    clearAuthError() {
        const existing = document.getElementById('authErrorIndicator');
        if (existing) existing.remove();
    }
};
