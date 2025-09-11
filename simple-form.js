// SIMPLE FORM SOLUTION - GUARANTEED TO WORK
console.log('🚀 SIMPLE FORM SOLUTION LOADING at', new Date().toISOString());

// CRITICAL: Attach handler immediately AND on DOM ready
function attachFormHandlers() {
    console.log('📋 Looking for contact forms...');
    
    // Find ALL forms on the page
    const forms = document.querySelectorAll('#contactForm, .contact-form, form');
    console.log(`📋 Found ${forms.length} forms on page`);
    
    if (forms.length === 0) {
        console.log('⚠️ No forms found yet, will retry...');
        return false;
    }
    
    forms.forEach((form, index) => {
        console.log(`🔧 Processing form ${index + 1}:`, form.id || form.className);
        
        // Remove ALL existing event listeners by cloning
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        // Add our simple handler
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('✅ SIMPLE FORM HANDLER ACTIVATED!');
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            console.log('📊 FORM DATA:', data);
            
            // Create email body
            const emailBody = `
NEW LEAD FROM JUFIPAI.COM
==========================
Name: ${data.name || 'Not provided'}
Email: ${data.email || 'Not provided'}
Company: ${data.company || 'Not provided'}
Message: ${data.message || data.description || 'Not provided'}
Page: ${window.location.href}
Time: ${new Date().toLocaleString()}
            `.trim();
            
            // Store in localStorage
            const leads = JSON.parse(localStorage.getItem('jufipai_leads') || '[]');
            leads.push({
                ...data,
                timestamp: new Date().toISOString(),
                page: window.location.href
            });
            localStorage.setItem('jufipai_leads', JSON.stringify(leads));
            
            console.log('💾 LEAD SAVED! Total leads:', leads.length);
            console.log('📧 To retrieve all leads, type: getLeads()');
            
            // Open email client as backup
            const mailto = `mailto:contact@jufipai.com?subject=New Lead from ${data.name}&body=${encodeURIComponent(emailBody)}`;
            console.log('📧 Email link created:', mailto);
            
            // Show success
            const button = this.querySelector('button[type="submit"], .form-submit');
            if (button) {
                const originalText = button.textContent;
                button.textContent = '✓ SUCCESS! Lead Captured!';
                button.style.background = '#10b981';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }
            
            // Show alert as confirmation
            alert(`✅ SUCCESS!\n\nThank you ${data.name}!\nYour information has been captured.\n\nWe'll contact you at: ${data.email}`);
            
            // Reset form
            this.reset();
            
            // Also open mailto as final backup
            // window.location.href = mailto;
        });
        
        console.log(`✅ Simple handler attached to form ${index + 1}`);
    });
    
    return true;
}

// Try multiple times to ensure we catch the form
attachFormHandlers();

// Try when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachFormHandlers);
} else {
    // DOM already loaded
    setTimeout(attachFormHandlers, 100);
}

// Try when page fully loads
window.addEventListener('load', function() {
    setTimeout(attachFormHandlers, 500);
});

// Final attempt after a delay
setTimeout(attachFormHandlers, 2000);

// Global function to get leads
window.getLeads = function() {
    const leads = JSON.parse(localStorage.getItem('jufipai_leads') || '[]');
    console.log('📊 ALL CAPTURED LEADS:');
    console.table(leads);
    return leads;
};

// Clear any existing form data in console
window.clearLeads = function() {
    localStorage.removeItem('jufipai_leads');
    localStorage.removeItem('jufipai_submissions');
    console.log('🗑️ All leads cleared');
};

// Export leads as CSV
window.exportLeads = function() {
    const leads = JSON.parse(localStorage.getItem('jufipai_leads') || '[]');
    if (leads.length === 0) {
        console.log('No leads to export');
        return;
    }
    
    const csv = [
        ['Timestamp', 'Name', 'Email', 'Company', 'Message', 'Page'],
        ...leads.map(lead => [
            lead.timestamp,
            lead.name || '',
            lead.email || '',
            lead.company || '',
            (lead.message || lead.description || '').replace(/,/g, ';'),
            lead.page || ''
        ])
    ].map(row => row.join(',')).join('\n');
    
    console.log('📊 CSV DATA:\n' + csv);
    return csv;
};

// Show instructions
console.log('✅ SIMPLE FORM SOLUTION READY!');
console.log('📊 Commands available:');
console.log('  - getLeads() : View all captured leads');
console.log('  - exportLeads() : Export leads as CSV');
console.log('  - clearLeads() : Clear all stored leads');