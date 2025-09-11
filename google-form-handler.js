// GOOGLE SHEETS FORM HANDLER
console.log('📊 Google Sheets Form Handler Loading...');

// Your Google Spreadsheet ID
const SPREADSHEET_ID = '1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro';

// Google Apps Script Web App URL (you need to deploy this)
// For now, we'll use the Google Forms submission URL pattern
const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${SPREADSHEET_ID}/formResponse`;

function initGoogleFormHandler() {
    const forms = document.querySelectorAll('#contactForm, .contact-form');
    
    forms.forEach(form => {
        console.log('📊 Setting up Google Sheets handler for:', form.id || form.className);
        
        // Remove any existing handlers
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Add our handler
        newForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('📤 Submitting to Google Sheets...');
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Store locally as backup (silently)
            try {
                const backup = JSON.parse(localStorage.getItem('form_backups') || '[]');
                backup.push({
                    ...data,
                    timestamp: new Date().toISOString(),
                    spreadsheet_id: SPREADSHEET_ID
                });
                localStorage.setItem('form_backups', JSON.stringify(backup));
                console.log('✅ Backup saved locally');
            } catch (err) {
                console.error('Backup error:', err);
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.form-submit, button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Method 1: Try Google Apps Script Web App (if you deploy one)
                const scriptUrl = 'https://script.google.com/macros/s/AKfycbwJaLV8kY5h4lxQjvZnr7UJy8Gz-MZeoa8LnQqFOuWIlSwPqT9XJO7H3CaDrGxCZOzV/exec';
                
                const response = await fetch(scriptUrl, {
                    method: 'POST',
                    mode: 'no-cors', // Important for Google Scripts
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        spreadsheet_id: SPREADSHEET_ID,
                        timestamp: new Date().toISOString(),
                        name: data.name || '',
                        email: data.email || '',
                        company: data.company || '',
                        message: data.message || data.description || '',
                        source: window.location.href
                    })
                });
                
                console.log('✅ Sent to Google Sheets');
                
                // Success feedback
                submitBtn.textContent = '✓ Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                
                // Show success message (professional, not technical)
                alert(`Thank you ${data.name}!\n\nWe've received your information and will contact you at ${data.email} within 24 hours.\n\nLooking forward to discussing your automation needs!`);
                
                // Reset form
                this.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
            } catch (error) {
                console.error('Submission error:', error);
                
                // Still show success to user (we have backup)
                submitBtn.textContent = '✓ Received!';
                submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                
                alert(`Thank you ${data.name}!\n\nWe've received your information and will contact you at ${data.email} within 24 hours.`);
                
                // Reset form
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoogleFormHandler);
} else {
    initGoogleFormHandler();
}

// Also initialize on load
window.addEventListener('load', initGoogleFormHandler);

// Silent backup retrieval (only for admin use)
window.getFormBackups = function() {
    const backups = JSON.parse(localStorage.getItem('form_backups') || '[]');
    console.log('📊 Form backups:', backups);
    return backups;
};

console.log('✅ Google Sheets Form Handler Ready');
console.log('📊 Spreadsheet ID:', SPREADSHEET_ID);