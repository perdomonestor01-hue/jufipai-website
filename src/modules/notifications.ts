/**
 * NotificationManager - Toast notifications and browser notifications
 */
import { sanitize } from './sanitize';

export const NotificationManager = {
    hasPermission: false,
    permissionPromptShown: false,

    init() {
        console.log('[NotificationManager] Initializing...');

        // Check if notifications are supported
        if (!('Notification' in window)) {
            console.log('[NotificationManager] Notifications not supported');
            return;
        }

        // Check existing permission
        this.hasPermission = Notification.permission === 'granted';

        // Show permission prompt after delay (if not already granted/denied)
        if (Notification.permission === 'default') {
            setTimeout(() => {
                this.showPermissionPrompt();
            }, 30000); // 30 seconds
        }

        console.log('[NotificationManager] Initialized');
    },

    showPermissionPrompt() {
        if (this.permissionPromptShown) return;
        this.permissionPromptShown = true;

        const prompt = document.createElement('div');
        prompt.className = 'notification-permission-prompt';
        prompt.innerHTML = `
            <div class="permission-content">
                <div class="permission-icon">
                    <i class="fas fa-bell"></i>
                </div>
                <div class="permission-text">
                    <h4>Stay Updated!</h4>
                    <p>Get notified when we publish new AI automation insights</p>
                </div>
                <div class="permission-actions">
                    <button class="permission-allow">Allow</button>
                    <button class="permission-later">Maybe Later</button>
                </div>
            </div>
        `;

        document.body.appendChild(prompt);

        // Animate in
        setTimeout(() => prompt.classList.add('visible'), 100);

        prompt.querySelector('.permission-allow')!.addEventListener('click', async () => {
            const permission = await Notification.requestPermission();
            this.hasPermission = permission === 'granted';
            prompt.classList.remove('visible');
            setTimeout(() => prompt.remove(), 300);

            if (this.hasPermission) {
                this.showToast('Notifications enabled! You\'ll know when new content drops.', 'success');
            }
        });

        prompt.querySelector('.permission-later')!.addEventListener('click', () => {
            prompt.classList.remove('visible');
            setTimeout(() => prompt.remove(), 300);
        });
    },

    showNewArticleNotification(article: { title: string }) {
        // Show in-app toast
        this.showToast(`New Article: ${article.title}`, 'new-article', () => {
            document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
        });

        // Show browser notification if permitted
        if (this.hasPermission && Notification.permission === 'granted') {
            try {
                new Notification('New JufipAI Article!', {
                    body: article.title,
                    icon: '/favicon.svg',
                    tag: 'new-article',
                    requireInteraction: false
                });
            } catch (err) {
                console.log('[NotificationManager] Browser notification failed:', err);
            }
        }

        // Show badge on nav link
        this.showNavBadge();
    },

    showToast(message: string, type: string = 'info', onClick: (() => void) | null = null) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const iconMap: Record<string, string> = {
            'success': 'check-circle',
            'new-article': 'newspaper',
            'info': 'info-circle',
            'error': 'exclamation-circle'
        };

        toast.innerHTML = `
            <i class="fas fa-${iconMap[type] || 'info-circle'}"></i>
            <span>${sanitize.text(message)}</span>
            <button class="toast-close" aria-label="Close"><i class="fas fa-times"></i></button>
        `;

        if (onClick) {
            toast.style.cursor = 'pointer';
            toast.addEventListener('click', (e: MouseEvent) => {
                if (!(e.target as HTMLElement).closest('.toast-close')) {
                    onClick();
                    toast.classList.remove('visible');
                    setTimeout(() => toast.remove(), 300);
                }
            });
        }

        toast.querySelector('.toast-close')!.addEventListener('click', (e: Event) => {
            e.stopPropagation();
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 300);
        });

        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('visible'), 100);

        // Auto-dismiss after 8 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('visible');
                setTimeout(() => toast.remove(), 300);
            }
        }, 8000);
    },

    showNavBadge() {
        let badge = document.querySelector('.nav-article-badge') as HTMLElement;
        const blogLink = document.querySelector('a[href="#blog"]') as HTMLElement;

        if (!badge && blogLink) {
            badge = document.createElement('span');
            badge.className = 'nav-article-badge';
            badge.textContent = 'NEW';
            blogLink.style.position = 'relative';
            blogLink.appendChild(badge);
        }

        if (badge) {
            badge.classList.add('visible');

            // Remove badge when user visits blog section
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    badge.classList.remove('visible');
                    observer.disconnect();
                }
            }, { threshold: 0.5 });

            const blogSection = document.getElementById('blog');
            if (blogSection) observer.observe(blogSection);
        }
    }
};

// Make accessible for ArticleManager polling
(window as any)._NotificationManager = NotificationManager;
