import { loadState, render } from "./state.js";
import { initRouter } from "./router.js";

import ThemeToggle from "./components/ThemeToggle.js";
import AboutToggle from "./components/AboutToggle.js";
import ProjectsList from "./components/ProjectsList.js";
import ContactForm from "./components/ContactForm.js";
import HeroCTA from "./components/HeroCTA.js";
import { initScrollReveal, initInitialAnimation } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    loadState();

    initRouter();

    ThemeToggle().mount(document);
    AboutToggle().mount(document);
    ProjectsList().mount(document);
    ContactForm().mount(document);
    HeroCTA().mount(document);

    initScrollReveal();
    initInitialAnimation();

    render();
});