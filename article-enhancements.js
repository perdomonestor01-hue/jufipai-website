// Enhanced Article Section JavaScript
// Visual improvements and animations for article section

document.addEventListener('DOMContentLoaded', function() {
    enhanceArticleSection();
    addFloatingParticles();
    enhanceModalInteractions();
    addReadingProgressBar();
    enhanceSocialSharing();
});

// Enhance article section with visual effects
function enhanceArticleSection() {
    const articleCards = document.querySelectorAll('.article-card');

    articleCards.forEach((card, index) => {
        // Add staggered animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                        entry.target.style.animation = `slideInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`;
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);

        // Add hover particle effects
        card.addEventListener('mouseenter', function(e) {
            createParticleEffect(e.currentTarget);
        });
    });
}

// Create particle effect on hover
function createParticleEffect(element) {
    const particleCount = 5;
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'hover-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #60a5fa, #a78bfa);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particleFloat 1s ease-out forwards;
        `;
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);
    }
}

// Add floating background particles
function addFloatingParticles() {
    const articlesSection = document.querySelector('.articles');
    if (!articlesSection) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'articles-background-particles';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;

    // Create floating orbs
    for (let i = 0; i < 8; i++) {
        const orb = document.createElement('div');
        orb.className = `floating-orb orb-${i}`;
        orb.style.cssText = `
            position: absolute;
            width: ${30 + Math.random() * 50}px;
            height: ${30 + Math.random() * 50}px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatOrb ${15 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(orb);
    }

    articlesSection.style.position = 'relative';
    articlesSection.insertBefore(particlesContainer, articlesSection.firstChild);
}

// Enhance modal interactions
function enhanceModalInteractions() {
    const modal = document.getElementById('articleModal');
    const closeBtn = document.getElementById('modalClose');
    const modalContainer = modal?.querySelector('.modal-container');

    if (!modal || !modalContainer) return;

    // Enhance close button visibility
    if (closeBtn) {
        // Make close button more prominent
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'Close article');
        closeBtn.setAttribute('title', 'Close (ESC)');

        // Add ripple effect on click
        closeBtn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'close-ripple';
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Add smooth scroll behavior
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('scroll', function() {
            const scrollProgress = this.scrollTop / (this.scrollHeight - this.clientHeight);
            updateReadingProgress(scrollProgress);
        });
    }

    // Enhanced ESC key closing
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalWithAnimation();
        }
    });
}

// Add reading progress bar
function addReadingProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.id = 'readingProgress';
    document.body.appendChild(progressBar);
}

// Update reading progress
function updateReadingProgress(progress) {
    const progressBar = document.getElementById('readingProgress');
    if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
    }
}

// Close modal with animation
function closeModalWithAnimation() {
    const modal = document.getElementById('articleModal');
    const modalContainer = modal?.querySelector('.modal-container');

    if (modalContainer) {
        modalContainer.style.animation = 'modalSlideDown 0.3s ease-out forwards';
        setTimeout(() => {
            modal.classList.remove('active');
            modal.style.display = 'none';
            updateReadingProgress(0);
        }, 300);
    }
}

// Enhance social sharing functionality
function enhanceSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(btn => {
        // Add tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'share-tooltip';
        tooltip.textContent = `Share on ${btn.className.split(' ')[1]}`;
        tooltip.style.cssText = `
            position: absolute;
            bottom: 120%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(30, 41, 59, 0.95);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;

        btn.style.position = 'relative';
        btn.appendChild(tooltip);

        btn.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
        });

        btn.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        // Enhanced click animation
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // Create pulse effect
            const pulse = document.createElement('span');
            pulse.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 2px solid currentColor;
                transform: translate(-50%, -50%) scale(1);
                animation: sharePulse 0.6s ease-out;
                pointer-events: none;
            `;
            this.appendChild(pulse);
            setTimeout(() => pulse.remove(), 600);

            // Actual sharing logic
            const articleTitle = document.querySelector('#modalTitle')?.textContent || 'Check out this article';
            const articleUrl = window.location.href;

            if (this.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`, '_blank');
            } else if (this.classList.contains('linkedin')) {
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`, '_blank');
            } else if (this.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, '_blank');
            } else if (this.classList.contains('email')) {
                window.location.href = `mailto:?subject=${encodeURIComponent(articleTitle)}&body=${encodeURIComponent('Check out this article: ' + articleUrl)}`;
            }
        });
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes particleFloat {
        to {
            opacity: 0;
            transform: translateY(-50px) translateX(${Math.random() * 100 - 50}px);
        }
    }

    @keyframes floatOrb {
        0%, 100% {
            transform: translate(0, 0) scale(1);
        }
        33% {
            transform: translate(30px, -30px) scale(1.1);
        }
        66% {
            transform: translate(-20px, 20px) scale(0.9);
        }
    }

    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    @keyframes sharePulse {
        to {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
        }
    }

    @keyframes modalSlideDown {
        to {
            transform: translateY(100px) scale(0.9);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize enhanced article observer for dynamic content
const articlesObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            enhanceArticleSection();
        }
    });
});

const articlesContainer = document.querySelector('.articles-grid');
if (articlesContainer) {
    articlesObserver.observe(articlesContainer, { childList: true, subtree: true });
}