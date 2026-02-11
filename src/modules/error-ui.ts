/**
 * Error UI Utility
 * Displays visible, styled error states in sections that depend on external APIs.
 */

/**
 * Show an error message inside a specific section container.
 * @param containerId - The DOM id of the container to place the error in
 * @param message - User-friendly error message
 * @param retryCallback - Optional callback to invoke when user clicks "Try Again"
 */
export function showSectionError(
    containerId: string,
    message: string,
    retryCallback?: () => void
): void {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn('[ErrorUI] Container not found:', containerId);
        return;
    }

    // Remove any existing error in this container
    clearSectionError(containerId);

    const errorEl = document.createElement('div');
    errorEl.className = 'section-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.setAttribute('data-error-ui', containerId);

    const retryHTML = retryCallback
        ? `<button class="section-error-retry" aria-label="Try again">
               <i class="fas fa-redo"></i> Try Again
           </button>`
        : '';

    errorEl.innerHTML = `
        <div class="section-error-inner">
            <div class="section-error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <p class="section-error-message">${message}</p>
            ${retryHTML}
        </div>
    `;

    if (retryCallback) {
        const retryBtn = errorEl.querySelector('.section-error-retry');
        if (retryBtn) {
            retryBtn.addEventListener('click', (e: Event) => {
                e.preventDefault();
                clearSectionError(containerId);
                retryCallback();
            });
        }
    }

    container.innerHTML = '';
    container.appendChild(errorEl);
}

/**
 * Remove any error UI from a container.
 */
export function clearSectionError(containerId: string): void {
    const existing = document.querySelector(`[data-error-ui="${containerId}"]`);
    if (existing) {
        existing.remove();
    }
}

/**
 * Show an inline error banner for forms (below the form, not replacing it).
 * @param formId - The DOM id of the form element
 * @param message - User-friendly error message
 * @param retryCallback - Optional callback for retry
 */
export function showFormSubmissionError(
    formId: string,
    message: string,
    retryCallback?: () => void
): void {
    const form = document.getElementById(formId);
    if (!form) return;

    // Remove any existing submission error
    clearFormSubmissionError(formId);

    const errorEl = document.createElement('div');
    errorEl.className = 'form-submission-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.setAttribute('data-form-error', formId);

    const retryHTML = retryCallback
        ? `<button class="form-error-retry" aria-label="Try again">
               <i class="fas fa-redo"></i> Retry
           </button>`
        : '';

    errorEl.innerHTML = `
        <div class="form-submission-error-inner">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
            ${retryHTML}
        </div>
    `;

    if (retryCallback) {
        const retryBtn = errorEl.querySelector('.form-error-retry');
        if (retryBtn) {
            retryBtn.addEventListener('click', (e: Event) => {
                e.preventDefault();
                clearFormSubmissionError(formId);
                retryCallback();
            });
        }
    }

    // Insert after the form
    form.parentNode?.insertBefore(errorEl, form.nextSibling);

    // Auto-dismiss after 15 seconds
    setTimeout(() => {
        clearFormSubmissionError(formId);
    }, 15000);
}

/**
 * Remove an inline form submission error.
 */
export function clearFormSubmissionError(formId: string): void {
    const existing = document.querySelector(`[data-form-error="${formId}"]`);
    if (existing) {
        existing.remove();
    }
}
