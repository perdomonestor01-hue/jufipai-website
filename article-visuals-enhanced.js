// ==========================================
// ENHANCED ARTICLE SECTION - VISUAL JAVASCRIPT
// Complete visual enhancement system
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all visual systems
    initializeVisualSystems();
    createParticleSystem();
    create3DElements();
    enhanceArticleCards();
    setupIntersectionAnimations();
    initializeInteractiveEffects();
    setupDynamicBackgrounds();
    createLoadMoreEffects();
});

// Initialize core visual systems
function initializeVisualSystems() {
    const articlesSection = document.querySelector('.articles');
    if (!articlesSection) return;
    
    // Add visual enhancement classes
    articlesSection.classList.add('visuals-enhanced');
    
    // Create visual container
    const visualContainer = document.createElement('div');
    visualContainer.className = 'visual-elements-container';
    articlesSection.appendChild(visualContainer);
    
    // Initialize performance monitor
    monitorPerformance();
}

// Create advanced particle system
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    document.querySelector('.articles')?.appendChild(particleContainer);
    
    // Create particles with varying properties
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        // Varying sizes
        const size = 2 + Math.random() * 6;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random colors
        const colors = ['#60a5fa', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particleContainer.appendChild(particle);
    }
}

// Create 3D floating elements
function create3DElements() {
    const visualContainer = document.querySelector('.visual-elements-container');
    if (!visualContainer) return;
    
    // Create floating cubes
    for (let i = 0; i < 5; i++) {
        const cube = document.createElement('div');
        cube.className = 'floating-cube';
        cube.style.left = Math.random() * 100 + '%';
        cube.style.animationDelay = i * 4 + 's';
        
        // Create cube faces
        ['front', 'back', 'left', 'right', 'top', 'bottom'].forEach(face => {
            const faceDiv = document.createElement('div');
            faceDiv.className = `face ${face}`;
            cube.appendChild(faceDiv);
        });
        
        visualContainer.appendChild(cube);
    }
    
    // Create floating spheres
    createFloatingSpheres(visualContainer);
}

