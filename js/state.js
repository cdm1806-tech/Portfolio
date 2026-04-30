export const state = {
    theme: "dark",
    currentSection: "#home",
    aboutVisible: false,
};

export function setState(updates) {
    Object.assign(state, updates);
    render();
    persistState();
}

export function render() {
    document.body.classList.toggle("light-mode", state.theme === "light");

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === state.currentSection
        );
    });

    const about = document.getElementById("aboutText");
    if (about) {
        about.classList.toggle("hidden", !state.aboutVisible);
    }
}

export function persistState() {
    localStorage.setItem("appState", JSON.stringify(state));
}

export function loadState() {
    const saved = localStorage.getItem("appState");
    if (!saved) return;

    try {
        Object.assign(state, JSON.parse(saved));
    } catch {}
}