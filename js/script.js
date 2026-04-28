
/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", init);

function init() {
    initNavigation();
    initScrollSpy();

    initForm();
    initHeroButton();
    initAboutToggle();
    initProjectToggle();
    initThemeToggle();

    initScrollReveal();
}


/* ================= NAVIGATION (SPA CORE) ================= */
function initNavigation() {
    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href").substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }

            setActiveLink(links, link);
        });
    });
}


/* ================= SCROLL SPY ================= */
function initScrollSpy() {
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.clientHeight;

            if (scrollY >= top - height / 3) {
                current = section.id;
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
}


/* ================= HERO BUTTON ================= */
function initHeroButton() {
    const btn = document.getElementById("viewProjectsBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        scrollToSection("projects");
    });
}


/* ================= FORM ================= */
function initForm() {
    const form = document.getElementById("contactForm");
    const message = document.getElementById("formMessage");

    if (!form || !message) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = getValue("name");
        const email = getValue("email");
        const text = getValue("message");

        if (!name || !email || !text) {
            showMessage(message, "All fields are required.", "red");
            return;
        }

        if (!email.includes("@")) {
            showMessage(message, "Enter a valid email.", "red");
            return;
        }

        showMessage(message, "Message sent successfully.", "lightgreen");
        form.reset();
    });
}


/* ================= ABOUT TOGGLE ================= */
function initAboutToggle() {
    const btn = document.getElementById("toggleAboutBtn");
    const about = document.getElementById("aboutText");

    if (!btn || !about) return;

    btn.addEventListener("click", () => {
        toggleHidden(about);
    });
}


/* ================= PROJECT TOGGLE ================= */
function initProjectToggle() {
    const buttons = document.querySelectorAll(".toggleProjectBtn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const project = btn.closest(".project");
            if (!project) return;

            const full = project.querySelector(".full");
            if (!full) return;

            toggleHidden(full);

            btn.textContent = full.classList.contains("hidden")
                ? "More Info"
                : "Less Info";
        });
    });
}


/* ================= THEME ================= */
function initThemeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
}


/* ================= UTILITIES ================= */
function getValue(id) {
    return document.getElementById(id)?.value.trim();
}

function showMessage(el, text, color) {
    el.textContent = text;
    el.style.color = color;
}

function toggleHidden(el) {
    el.classList.toggle("hidden");
}

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({
        behavior: "smooth"
    });
}

function setActiveLink(links, activeLink) {
    links.forEach(l => l.classList.remove("active"));
    activeLink.classList.add("active");
}

function initScrollReveal() {
    const elements = document.querySelectorAll("section, .project");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}