// Create floating spheres with gradients
function createFloatingSpheres(container) {
    for (let i = 0; i < 8; i++) {
        const sphere = document.createElement('div');
        sphere.className = 'floating-sphere';
        sphere.style.cssText = `
            position: absolute;
            width: ${30 + Math.random() * 70}px;
            height: ${30 + Math.random() * 70}px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, 
                rgba(96, 165, 250, 0.4), 
                rgba(167, 139, 250, 0.2), 
                transparent);
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatSphere ${15 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            filter: blur(1px);
            mix-blend-mode: screen;
        `;
        container.appendChild(sphere);
    }
    
    // Add floating sphere animation
    if (!document.querySelector('#floatSphereAnimation')) {
        const style = document.createElement('style');
        style.id = 'floatSphereAnimation';
        style.textContent = `
            @keyframes floatSphere {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(50px, -50px) scale(1.2);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(-30px, 30px) scale(0.8);
                    opacity: 0.4;
                }
                75% {
                    transform: translate(-50px, -30px) scale(1.1);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhance article cards with visual effects
function enhanceArticleCards() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach((card, index) => {
        // Add hover effect with tilt
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
        
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
        
        // Add glow effect on hover
        card.addEventListener('mouseenter', () => {
            createGlowEffect(card);
        });
    });
}

// Create ripple effect on click
function createRippleEffect(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(96, 165, 250, 0.5), transparent);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: rippleExpand 0.6s ease-out;
        pointer-events: none;
        z-index: 100;
    `;
    
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    
    // Add ripple animation if not exists
    if (!document.querySelector('#rippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'rippleAnimation';
        style.textContent = `
            @keyframes rippleExpand {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create glow effect
function createGlowEffect(element) {
    const glow = document.createElement('div');
    glow.className = 'glow-effect';
    glow.style.cssText = `
        position: absolute;
        inset: -20px;
        background: radial-gradient(circle at center, 
            rgba(96, 165, 250, 0.3), 
            transparent 70%);
        filter: blur(20px);
        opacity: 0;
        animation: glowPulse 0.5s ease-out;
        pointer-events: none;
        z-index: -1;
    `;
    
    element.appendChild(glow);
    setTimeout(() => glow.remove(), 500);
    
    // Add glow animation
    if (!document.querySelector('#glowAnimation')) {
        const style = document.createElement('style');
        style.id = 'glowAnimation';
        style.textContent = `
            @keyframes glowPulse {
                50% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup intersection observer for scroll animations
function setupIntersectionAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animations for child elements
                const children = entry.target.querySelectorAll('.article-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.animation = 'slideInUp 0.6s ease-out forwards';
                        child.style.opacity = '1';
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.articles-grid, .featured-article');
    sections.forEach(section => observer.observe(section));
}

// Initialize interactive effects
function initializeInteractiveEffects() {
    // Enhanced featured article
    enhanceFeaturedArticle();
    
    // Add mouse trail effect
    createMouseTrail();
    
    // Add parallax scrolling
    setupParallaxScrolling();
}

// Enhance featured article with special effects
function enhanceFeaturedArticle() {
    const featured = document.querySelector('.featured-article');
    if (!featured) return;
    
    // Create animated background
    const animatedBg = document.createElement('div');
    animatedBg.className = 'featured-visual-bg';
    featured.insertBefore(animatedBg, featured.firstChild);
    
    // Add orbiting particles to featured icon
    const iconContainer = featured.querySelector('.featured-icon-container');
    if (iconContainer) {
        for (let i = 0; i < 3; i++) {
            const orbit = document.createElement('div');
            orbit.className = 'orbit-particle';
            iconContainer.appendChild(orbit);
        }
    }
    
    // Interactive hover effect
    featured.addEventListener('mousemove', (e) => {
        const rect = featured.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        animatedBg.style.background = `
            radial-gradient(circle at ${x * 100}% ${y * 100}%, 
                rgba(96, 165, 250, 0.2), 
                transparent 50%)
        `;
    });
}

// Create mouse trail effect
function createMouseTrail() {
    let mouseX = 0, mouseY = 0;
    let trails = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (Math.random() > 0.9) { // Limit trail creation
            const trail = document.createElement('div');
            trail.className = 'mouse-trail';
            trail.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: radial-gradient(circle, 
                    rgba(96, 165, 250, 0.5), 
                    transparent);
                left: ${mouseX}px;
                top: ${mouseY}px;
                pointer-events: none;
                z-index: 9999;
                animation: trailFade 1s ease-out forwards;
            `;
            document.body.appendChild(trail);
            
            setTimeout(() => trail.remove(), 1000);
        }
    });
    
    // Add trail animation
    if (!document.querySelector('#trailAnimation')) {
        const style = document.createElement('style');
        style.id = 'trailAnimation';
        style.textContent = `
            @keyframes trailFade {
                to {
                    transform: scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Setup parallax scrolling effects
function setupParallaxScrolling() {
    const parallaxElements = document.querySelectorAll('.floating-cube, .floating-sphere, .particle');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1) % 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Setup dynamic backgrounds
function setupDynamicBackgrounds() {
    const articlesSection = document.querySelector('.articles');
    if (!articlesSection) return;
    
    // Create animated gradient background
    const gradientBg = document.createElement('div');
    gradientBg.className = 'dynamic-gradient-bg';
    gradientBg.style.cssText = `
        position: absolute;
        inset: 0;
        background: linear-gradient(45deg, 
            rgba(96, 165, 250, 0.05), 
            rgba(167, 139, 250, 0.05), 
            rgba(244, 114, 182, 0.05), 
            rgba(52, 211, 153, 0.05));
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
        z-index: 0;
    `;
    articlesSection.insertBefore(gradientBg, articlesSection.firstChild);
}

// Create load more button effects
function createLoadMoreEffects() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', function() {
        // Add loading animation
        this.classList.add('loading');
        
        // Create expanding circle effect
        const circle = document.createElement('div');
        circle.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50px;
            background: radial-gradient(circle, 
                rgba(96, 165, 250, 0.3), 
                transparent);
            left: 0;
            top: 0;
            transform: scale(0);
            animation: expandCircle 0.6s ease-out;
            pointer-events: none;
        `;
        this.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
            this.classList.remove('loading');
            loadMoreArticles();
        }, 600);
    });
    
    // Add expand animation
    if (!document.querySelector('#expandAnimation')) {
        const style = document.createElement('style');
        style.id = 'expandAnimation';
        style.textContent = `
            @keyframes expandCircle {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .load-more-btn.loading {
                pointer-events: none;
                animation: pulse 0.6s ease-in-out;
            }
            
            @keyframes pulse {
                50% { transform: scale(0.95); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Load more articles with animation
function loadMoreArticles() {
    const grid = document.querySelector('.articles-grid');
    if (!grid) return;
    
    // Additional articles data
    const moreArticles = [
        {
            category: 'ai',
            title: 'Neural Networks: The Next Frontier',
            description: 'Exploring advanced neural network architectures for business automation.',
            readTime: '6 min',
            views: '5.2K',
            icon: 'fa-network-wired'
        },
        {
            category: 'automation',
            title: 'Zero-Code Automation Revolution',
            description: 'How visual programming is changing the automation landscape.',
            readTime: '8 min',
            views: '7.8K',
            icon: 'fa-code-branch'
        },
        {
            category: 'case-study',
            title: 'Startup to Scale: AI Success Story',
            description: 'From 10 to 1000 employees with full automation.',
            readTime: '10 min',
            views: '12.3K',
            icon: 'fa-rocket'
        }
    ];
    
    moreArticles.forEach((article, index) => {
        setTimeout(() => {
            const articleCard = createArticleCard(article);
            grid.appendChild(articleCard);
            
            // Animate in
            setTimeout(() => {
                articleCard.style.opacity = '1';
                articleCard.style.transform = 'translateY(0)';
            }, 50);
        }, index * 200);
    });
}

// Create article card element
function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = `article-card ${article.category} progressive-load`;
    card.style.cssText = 'opacity: 0; transform: translateY(30px); transition: all 0.6s ease;';
    
    card.innerHTML = `
        <div class="article-image">
            <div class="image-placeholder">
                <i class="fas ${article.icon}"></i>
            </div>
        </div>
        <div class="article-content">
            <div class="article-meta">
                <span class="article-category ${article.category}">${article.category.replace('-', ' ')}</span>
                <div class="article-stats">
                    <span class="reading-time"><i class="fas fa-clock"></i> ${article.readTime}</span>
                    <span class="view-count"><i class="fas fa-eye"></i> ${article.views}</span>
                </div>
            </div>
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <div class="article-author">
                <div class="author-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <span class="author-name">AI Team</span>
            </div>
        </div>
    `;
    
    // Add hover effects to new card
    enhanceArticleCards();
    
    return card;
}

// Performance monitoring
function monitorPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime >= lastTime + 1000) {
            const fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
            
            // Reduce effects if FPS is low
            if (fps < 30) {
                document.body.classList.add('reduce-effects');
            } else {
                document.body.classList.remove('reduce-effects');
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    // Start monitoring
    requestAnimationFrame(checkFPS);
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVisualSystems);
} else {
    initializeVisualSystems();
}

// Export for use in other modules
window.ArticleVisualsEnhanced = {
    createRippleEffect,
    createGlowEffect,
    createParticleSystem,
    loadMoreArticles
};