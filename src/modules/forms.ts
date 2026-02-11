/**
 * Contact Form + Google Sheets Submission + Validation
 */
import { sanitize } from './sanitize';
import { initAudio, getAudioContext, isAudioEnabled } from './audio';
import { showCustomerWelcome } from './welcome';
import { showFormSubmissionError } from './error-ui';

// Form validation error display helper
function showFormError(fieldId: string, message: string): void {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (!field) return;

    // Remove any existing error on this field
    clearFormError(fieldId);

    // Add error styling
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.15)';

    // Create and insert error message
    const errorEl = document.createElement('div');
    errorEl.className = 'form-error-message';
    errorEl.id = `${fieldId}-error`;
    errorEl.textContent = message;
    errorEl.style.cssText = 'color: #ef4444; font-size: 0.85rem; margin-top: 0.25rem; margin-bottom: 0.5rem;';
    field.setAttribute('aria-describedby', errorEl.id);
    field.parentNode!.appendChild(errorEl);

    // Focus the field
    field.focus();

    // Auto-clear on input
    const clearHandler = () => {
        clearFormError(fieldId);
        field.removeEventListener('input', clearHandler);
    };
    field.addEventListener('input', clearHandler);
}

function clearFormError(fieldId: string): void {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    if (!field) return;
    field.style.borderColor = '';
    field.style.boxShadow = '';
    field.removeAttribute('aria-describedby');
    const existing = document.getElementById(`${fieldId}-error`);
    if (existing) existing.remove();
}

export function initForms(): void {
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    if (!contactForm) return;

    // Contact form handling with Google Spreadsheet integration
    contactForm.addEventListener('submit', async function(e: Event) {
        e.preventDefault();
        initAudio();
        const audioContext = getAudioContext();
        if (isAudioEnabled()) audioContext.playClickSound();

        const formData = new FormData(this);
        const formObject: Record<string, string> = {};
        formData.forEach((value, key) => {
            formObject[key] = value as string;
        });

        // --- Client-side form validation ---
        const nameValue = (formObject.name || '').trim();
        const emailValue = (formObject.email || '').trim();
        const descriptionValue = (formObject.description || '').trim();

        // Required field checks
        if (!nameValue) {
            showFormError('name', 'Please enter your full name.');
            return;
        }
        if (!emailValue) {
            showFormError('email', 'Please enter your email address.');
            return;
        }
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(emailValue)) {
            showFormError('email', 'Please enter a valid email address.');
            return;
        }
        if (!descriptionValue) {
            showFormError('description', 'Please describe your project.');
            return;
        }

        // Sanitize all form inputs before submission
        formObject.name = sanitize.text(nameValue);
        formObject.email = sanitize.text(emailValue);
        formObject.company = sanitize.text((formObject.company || '').trim());
        formObject.description = sanitize.text(descriptionValue);

        const submitBtn = this.querySelector('.form-submit') as HTMLButtonElement;
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #6b7280, #9ca3af)';

        try {
            // Send to Google Spreadsheet via contact@jufipai.com Apps Script
            await fetch('https://script.google.com/macros/s/AKfycbxUJ6mzP1jubnhHK31Y_74FY6EIG61MdJW8VlrBX56r6hK2-Ing3EW_9o7uHs--9_3t/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'Full Name': formObject.name,
                    'Email Address': formObject.email,
                    'Company Name': formObject.company || '',
                    'Project Description': formObject.description
                })
            });

            // Play success sound
            if (isAudioEnabled()) audioContext.playSuccessSound();

            // Show spectacular customer welcome overlay instead of simple popup
            setTimeout(() => {
                showCustomerWelcome();
            }, 1000); // Short delay to let success sound play

            // Reset form
            this.reset();

            // Update button to success state
            submitBtn.textContent = '\u2713 Submitted Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';

        } catch (error) {
            console.error('Form submission error:', error);

            // Show visible error to the user
            showFormSubmissionError(
                'contactForm',
                'Unable to submit your request. We\'re opening your email client as a backup.',
            );

            // Fallback to mailto if Google Sheets fails
            const subject = encodeURIComponent('JufipAI Automation Inquiry from ' + formObject.name);
            const body = encodeURIComponent(`Hello JufipAI Team,

Name: ${formObject.name}
Email: ${formObject.email}
Company: ${formObject.company || 'Not specified'}

Project Description:
${formObject.description}

Best regards,
${formObject.name}`);

            const mailtoLink = `mailto:contact@jufipai.com?subject=${subject}&body=${body}`;
            window.open(mailtoLink);

            submitBtn.textContent = 'Opening email client...';
            submitBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        }

        // Reset button after delay
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.style.transform = '';
            submitBtn.disabled = false;
        }, 4000);
    });
}
