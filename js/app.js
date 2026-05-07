import { loadState, render, register } from "./state.js";
import { initRouter } from "./router.js";

import ThemeToggle from "./components/ThemeToggle.js";
import { initSidebar } from "./components/sidebar.js";
import AboutToggle from "./components/AboutToggle.js";
import ProjectsList from "./components/ProjectsList.js";
import ProjectModal from "./components/ProjectModal.js";
import ContactForm from "./components/ContactForm.js";
import HeroCTA from "./components/HeroCTA.js";
import { getComponents } from "./state.js";

import { initScrollReveal, initInitialAnimation } from "./utils.js";

/* ================= REGISTER COMPONENTS ================= */
register(ThemeToggle());
register(AboutToggle());
register(ProjectsList());
register(ProjectModal());
register(ContactForm());
register(HeroCTA());

/* ================= BOOTSTRAP ================= */
document.addEventListener("DOMContentLoaded", () => {
    loadState();

    initRouter();
    initSidebar();

    // run component mount once
    // (registry holds mount/update lifecycle internally)
    registerBoot();

    initScrollReveal();
    initInitialAnimation();

    render();
});

/* ================= BOOT FUNCTION ================= */
function registerBoot() {
    // mount phase
    const components = getComponents();

    components.forEach(c => c.mount?.(document));
}

window.addEventListener("error", (e) => {
    console.error("GLOBAL ERROR:", e.message, e.error);
});