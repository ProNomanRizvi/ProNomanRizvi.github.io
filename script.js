/**
 * Ensures the single subtle entrance animation fires exactly 
 * once the DOM is ready, avoiding any Flash of Unstyled Content (FOUC).
 */
document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
        // Request animation frame ensures the browser has painted the initial state
        // before we apply the animation class, making it buttery smooth.
        requestAnimationFrame(() => {
            heroSection.classList.add("fade-in");
        });
    }
});

// === ADD TO script.js (Append to the bottom of the file) ===

// Intersection Observer to handle the single fade-in entrance for the About section
const scrollObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Triggers when 20% of the section is visible
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Ensures it only animates once
        }
    });
}, scrollObserverOptions);

// Select the about section (and any future sections with this class)
document.querySelectorAll('.fade-on-scroll').forEach(section => {
    scrollObserver.observe(section);
});