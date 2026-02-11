/**
 * Smooth Scroll, Navigation Toggling, Features CTA
 */
import { initAudio, getAudioContext, isAudioEnabled } from './audio';

export function initNavigation(): void {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
            e.preventDefault();

            const href = this.getAttribute('href');
            if (!href) return;
            const target = document.querySelector(href) as HTMLElement;
            if (target) {
                // Calculate offset for fixed header with better positioning
                const header = document.querySelector('.header') as HTMLElement;
                const headerHeight = header ? header.offsetHeight : 0;
                let targetPosition: number;

                // Special positioning for features section to center it perfectly
                if (href === '#features') {
                    const featuresHeader = target.querySelector('.features-header') as HTMLElement;
                    // Calculate viewport height and center the features section title
                    const viewportHeight = window.innerHeight;
                    const featuresHeaderHeight = featuresHeader ? featuresHeader.offsetHeight : 0;
                    const perfectCenter = viewportHeight / 2 - featuresHeaderHeight / 2 - headerHeight;
                    targetPosition = target.offsetTop - perfectCenter;
                } else {
                    targetPosition = target.offsetTop - headerHeight - 20; // Standard offset for other sections
                }

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Service card hover interactions only (click handled by modal system)
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playHoverSound();
        });
    });

    // Process step interactions
    document.querySelectorAll('.process-step').forEach(step => {
        step.addEventListener('mouseenter', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playHoverSound();
        });

        step.addEventListener('click', function(this: HTMLElement) {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playClickSound();

            // Add a subtle scale effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Value prop interactions
    document.querySelectorAll('.value-prop').forEach(prop => {
        prop.addEventListener('mouseenter', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playHoverSound();
        });

        prop.addEventListener('click', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playClickSound();
        });
    });

    // Navigation link interactions
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playHoverSound();
        });
    });

    // CTA button effects
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playHoverSound();
        });

        button.addEventListener('click', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playClickSound();
        });
    });

    // Form input focus sounds
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playHoverSound();
        });
    });

    // Features CTA Corner functionality
    const featuresCTA = document.getElementById('featuresCTA');
    if (featuresCTA) {
        featuresCTA.addEventListener('click', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playClickSound();

            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                // Calculate offset for fixed header
                const header = document.querySelector('.header') as HTMLElement;
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Focus on the first form field after scrolling
                setTimeout(() => {
                    const firstInput = contactSection.querySelector('input[type="text"]') as HTMLInputElement;
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 800);
            }
        });

        featuresCTA.addEventListener('mouseenter', function() {
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playHoverSound();
        });
    }
}
