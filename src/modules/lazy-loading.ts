/**
 * Image Lazy Loading
 */

export function initLazyLoading(): void {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLElement;

                // Load image source
                if ((img as HTMLImageElement).dataset.src) {
                    (img as HTMLImageElement).src = (img as HTMLImageElement).dataset.src!;
                    img.removeAttribute('data-src');
                }

                // Load background image
                if (img.dataset.bg) {
                    img.style.backgroundImage = `url(${img.dataset.bg})`;
                    img.removeAttribute('data-bg');
                }

                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px', // Start loading 50px before element is visible
        threshold: 0.01
    });

    // Observe all lazy images
    lazyImages.forEach(img => imageObserver.observe(img));
    lazyBackgrounds.forEach(el => imageObserver.observe(el));

    // Lazy load sections for better performance
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    sections.forEach(section => sectionObserver.observe(section));

    // Prefetch links on hover for faster navigation
    const links = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    links.forEach(link => {
        link.addEventListener('mouseenter', function(this: HTMLAnchorElement) {
            const href = this.getAttribute('href');
            if (href && !href.includes('#') && !document.querySelector(`link[rel="prefetch"][href="${href}"]`)) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
            }
        }, { once: true });
    });

    console.log(`Lazy Loading initialized: ${lazyImages.length} images, ${sections.length} sections`);
}
