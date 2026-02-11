/**
 * Particle System Initialization
 */

// Create floating particles
export function createParticles(): void {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

export function initParticles(): void {
    createParticles();
}
