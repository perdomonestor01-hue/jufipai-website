/**
 * JufipAI Website - Main Entry Point
 * Imports all modules and CSS, initializes the app.
 */

// CSS imports (order matters: variables first)
import './styles/base/variables.css';
import './styles/base/reset.css';
import './styles/base/body.css';
import './styles/layout/header.css';
import './styles/layout/hero.css';
import './styles/layout/container.css';
import './styles/components/particles.css';
import './styles/components/robot.css';
import './styles/components/services.css';
import './styles/components/features.css';
import './styles/components/process.css';
import './styles/components/contact.css';
import './styles/components/testimonials.css';
import './styles/components/blog.css';
import './styles/components/popups.css';
import './styles/components/notifications.css';
import './styles/components/auth.css';
import './styles/components/welcome.css';
import './styles/components/loading.css';
import './styles/components/error-ui.css';
import './styles/themes/light-mode.css';
import './styles/utils/animations.css';
import './styles/utils/responsive.css';

// Module imports
import './modules/sanitize';
import { initWelcome } from './modules/welcome';
import { initParticles } from './modules/particles';
import { initNavigation } from './modules/navigation';
import { initForms } from './modules/forms';
import { initPopups } from './modules/popups';
import { initTranslations, initDarkMode } from './modules/translations';
import { initLazyLoading } from './modules/lazy-loading';
import { initTestimonials } from './modules/testimonials';
import { initAnimations } from './modules/animations';
import { ArticleManager } from './modules/articles';
import { NotificationManager } from './modules/notifications';
import { AuthManager } from './modules/auth';
import { registerServiceWorker } from './modules/sw-register';

// Register Service Worker (production only)
registerServiceWorker();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('[JufipAI] Initializing modules...');

    initParticles();
    initNavigation();
    initForms();
    initPopups();
    initTranslations();
    initDarkMode();
    initLazyLoading();
    initTestimonials();
    initAnimations();
    ArticleManager.init();
    NotificationManager.init();
    AuthManager.init();

    console.log('[JufipAI] All modules initialized');
});

// Welcome overlay on full page load
window.addEventListener('load', () => {
    initWelcome();
});
