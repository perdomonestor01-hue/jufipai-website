// DIRECT GOOGLE SHEETS SUBMISSION - EXACTLY LIKE TEST PAGE
console.log('💪 DIRECT Google Sheets Handler Loading...');

// Your confirmed working Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx6pu8s3tWi_vyVS76X_fqeJTgyS5399MCcX2j3se7zB4IVE0LUCNHkh3IY-u_fjwu-/exec';

// Function to hijack form completely
function hijackFormCompletely() {
    console.log('🎯 Hijacking all forms...');
    
    // Find ALL forms
    const forms = document.querySelectorAll('form');
    console.log(`Found ${forms.length} forms to hijack`);
    
    forms.forEach((form, index) => {
        // Skip if not a contact form
        if (!form.id.includes('contact') && !form.className.includes('contact')) {
            console.log(`Skipping non-contact form ${index}`);
            return;
        }
        
        console.log(`🔥 HIJACKING form ${index}: ${form.id || form.className}`);
        
        // COMPLETELY REPLACE the form's submit behavior
        form.onsubmit = null; // Clear any existing onsubmit
        
        // Remove ALL event listeners by cloning
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Now add ONLY our handler
        newForm.onsubmit = async function(e) {
            // Prevent ANY other submission
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            
            console.log('🚀 DIRECT SUBMISSION TRIGGERED!');
            
            // Get form data EXACTLY like test page
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('📦 Form data collected:', data);
            
            // Get submit button
            const submitBtn = this.querySelector('button[type="submit"], .form-submit');
            const originalText = submitBtn ? submitBtn.textContent : '';
            
            // Show loading
            if (submitBtn) {
                submitBtn.textContent = 'Sending to Google Sheets...';
                submitBtn.disabled = true;
            }
            
            try {
                // Create form data EXACTLY like test page
                const formDataToSend = new FormData();
                formDataToSend.append('Full Name', data.name || '');
                formDataToSend.append('Email Address', data.email || '');
                formDataToSend.append('Company Name', data.company || '');
                formDataToSend.append('Project Description', data.message || data.description || '');
                
                console.log('📤 Sending to Google Apps Script:', SCRIPT_URL);
                
                // Send EXACTLY like test page
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: formDataToSend
                });
                
                console.log('✅ SENT TO GOOGLE SHEETS!');
                
                // Success feedback
                if (submitBtn) {
                    submitBtn.textContent = '✅ Sent to Spreadsheet!';
                    submitBtn.style.background = '#10b981';
                }
                
                // Show modal if function exists
                if (typeof showSuccessModal === 'function') {
                    showSuccessModal(data.name, data.email);
                } else {
                    // Fallback alert
                    alert(`✅ SUCCESS!\n\nThank you ${data.name}!\n\nYour information has been sent to our Google Spreadsheet.\n\nWe'll contact you at ${data.email} within 24 hours.`);
                }
                
                // Reset form
                this.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }
                }, 3000);
                
            } catch (error) {
                console.error('❌ Error:', error);
                if (submitBtn) {
                    submitBtn.textContent = '❌ Error - Try Again';
                    submitBtn.disabled = false;
                }
            }
            
            // ABSOLUTELY prevent any other submission
            return false;
        };
        
        // Also override action to prevent any GET submission
        newForm.action = 'javascript:void(0)';
        newForm.method = 'dialog';
        
        console.log(`✅ Form ${index} completely hijacked!`);
    });
}

// Run immediately
hijackFormCompletely();

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hijackFormCompletely);
} else {
    setTimeout(hijackFormCompletely, 100);
}

// Run when window loads
window.addEventListener('load', hijackFormCompletely);

// Keep trying every second for 5 seconds
let attempts = 0;
const interval = setInterval(() => {
    attempts++;
    console.log(`🔄 Hijack attempt ${attempts}`);
    hijackFormCompletely();
    if (attempts >= 5) {
        clearInterval(interval);
    }
}, 1000);

console.log('💪 DIRECT handler ready - will hijack all contact forms!');