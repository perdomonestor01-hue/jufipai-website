/**
 * Scroll Animations, Magnetic Effects, Parallax, Visual Enhancements
 */

// Intersection Observer for fade-in animations
export function initFadeInObserver(): void {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Add subtle mouse movement parallax effect
export function initMouseParallax(): void {
    // Skip parallax on mobile and when reduced motion is preferred
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.particle');
        const agents = document.querySelectorAll('.ai-agent');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;

            (particle as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });

        // Subtle parallax for AI agents
        agents.forEach((agent, index) => {
            const speed = (index % 2 + 1) * 0.3;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;

            const currentTransform = (agent as HTMLElement).style.transform || '';
            (agent as HTMLElement).style.transform = currentTransform + ` translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// 1. SCROLL-TRIGGERED ANIMATIONS
function initScrollAnimations(): void {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Stagger children if they exist
                const children = entry.target.querySelectorAll('.service-card, .testimonial-card, .features-list li');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all major sections
    document.querySelectorAll('.services, .testimonials, .features, .contact').forEach(section => {
        observer.observe(section);
    });
}

// 2. MAGNETIC BUTTON INTERACTIONS
function initMagneticButtons(): void {
    const buttons = document.querySelectorAll('.cta-button, .form-submit, .popup-cta-button');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const rect = (button as HTMLElement).getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left - rect.width / 2;
            const y = mouseEvent.clientY - rect.top - rect.height / 2;

            const moveX = x * 0.15;
            const moveY = y * 0.15;

            (button as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', () => {
            (button as HTMLElement).style.transform = 'translate(0, 0) scale(1)';
        });

        // Ripple effect on click
        button.addEventListener('click', function(this: HTMLElement, e: Event) {
            const mouseEvent = e as MouseEvent;
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = mouseEvent.clientX - rect.left - size / 2;
            const y = mouseEvent.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// 3. ENHANCED CARD HOVER EFFECTS (3D tilt - desktop only)
function initCardEffects(): void {
    // Disable 3D tilt on mobile and when reduced motion is preferred
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const cards = document.querySelectorAll('.service-card, .testimonial-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const rect = (card as HTMLElement).getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left;
            const y = mouseEvent.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

            // Update gradient position
            const gradientX = (x / rect.width) * 100;
            const gradientY = (y / rect.height) * 100;
            (card as HTMLElement).style.background = `
                radial-gradient(circle at ${gradientX}% ${gradientY}%,
                    rgba(59, 130, 246, 0.15),
                    transparent 50%),
                var(--card-bg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            (card as HTMLElement).style.background = '';
        });
    });
}

// 4. PARALLAX BACKGROUND PARTICLES (desktop only)
function initParallax(): void {
    // Skip scroll parallax on mobile and reduced motion
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isMobile || prefersReducedMotion) return;

    const particles = document.getElementById('particles');
    const aiAgents = document.querySelectorAll('.ai-agent');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Move particles at different speeds
                if (particles) {
                    particles.style.transform = `translateY(${scrolled * 0.3}px)`;
                }

                // Move AI agents with subtle parallax
                aiAgents.forEach((agent, index) => {
                    const speed = 0.1 + (index * 0.05);
                    (agent as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });

            ticking = true;
        }
    });
}

// 5. GRADIENT BORDER ANIMATION ON HOVER
function initGradientBorders(): void {
    const style = document.createElement('style');
    style.textContent = `
        .service-card::before,
        .testimonial-card::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            padding: 2px;
            background: linear-gradient(45deg,
                var(--primary-blue),
                var(--primary-gold),
                var(--primary-blue)
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box,
                          linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
            background-size: 200% 200%;
            animation: gradientShift 3s ease infinite;
        }

        .service-card:hover::before,
        .testimonial-card:hover::before {
            opacity: 1;
        }

        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
    `;
    document.head.appendChild(style);
}

// 6. SMOOTH SCROLL PROGRESS INDICATOR
function initScrollProgress(): void {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-blue), var(--primary-gold));
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 7. PERFORMANCE OPTIMIZATION - REDUCE MOTION FOR MOBILE
function optimizeForMobile(): void {
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
    }
}

// Main init for all animations
export function initAnimations(): void {
    initFadeInObserver();
    initMouseParallax();
    initScrollAnimations();
    initMagneticButtons();
    initCardEffects();
    initParallax();
    initGradientBorders();
    initScrollProgress();
    optimizeForMobile();
}
