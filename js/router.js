import { state, setState } from "./state.js";

export function initRouter() {
    document.querySelectorAll(".nav-link").forEach(link => {

        if (link.dataset.bound) return;
        link.dataset.bound = "true";

        link.addEventListener("click", (e) => {
            e.preventDefault();
            navigate(link.getAttribute("href"));
        });
    });

    window.addEventListener("popstate", () => {
        navigate(location.hash || state.currentSection, false);

        syncProjectFromURL();
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

export function openProjectRoute(slug) {

    const url = new URL(window.location);

    url.searchParams.set("project", slug);

    history.pushState({}, "", url);

}

export function closeProjectRoute() {

    const url = new URL(window.location);

    url.searchParams.delete("project");

    history.pushState({}, "", url);

}

function animate(section) {
    document.querySelectorAll("section").forEach(s => {
        s.classList.remove("active-section");
    });

    setTimeout(() => {
        section.classList.add("active-section");
    }, 50);
}

export function syncProjectFromURL() {

    const params = new URLSearchParams(window.location.search);

    const projectSlug = params.get("project");

    if (!projectSlug) return;

    if (!Array.isArray(state.projects)) return;

    const project = state.projects?.find?.(
        p => p.slug === projectSlug
    );

    if (!project) return;

    setState({
        activeProject: project
    });
}