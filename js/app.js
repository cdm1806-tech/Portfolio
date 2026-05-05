import { loadState, render } from "./state.js";
import { initRouter } from "./router.js";

import ThemeToggle from "./components/ThemeToggle.js";
import { initSidebar } from "./components/sidebar.js";
import AboutToggle from "./components/AboutToggle.js";
import ProjectsList from "./components/ProjectsList.js";
import ContactForm from "./components/ContactForm.js";
import HeroCTA from "./components/HeroCTA.js";

import { initScrollReveal, initInitialAnimation } from "./utils.js";

// 🔴 COMPONENT REGISTRY
export const components = [
    ThemeToggle(),
    AboutToggle(),
    ProjectsList(),
    ContactForm(),
    HeroCTA()
];

document.addEventListener("DOMContentLoaded", () => {
    loadState();

    initRouter();
    initSidebar();

    // 🔴 MOUNT ALL COMPONENTS ONCE
    components.forEach(c => c.mount(document));

    initScrollReveal();
    initInitialAnimation();

    render();
});