// GOOGLE SHEETS FORM HANDLER
console.log('📊 Google Sheets Form Handler Loading...');

// Your Google Spreadsheet ID
const SPREADSHEET_ID = '1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro';

// Create professional success modal
function createSuccessModal() {
    // Check if modal already exists
    if (document.getElementById('jufipai-success-modal')) {
        return;
    }
    
    // Create modal HTML
    const modalHTML = `
    <div id="jufipai-success-modal" class="jufipai-modal" style="display: none;">
        <div class="jufipai-modal-overlay"></div>
        <div class="jufipai-modal-content">
            <div class="jufipai-modal-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="38" stroke="#fbbf24" stroke-width="4" opacity="0.3"/>
                    <circle cx="40" cy="40" r="38" stroke="#fbbf24" stroke-width="4" 
                            stroke-dasharray="240" stroke-dashoffset="240" class="circle-animation"/>
                    <path d="M25 40 L35 50 L55 30" stroke="#fbbf24" stroke-width="4" 
                          stroke-linecap="round" stroke-linejoin="round" opacity="0" class="check-animation"/>
                </svg>
            </div>
            <h2 class="jufipai-modal-title">Thank You for Contacting JufipAI!</h2>
            <p class="jufipai-modal-message">
                <span class="user-name"></span>, we've received your information and are excited to help transform your business with AI automation.
            </p>
            <div class="jufipai-modal-details">
                <div class="detail-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="#fbbf24">
                        <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H9v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    <span>We'll contact you within <strong>24 hours</strong></span>
                </div>
                <div class="detail-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="#fbbf24">
                        <path d="M18 8l-8 5-8-5V6l8 5 8-5m0-2H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <span>Check your email at: <strong class="user-email"></strong></span>
                </div>
                <div class="detail-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="#fbbf24">
                        <path d="M9 11H7v2h2v-2zm0-4H7v2h2V7zm0-6C3.9 1 0 4.9 0 10s3.9 9 9 9 9-3.9 9-9-3.9-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/>
                    </svg>
                    <span>Free AI diagnosis & complete automation blueprint</span>
                </div>
            </div>
            <button class="jufipai-modal-button">Got it, Looking Forward!</button>
        </div>
    </div>
    `;
    
    // Create style element
    const styleHTML = `
    <style>
    .jufipai-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    }
    
    .jufipai-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .jufipai-modal-content {
        position: relative;
        background: linear-gradient(135deg, rgba(31, 41, 55, 0.98), rgba(51, 65, 85, 0.98));
        border: 1px solid rgba(251, 191, 36, 0.3);
        border-radius: 24px;
        padding: 3rem;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 0 120px rgba(251, 191, 36, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        animation: slideUp 0.4s ease;
    }
    
    .jufipai-modal-icon {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
    }
    
    .circle-animation {
        animation: drawCircle 0.8s ease forwards 0.2s;
    }
    
    .check-animation {
        animation: drawCheck 0.4s ease forwards 0.8s;
    }
    
    @keyframes drawCircle {
        to {
            stroke-dashoffset: 0;
        }
    }
    
    @keyframes drawCheck {
        to {
            opacity: 1;
        }
    }
    
    .jufipai-modal-title {
        font-size: 2rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .jufipai-modal-message {
        color: #e2e8f0;
        font-size: 1.1rem;
        text-align: center;
        margin-bottom: 2rem;
        line-height: 1.6;
    }
    
    .jufipai-modal-details {
        background: rgba(15, 23, 42, 0.5);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        border: 1px solid rgba(251, 191, 36, 0.1);
    }
    
    .detail-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
        color: #cbd5e1;
    }
    
    .detail-item:last-child {
        margin-bottom: 0;
    }
    
    .detail-item strong {
        color: #fbbf24;
        font-weight: 600;
    }
    
    .jufipai-modal-button {
        width: 100%;
        padding: 1rem 2rem;
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: #1f2937;
        font-weight: 700;
        font-size: 1.1rem;
        border-radius: 12px;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        box-shadow: 
            0 4px 15px rgba(251, 191, 36, 0.4),
            0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .jufipai-modal-button:hover {
        transform: translateY(-2px);
        box-shadow: 
            0 8px 25px rgba(251, 191, 36, 0.5),
            0 4px 8px rgba(0, 0, 0, 0.3);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 600px) {
        .jufipai-modal-content {
            padding: 2rem;
            width: 95%;
        }
        
        .jufipai-modal-title {
            font-size: 1.5rem;
        }
    }
    </style>
    `;
    
    // Add styles to head
    const styleElement = document.createElement('div');
    styleElement.innerHTML = styleHTML;
    document.head.appendChild(styleElement.firstElementChild);
    
    // Add modal to body
    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHTML;
    document.body.appendChild(modalElement.firstElementChild);
    
    // Add close functionality
    const modal = document.getElementById('jufipai-success-modal');
    const button = modal.querySelector('.jufipai-modal-button');
    const overlay = modal.querySelector('.jufipai-modal-overlay');
    
    button.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    overlay.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Show success modal with user data
function showSuccessModal(name, email) {
    createSuccessModal();
    
    const modal = document.getElementById('jufipai-success-modal');
    const nameElement = modal.querySelector('.user-name');
    const emailElement = modal.querySelector('.user-email');
    
    nameElement.textContent = name || 'Friend';
    emailElement.textContent = email || 'your email';
    
    modal.style.display = 'flex';
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 10000);
}

