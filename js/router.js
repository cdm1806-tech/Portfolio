import { state, setState } from "./state.js";

export function initRouter() {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            navigate(link.getAttribute("href"));
        });
    });

    window.addEventListener("popstate", () => {
        navigate(location.hash || state.currentSection, false);
    });

    navigate(location.hash || state.currentSection, false);
}

export function navigate(hash, push = true) {
    const section = document.querySelector(hash);
    if (!section) return;

    if (push) {
        history.pushState(null, "", hash);
    }

    section.scrollIntoView({ behavior: "smooth" });

    setState({ currentSection: hash });

    animate(section);
}

function animate(section) {
    document.querySelectorAll("section").forEach(s => {
        s.classList.remove("active-section");
    });

    setTimeout(() => {
        section.classList.add("active-section");
    }, 50);
}