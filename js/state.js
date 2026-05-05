import { components } from "./app.js";

export const state = {
    theme: "dark",
    currentSection: "#home",
    aboutVisible: false,

     projects: [
        { id: 1, open: false },
        { id: 2, open: false }
    ]
};

export function setState(updates) {
    Object.assign(state, updates);
    render();
    persistState();
}

export function render() {
    // 🔴 SINGLE SOURCE OF TRUTH → COMPONENTS HANDLE UI
    components.forEach(c => c.update?.(state));
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