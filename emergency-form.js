// EMERGENCY FORM HANDLER - ABSOLUTE LAST RESORT
console.log('🚨 EMERGENCY FORM HANDLER ACTIVATED at', new Date().toISOString());

// Kill ALL existing form behaviors immediately
function killAllForms() {
    // Find every form on the page
    const forms = document.querySelectorAll('form');
    
    forms.forEach((form, index) => {
        console.log(`🔨 Destroying form ${index + 1}:`, form.id || 'unnamed');
        
        // Nuclear option - replace the form entirely
        const newForm = document.createElement('form');
        newForm.id = form.id || `form-${index}`;
        newForm.className = form.className;
        newForm.innerHTML = form.innerHTML;
        
        // Replace the old form
        form.parentNode.replaceChild(newForm, form);
        
        // Now hijack the new form completely
        newForm.onsubmit = function(e) {
            // Stop EVERYTHING
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            
            console.log('🚨 EMERGENCY HANDLER TRIGGERED!');
            
            // Get the data
            const inputs = this.querySelectorAll('input, textarea, select');
            const data = {};
            
            inputs.forEach(input => {
                if (input.name) {
                    data[input.name] = input.value;
                }
            });
            
            console.log('📦 CAPTURED DATA:', data);
            
            // Save it everywhere
            const timestamp = new Date().toISOString();
            const lead = {
                ...data,
                timestamp,
                source: 'EMERGENCY',
                url: window.location.href
            };
            
            // Save to multiple keys
            try {
                // Key 1
                const leads1 = JSON.parse(localStorage.getItem('emergency_leads') || '[]');
                leads1.push(lead);
                localStorage.setItem('emergency_leads', JSON.stringify(leads1));
                
                // Key 2
                const leads2 = JSON.parse(localStorage.getItem('jufipai_leads') || '[]');
                leads2.push(lead);
                localStorage.setItem('jufipai_leads', JSON.stringify(leads2));
                
                // Key 3
                const leads3 = JSON.parse(localStorage.getItem('form_submissions') || '[]');
                leads3.push(lead);
                localStorage.setItem('form_submissions', JSON.stringify(leads3));
                
                console.log('✅ LEAD SAVED TO 3 LOCATIONS!');
                console.log('📊 emergency_leads count:', leads1.length);
                console.log('📊 jufipai_leads count:', leads2.length);
                console.log('📊 form_submissions count:', leads3.length);
                
            } catch (err) {
                console.error('Storage error:', err);
            }
            
            // Visual feedback
            const btn = this.querySelector('button[type="submit"], .form-submit');
            if (btn) {
                btn.style.background = '#10b981';
                btn.innerHTML = '✅ CAPTURED! Check console with getEmergencyLeads()';
                btn.disabled = true;
            }
            
            // Alert user
            alert(`✅ FORM CAPTURED!\n\nName: ${data.name}\nEmail: ${data.email}\n\nCheck browser console:\nType: getEmergencyLeads()`);
            
            // Clear form
            this.reset();
            
            // Absolutely prevent submission
            return false;
        };
        
        // Also override action
        newForm.action = '#';
        newForm.method = 'dialog'; // This prevents submission entirely
        
        // Remove all attributes that could cause submission
        newForm.removeAttribute('target');
        newForm.removeAttribute('enctype');
        
        console.log(`✅ Form ${index + 1} completely hijacked`);
    });
}

// Run immediately and repeatedly
killAllForms();
setTimeout(killAllForms, 100);
setTimeout(killAllForms, 500);
setTimeout(killAllForms, 1000);
setTimeout(killAllForms, 2000);

// Also run on various events
document.addEventListener('DOMContentLoaded', killAllForms);
window.addEventListener('load', killAllForms);

// Helper function to get all leads
window.getEmergencyLeads = function() {
    const emergency = JSON.parse(localStorage.getItem('emergency_leads') || '[]');
    const jufipai = JSON.parse(localStorage.getItem('jufipai_leads') || '[]');
    const submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
    
    console.log('🚨 EMERGENCY LEADS:', emergency);
    console.log('📊 JUFIPAI LEADS:', jufipai);
    console.log('📝 FORM SUBMISSIONS:', submissions);
    
    // Combine all unique leads
    const all = [...emergency, ...jufipai, ...submissions];
    const unique = Array.from(new Map(all.map(item => [item.timestamp, item])).values());
    
    console.log('✅ TOTAL UNIQUE LEADS:', unique.length);
    console.table(unique);
    
    return unique;
};

// Clear function
window.clearAllLeads = function() {
    localStorage.removeItem('emergency_leads');
    localStorage.removeItem('jufipai_leads');
    localStorage.removeItem('form_submissions');
    localStorage.removeItem('jufipai_submissions');
    console.log('🗑️ All leads cleared from all storage locations');
};

console.log('🚨 EMERGENCY FORM HANDLER READY!');
console.log('📊 Type: getEmergencyLeads() to see all captured leads');
console.log('🗑️ Type: clearAllLeads() to clear all stored leads');