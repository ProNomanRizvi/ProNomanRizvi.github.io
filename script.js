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