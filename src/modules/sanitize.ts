/**
 * XSS Sanitization Helpers
 */
import DOMPurify from 'dompurify';

export const sanitize = {
    // Sanitize HTML content (allows safe tags, strips dangerous ones)
    html: (dirty: string): string => {
        if (typeof dirty !== 'string') return '';
        return DOMPurify.sanitize(dirty);
    },
    // Escape text for safe insertion into HTML (no tags allowed)
    text: (dirty: string): string => {
        if (typeof dirty !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = dirty;
        return div.innerHTML;
    },
    // Validate and sanitize URLs (only http/https allowed)
    url: (url: string): string => {
        if (typeof url !== 'string' || !url) return '';
        try {
            const parsed = new URL(url);
            return ['https:', 'http:'].includes(parsed.protocol) ? url : '';
        } catch {
            return '';
        }
    },
    // Sanitize a value for use inside an HTML attribute
    attr: (dirty: string): string => {
        if (typeof dirty !== 'string') return '';
        return dirty.replace(/[&"'<>]/g, (c: string) => ({
            '&': '&amp;', '"': '&quot;', "'": '&#39;', '<': '&lt;', '>': '&gt;'
        } as Record<string, string>)[c]);
    }
};

// Error handling wrapper
export function safeExecute(fn: () => any, context: string = 'Unknown'): any {
    try {
        return fn();
    } catch (error) {
        console.error(`Error in ${context}:`, error);
        return null;
    }
}
