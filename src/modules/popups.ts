/**
 * Service Popup System with Focus Trap
 */
import { sanitize } from './sanitize';
import { initAudio, getAudioContext, isAudioEnabled } from './audio';
import { getCurrentServiceDetails, defaultPopupMessages, getCurrentLang } from './translations';

// Tooltip-Style Popup System with Enhanced Accessibility
let popupPreviousFocus: HTMLElement | null = null;
let popupFocusTrapHandler: ((e: KeyboardEvent) => void) | null = null;
let popupKeyboardHandler: ((e: KeyboardEvent) => void) | null = null;

export function showServicePopup(title: string, content: string, icon: string = 'fas fa-robot', _clickedCard?: HTMLElement): void {
    const popup = document.getElementById('servicePopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupContent = document.getElementById('popupContent');
    const popupIcon = document.getElementById('popupIcon');
    const backdrop = document.getElementById('popupBackdrop');

    if (popup && popupTitle && popupContent && popupIcon) {
        // Store previous focus for restoration
        popupPreviousFocus = document.activeElement as HTMLElement;

        // Set content
        popupTitle.textContent = title;
        popupContent.innerHTML = sanitize.html(content);
        popupIcon.className = icon + ' popup-service-icon';

        // Show popup as centered modal
        popup.style.display = 'flex';
        popup.classList.remove('closing');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Set ARIA attributes for accessibility
        popup.setAttribute('role', 'dialog');
        popup.setAttribute('aria-modal', 'true');
        popup.setAttribute('aria-labelledby', 'popupTitle');

        // Setup focus trap
        setupPopupFocusTrap(popup);

        // Setup keyboard handler (ESC to close)
        popupKeyboardHandler = function(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                e.preventDefault();
                hideServicePopup();
            }
        };
        document.addEventListener('keydown', popupKeyboardHandler);

        // Focus close button after animation
        setTimeout(() => {
            const closeBtn = document.getElementById('popupClose');
            closeBtn?.focus();
        }, 200);

        // Backdrop click to close
        if (backdrop) {
            backdrop.onclick = function(e: MouseEvent) {
                if (e.target === backdrop) {
                    hideServicePopup();
                }
            };
        }
    }
}

function setupPopupFocusTrap(popup: HTMLElement): void {
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = popup.querySelectorAll(focusableSelectors);
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    popupFocusTrapHandler = function(e: KeyboardEvent) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement?.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement?.focus();
            }
        }
    };

    popup.addEventListener('keydown', popupFocusTrapHandler);
}

export function hideServicePopup(): void {
    const popup = document.getElementById('servicePopup');

    if (popup && popup.style.display !== 'none') {
        // Add closing class for animation
        popup.classList.add('closing');

        // Wait for animation to complete
        setTimeout(() => {
            finishHidePopup();
        }, 300);
    }

    function finishHidePopup() {
        if (!popup) return;
        popup.style.display = 'none';
        popup.classList.remove('closing');

        // Restore body scroll
        document.body.style.overflow = '';

        // Remove event listeners
        if (popupKeyboardHandler) {
            document.removeEventListener('keydown', popupKeyboardHandler);
            popupKeyboardHandler = null;
        }
        if (popupFocusTrapHandler) {
            popup.removeEventListener('keydown', popupFocusTrapHandler);
            popupFocusTrapHandler = null;
        }

        // Restore previous focus
        if (popupPreviousFocus && typeof popupPreviousFocus.focus === 'function') {
            popupPreviousFocus.focus();
            popupPreviousFocus = null;
        }

        // Remove ARIA attributes
        popup.removeAttribute('role');
        popup.removeAttribute('aria-modal');
        popup.removeAttribute('aria-labelledby');
    }
}

// Simple Success Popup Function (similar to service cards)
export function showSuccessPopup(): void {
    // Create popup element if it doesn't exist
    let successPopup = document.getElementById('successPopup');
    if (!successPopup) {
        successPopup = document.createElement('div');
        successPopup.id = 'successPopup';
        successPopup.innerHTML = `
            <div class="premium-popup-content">
                <div class="popup-header">
                    <div class="popup-icon-container">
                        <i class="fas fa-check-circle popup-service-icon" style="color: #10b981;"></i>
                    </div>
                    <h2 class="popup-title">You Got Lucky!</h2>
                    <button class="popup-close-btn" id="successPopupCloseBtn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>

                <div class="popup-content-wrapper">
                    <div class="popup-content-text">
                        <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 1rem;">Our best specialist will contact you shortly.</p>
                        <p style="font-size: 1.2rem; font-weight: 600; color: #3b82f6;"><strong>Stay tuned to flip how you work!</strong></p>
                    </div>
                </div>

                <div class="popup-cta-section">
                    <div class="popup-value-prop">
                        <i class="fas fa-rocket"></i>
                        <span>We'll be in touch within 24 hours</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(successPopup);

        // Setup close button handler
        const closeBtn = successPopup.querySelector('#successPopupCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', hideSuccessPopup);
        }
    }

    // Position popup in center of screen
    successPopup.style.cssText = `
        display: block;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10000;
    `;

    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideSuccessPopup();
    }, 5000);

    // Add click outside to close
    setTimeout(() => {
        document.addEventListener('click', hideSuccessPopupOnClickOutside, true);
    }, 100);
}

export function hideSuccessPopup(): void {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.style.display = 'none';
        document.removeEventListener('click', hideSuccessPopupOnClickOutside, true);
    }
}

function hideSuccessPopupOnClickOutside(e: MouseEvent): void {
    const popup = document.getElementById('successPopup');
    const popupContent = popup?.querySelector('.premium-popup-content');

    if (popup && popupContent && !popupContent.contains(e.target as Node)) {
        hideSuccessPopup();
    }
}

// Service card click handlers and popup setup
export function initPopups(): void {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card) => {
        card.addEventListener('click', function(this: HTMLElement) {
            // Play special professional service card sound
            initAudio();
            const audioContext = getAudioContext();
            if (isAudioEnabled()) audioContext.playServiceCardSound();

            // Get service title (current displayed text in current language)
            const h3 = this.querySelector('h3');
            const title = h3 ? h3.textContent!.trim() : '';

            // Use language-aware service details
            const currentServiceDetails = getCurrentServiceDetails();
            const serviceData = currentServiceDetails[title];

            if (serviceData) {
                showServicePopup(serviceData.title, serviceData.content, serviceData.icon, this);
            } else {
                // Use translated default message
                const currentLang = getCurrentLang();
                const defaultMessage = defaultPopupMessages[currentLang] || defaultPopupMessages.en;
                showServicePopup(title, `<p>${defaultMessage}</p>`, 'fas fa-cog', this);
            }
        });

        (card as HTMLElement).style.cursor = 'pointer';
    });

    // Setup popup close handlers
    const popupClose = document.getElementById('popupClose');
    const servicePopup = document.getElementById('servicePopup');

    if (popupClose) {
        popupClose.addEventListener('click', hideServicePopup);
    }

    if (servicePopup) {
        servicePopup.addEventListener('click', function(e: MouseEvent) {
            if (e.target === this) {
                hideServicePopup();
            }
        });
    }

    // ESC key to close popups
    document.addEventListener('keydown', function(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            hideServicePopup();
            hideSuccessPopup();
        }
    });

    console.log('Service card handlers setup complete');
}

// Make hideServicePopup globally accessible for inline onclick in HTML
(window as any).hideServicePopup = hideServicePopup;
