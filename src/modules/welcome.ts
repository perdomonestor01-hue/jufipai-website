/**
 * Welcome Overlay and Loading Screen
 */
import { safeExecute } from './sanitize';
import { initAudio, getAudioContext, isAudioEnabled } from './audio';

export function initWelcome(): void {
    // SPECTACULAR WELCOME MESSAGE SYSTEM
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    let welcomeTimeout: ReturnType<typeof setTimeout>;

    // Add welcome-active class to body for complete coverage
    document.body.classList.add('welcome-active');
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100vh';

    // Generate spectacular floating particles
    function createWelcomeParticles() {
        return safeExecute(() => {
            const particlesContainer = document.getElementById('welcomeParticles');
            if (!particlesContainer) return;

            const isMobile = window.innerWidth <= 768;
            const particleCount = isMobile ? 12 : 20;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('welcome-particle');

                // Random positioning and animation delay
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (6 + Math.random() * 4) + 's';

                // Random blue metallic colors for variety
                const colors = [
                    'rgba(59, 130, 246, 0.8)',   // Bright blue
                    'rgba(14, 165, 233, 0.7)',   // Sky blue
                    'rgba(147, 197, 253, 0.6)',  // Light blue
                    'rgba(30, 64, 175, 0.9)',    // Deep blue
                    'rgba(99, 102, 241, 0.7)'    // Indigo blue
                ];
                const shadowColors = [
                    'rgba(59, 130, 246, 0.9)',
                    'rgba(14, 165, 233, 0.8)',
                    'rgba(147, 197, 253, 0.6)',
                    'rgba(30, 64, 175, 0.7)'
                ];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.boxShadow = `0 0 ${8 + Math.random() * 12}px ${shadowColors[Math.floor(Math.random() * shadowColors.length)]}, 0 0 ${15 + Math.random() * 10}px ${colors[Math.floor(Math.random() * colors.length)]}`;

                particlesContainer.appendChild(particle);
            }
        }, 'createWelcomeParticles');
    }

    // Initialize spectacular particles
    createWelcomeParticles();

    function hideWelcomeMessage() {
        if (welcomeOverlay && !welcomeOverlay.classList.contains('fade-out')) {
            // Play futuristic spaceship launch sound
            initAudio();
            const audioContext = getAudioContext();
            const audioEnabled = isAudioEnabled();
            // Small delay to ensure audio context is ready
            setTimeout(() => {
                if (audioEnabled && audioContext && audioContext.playSpaceshipLaunch) {
                    try {
                        audioContext.playSpaceshipLaunch();
                    } catch (e) {
                        console.log('Spaceship launch audio failed:', e);
                    }
                }
            }, 50);

            // Immediately restore scrolling
            document.body.classList.remove('welcome-active');
            document.documentElement.style.overflow = '';
            document.documentElement.style.height = '';
            document.body.style.overflow = '';
            document.body.style.height = '';

            welcomeOverlay.classList.add('fade-out');
            setTimeout(() => {
                welcomeOverlay.style.display = 'none';
            }, 1500);
            clearTimeout(welcomeTimeout);
        }
    }

    // Auto-hide after 2 seconds
    welcomeTimeout = setTimeout(hideWelcomeMessage, 2000);

    // Hide on click anywhere with spectacular effect
    if (welcomeOverlay) {
        welcomeOverlay.addEventListener('click', hideWelcomeMessage);
    }

    // Handle loading screen after welcome message
    setTimeout(() => {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }
    }, 1000);
}

// Customer Welcome Overlay Functions
export function showCustomerWelcome(): void {
    const customerWelcomeOverlay = document.getElementById('customerWelcomeOverlay');
    let customerWelcomeTimeout: ReturnType<typeof setTimeout>;

    if (customerWelcomeOverlay) {
        // Add welcome-active class to body for complete coverage
        document.body.classList.add('welcome-active');
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100vh';

        // Show overlay
        customerWelcomeOverlay.style.display = 'flex';
        customerWelcomeOverlay.classList.remove('fade-out');

        function hideCustomerWelcome() {
            if (customerWelcomeOverlay && !customerWelcomeOverlay.classList.contains('fade-out')) {
                // Play success sound
                initAudio();
                const audioContext = getAudioContext();
                const audioEnabled = isAudioEnabled();
                if (audioEnabled && audioContext && audioContext.playSuccessSound) {
                    audioContext.playSuccessSound();
                }

                // Immediately restore scrolling
                document.body.classList.remove('welcome-active');
                document.documentElement.style.overflow = '';
                document.documentElement.style.height = '';
                document.body.style.overflow = '';
                document.body.style.height = '';

                customerWelcomeOverlay.classList.add('fade-out');
                setTimeout(() => {
                    customerWelcomeOverlay.style.display = 'none';
                }, 1500);
                clearTimeout(customerWelcomeTimeout);
            }
        }

        // Auto-hide after 6 seconds (slightly longer than main welcome)
        customerWelcomeTimeout = setTimeout(hideCustomerWelcome, 6000);

        // Hide on click anywhere with spectacular effect
        customerWelcomeOverlay.addEventListener('click', hideCustomerWelcome);
    }
}
