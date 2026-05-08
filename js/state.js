// js/state.js

export const STATE_VERSION = 1;

/* ================= COMPONENT REGISTRY ================= */
export const components = [];

export function register(component) {
    if (!component) {
        console.warn("Skipping invalid component:", component);
        return;
    }
    components.push(component);
}

/* ================= STATE ================= */
export const state = {
    version: STATE_VERSION,

    theme: "dark",
    currentSection: "#home",
    aboutVisible: false,
    filterTag: "All",
    activeProject: null,

    projects: []
};

window.state = state; // for debugging only

/* ================= STATE UPDATE ================= */
export function setState(updates) {
    Object.assign(state, updates);
    render();
    persistState();
}

/* ================= RENDER SYSTEM ================= */
export function render() {
    components.forEach(c => {
        try {
            if (typeof c?.update === "function") {
                c.update(state);
            }
        } catch (err) {
            console.error("Component render failed:", c, err);
        }
    });
}

/* ================= PERSISTENCE ================= */
export function persistState() {
    localStorage.setItem(
        "appState",
        JSON.stringify({
            version: STATE_VERSION,
            theme: state.theme,
            currentSection: state.currentSection,
            aboutVisible: state.aboutVisible,
            projects: state.projects.map(p => ({
                id: p.id,
                open: p.open
            }))
        })
    );
}

/* ================= LOAD ================= */
export function loadState() {
    const saved = localStorage.getItem("appState");
    if (!saved) return;

    try {
        const parsed = JSON.parse(saved);

        if (parsed.version !== STATE_VERSION) {
            localStorage.removeItem("appState");
            return;
        }

        // safe scalar restore only
        state.theme = parsed.theme ?? state.theme;
        state.currentSection = parsed.currentSection ?? state.currentSection;
        state.aboutVisible = parsed.aboutVisible ?? state.aboutVisible;

        // ONLY restore UI state of projects
        if (parsed.projects) {
            state.projects = state.projects.map(p => {
                const saved = parsed.projects.find(x => x.id === p.id);

                return {
                    ...p,
                    open: saved?.open ?? false
                };
            });
        }

    } catch {
        localStorage.removeItem("appState");
    }
}

export function getComponents() {
    return components;
}

export function getAllTags() {
    const tags = state.projects.flatMap(p => p.tags || []);
    return ["All", ...new Set(tags)];
}