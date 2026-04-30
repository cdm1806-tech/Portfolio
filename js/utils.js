export function initScrollReveal() {
    const elements = document.querySelectorAll("section, .project");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add("active");
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}

export function initInitialAnimation() {
    const first = document.querySelector("section");
    if (first) first.classList.add("active-section");
}