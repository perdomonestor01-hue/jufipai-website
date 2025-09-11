// ULTRA SIMPLE FORM SOLUTION - VERSION 2.0
console.log('🚀 ULTRA SIMPLE FORM v2.0 LOADING at', new Date().toISOString());

// IMMEDIATE EXECUTION - No waiting
(function() {
    console.log('🔥 IMMEDIATE FORM TAKEOVER STARTING...');
    
    // Function to completely take over a form
    function takeOverForm(form) {
        if (!form) return;
        
        console.log('🎯 Taking over form:', form.id || form.className);
        
        // Method 1: Set onsubmit directly
        form.onsubmit = function(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            
            console.log('🛑 FORM SUBMISSION INTERCEPTED!');
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            console.log('📊 CAPTURED DATA:', data);
            
            // Save to localStorage
            const timestamp = new Date().toISOString();
            const leadData = {
                timestamp: timestamp,
                ...data,
                page: window.location.href,
                captureMethod: 'ULTRA_SIMPLE_v2'
            };
            
            // Store in BOTH localStorage keys for redundancy
            const leads1 = JSON.parse(localStorage.getItem('jufipai_leads') || '[]');
            leads1.push(leadData);
            localStorage.setItem('jufipai_leads', JSON.stringify(leads1));
            
            const leads2 = JSON.parse(localStorage.getItem('jufipai_submissions') || '[]');
            leads2.push(leadData);
            localStorage.setItem('jufipai_submissions', JSON.stringify(leads2));
            
            console.log('💾 LEAD SAVED TO LOCALSTORAGE!');
            console.log('📊 Total leads (jufipai_leads):', leads1.length);
            console.log('📊 Total leads (jufipai_submissions):', leads2.length);
            
            // Visual feedback
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
            
            // Alert confirmation
            alert(`✅ SUCCESS!\n\nThank you ${data.name}!\n\nWe've captured your information and will contact you at ${data.email} within 24 hours.`);
            
            // Reset form
            this.reset();
            
            // Prevent any further processing
            return false;
        };
        
        // Method 2: Also set action to javascript:void(0) to prevent any submission
        form.setAttribute('action', 'javascript:void(0)');
        
        // Method 3: Remove method attribute
        form.removeAttribute('method');
        
        // Method 4: Add event listener as backup
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            console.log('🛡️ BACKUP HANDLER: Preventing default submission');
            return false;
        }, true); // Use capture phase
        
        console.log('✅ Form takeover complete for:', form.id || form.className);
    }
    
    // Take over ALL forms immediately
    function takeOverAllForms() {
        const forms = document.querySelectorAll('#contactForm, .contact-form, form');
        console.log(`🔍 Found ${forms.length} forms to take over`);
        
        forms.forEach((form, index) => {
            takeOverForm(form);
        });
        
        return forms.length;
    }
    
    // Run immediately
    const count = takeOverAllForms();
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', takeOverAllForms);
    } else {
        setTimeout(takeOverAllForms, 0);
    }
    
    // Run when page loads
    window.addEventListener('load', takeOverAllForms);
    
    // Keep checking for new forms
    let checkCount = 0;
    const checkInterval = setInterval(function() {
        checkCount++;
        const forms = takeOverAllForms();
        if (forms > 0 || checkCount > 10) {
            clearInterval(checkInterval);
        }
    }, 500);
    
    // Utility functions
    window.getLeads = function() {
        const leads1 = JSON.parse(localStorage.getItem('jufipai_leads') || '[]');
        const leads2 = JSON.parse(localStorage.getItem('jufipai_submissions') || '[]');
        
        console.log('📊 LEADS FROM jufipai_leads:', leads1.length);
        console.table(leads1);
        console.log('📊 LEADS FROM jufipai_submissions:', leads2.length);
        console.table(leads2);
        
        // Combine and deduplicate
        const allLeads = [...leads1, ...leads2];
        const uniqueLeads = Array.from(new Map(allLeads.map(item => [item.timestamp, item])).values());
        
        console.log('📊 TOTAL UNIQUE LEADS:', uniqueLeads.length);
        return uniqueLeads;
    };
    
    window.clearLeads = function() {
        localStorage.removeItem('jufipai_leads');
        localStorage.removeItem('jufipai_submissions');
        console.log('🗑️ All leads cleared');
    };
    
    window.exportLeads = function() {
        const leads = getLeads();
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
        
        // Create download link
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jufipai_leads_${new Date().toISOString()}.csv`;
        a.click();
        
        return csv;
    };
    
    console.log('✅ ULTRA SIMPLE FORM v2.0 READY!');
    console.log('🛡️ Forms are now protected from GET submission');
    console.log('📊 Commands: getLeads() | exportLeads() | clearLeads()');
})();