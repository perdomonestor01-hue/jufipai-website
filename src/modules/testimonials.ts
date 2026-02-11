/**
 * Testimonial Toggle System
 */

export function initTestimonials(): void {
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    if (testimonialCards.length === 0) {
        return;
    }

    testimonialCards.forEach(card => {
        const toggleButton = card.querySelector('.testimonial-toggle') as HTMLElement;
        const toggleText = toggleButton?.querySelector('span:not(.testimonial-toggle-icon)');

        if (!toggleButton) return;

        // Store original button text
        const expandText = toggleText?.getAttribute('data-translate') || 'Read More';
        const collapseText = 'Read Less';

        toggleButton.addEventListener('click', function(e: Event) {
            e.stopPropagation();

            // Toggle expanded state
            const isExpanded = card.classList.toggle('expanded');

            // Update button text based on state
            if (toggleText) {
                if (isExpanded) {
                    toggleText.textContent = collapseText;
                    toggleText.setAttribute('data-translate', 'testimonials-read-less');
                } else {
                    toggleText.textContent = expandText === 'Read More' ? 'Read More' : expandText;
                    toggleText.setAttribute('data-translate', 'testimonials-read-more');
                }
            }

            // Play sound effect if available
            try {
                if (typeof (window as any).playClickSound === 'function') {
                    (window as any).playClickSound();
                }
            } catch {
                // Silent fail if sound function doesn't exist
            }

            // Smooth scroll to card if expanding and partially off-screen
            if (isExpanded) {
                setTimeout(() => {
                    const cardRect = card.getBoundingClientRect();
                    const windowHeight = window.innerHeight;

                    // If card bottom is below viewport, scroll into view
                    if (cardRect.bottom > windowHeight) {
                        card.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }
                }, 300); // Wait for expansion animation
            }
        });

        // Also make the entire card clickable (except links and buttons)
        card.addEventListener('click', function(e: Event) {
            const target = e.target as HTMLElement;
            // Don't trigger if clicking on a link or button
            if (target.tagName === 'A' || target.tagName === 'BUTTON') {
                return;
            }

            // Don't trigger if clicking inside the toggle button
            if (toggleButton.contains(target)) {
                return;
            }

            // Trigger the toggle button click
            toggleButton.click();
        });

        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');

        card.addEventListener('keydown', function(e: KeyboardEvent) {
            // Trigger on Enter or Space key
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleButton.click();

                // Update aria-expanded attribute
                const isExpanded = card.classList.contains('expanded');
                card.setAttribute('aria-expanded', isExpanded.toString());
            }
        });
    });

    console.log(`Testimonials initialized: ${testimonialCards.length} cards with toggle functionality`);
}