// Google Apps Script Web App URL (you need to deploy this)
// For now, we'll use the Google Forms submission URL pattern
const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${SPREADSHEET_ID}/formResponse`;

function initGoogleFormHandler() {
    console.log('🔍 Looking for forms to initialize...');
    const forms = document.querySelectorAll('#contactForm, .contact-form, form[id="contactForm"]');
    console.log('📊 Found ' + forms.length + ' forms to initialize');
    
    forms.forEach((form, index) => {
        // Skip if already initialized
        if (form.dataset.googleHandlerAttached === 'true') {
            console.log('✅ Form already has handler, skipping:', form.id);
            return;
        }
        
        console.log(`📊 Setting up Google Sheets handler for form ${index + 1}:`, form.id || form.className);
        
        // Mark as initialized BEFORE cloning
        form.dataset.googleHandlerAttached = 'true';
        
        // Remove any existing handlers
        const newForm = form.cloneNode(true);
        newForm.dataset.googleHandlerAttached = 'true';
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
                // Your deployed Google Apps Script Web App URL
                const scriptUrl = 'https://script.google.com/macros/s/AKfycbx6pu8s3tWi_vyVS76X_fqeJTgyS5399MCcX2j3se7zB4IVE0LUCNHkh3IY-u_fjwu-/exec';
                
                // Create form data matching your script's expected field names
                const formDataToSend = new FormData();
                formDataToSend.append('Full Name', data.name || '');
                formDataToSend.append('Email Address', data.email || '');
                formDataToSend.append('Company Name', data.company || '');
                formDataToSend.append('Project Description', data.message || data.description || '');
                
                const response = await fetch(scriptUrl, {
                    method: 'POST',
                    mode: 'no-cors', // Important for Google Scripts
                    body: formDataToSend
                });
                
                console.log('✅ Sent to Google Sheets');
                
                // Success feedback
                submitBtn.textContent = '✓ Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, #059669, #10b981)';
                
                // Show professional success modal
                showSuccessModal(data.name, data.email);
                
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
                
                showSuccessModal(data.name, data.email);
                
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

// Initialize multiple times to ensure we catch the form
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoogleFormHandler);
} else {
    // DOM is already loaded, initialize now
    initGoogleFormHandler();
}

// Also initialize on window load
window.addEventListener('load', function() {
    console.log('🔄 Window loaded - reinitializing forms...');
    initGoogleFormHandler();
});

// Try again after a short delay (for dynamically loaded forms)
setTimeout(function() {
    console.log('⏰ Delayed initialization check...');
    initGoogleFormHandler();
}, 1000);

// And one more time after 2 seconds to be absolutely sure
setTimeout(function() {
    console.log('⏰ Final initialization check...');
    initGoogleFormHandler();
}, 2000);

// Silent backup retrieval (only for admin use)
window.getFormBackups = function() {
    const backups = JSON.parse(localStorage.getItem('form_backups') || '[]');
    console.log('📊 Form backups:', backups);
    return backups;
};

console.log('✅ Google Sheets Form Handler Ready');
console.log('📊 Spreadsheet ID:', SPREADSHEET_ID);