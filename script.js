/**
 * Ensures the single subtle entrance animation fires exactly 
 * once the DOM is ready, avoiding any Flash of Unstyled Content (FOUC).
 */
document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
        // Request animation frame ensures the browser has painted the initial state
        // before we apply the animation class, making it buttery smooth.
        requestAnimationFrame(() => {
            heroSection.classList.add("fade-in");
        });
    }

    const navbarToggle = document.querySelector(".navbar-toggle");
    const navbarLinks = document.querySelector(".navbar-links");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("#hero, #about, #skills, #projects, #experience, #contact");

    if (navbarToggle && navbarLinks) {
        navbarToggle.addEventListener("click", () => {
            const isOpen = navbarToggle.getAttribute("aria-expanded") === "true";
            navbarToggle.setAttribute("aria-expanded", String(!isOpen));
            navbarToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
            navbarLinks.classList.toggle("is-open", !isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navbarToggle.setAttribute("aria-expanded", "false");
                navbarToggle.setAttribute("aria-label", "Open navigation menu");
                navbarLinks.classList.remove("is-open");
            });
        });
    }

    const sectionObserver = new IntersectionObserver(() => {
        const activeSections = Array.from(sections).filter(section => {
            const bounds = section.getBoundingClientRect();
            return bounds.top <= window.innerHeight * 0.55 && bounds.bottom > 72;
        });
        const activeSection = activeSections[activeSections.length - 1];

        if (activeSection) {
            navLinks.forEach(link => {
                const isActive = link.getAttribute("href") === `#${activeSection.id}`;
                link.classList.toggle("active", isActive);
                if (isActive) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }
    }, {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.5]
    });

    sections.forEach(section => sectionObserver.observe(section));
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