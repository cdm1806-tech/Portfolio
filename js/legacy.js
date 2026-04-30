/* ================= STATE ================= */
const state = {
    theme: "dark",
    currentSection: "#home",
    aboutVisible: false,
};


/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", init);

function init() {
    loadState();

    Router().mount(document);
    ThemeToggle().mount(document);
    AboutToggle().mount(document);
    ProjectsList().mount(document);
    ContactForm().mount(document);
    HeroCTA().mount(document);

    initScrollReveal();
    initInitialAnimation();

    render();
}


/* ================= COMPONENTS ================= */

/* ROUTER */
function Router() {
    return {
        mount(root) {
            const links = root.querySelectorAll(".nav-link");

            links.forEach(link => {
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
    };
}


/* HERO CTA */
function HeroCTA() {
    return {
        mount(root) {
            const btn = root.getElementById("viewProjectsBtn");
            if (!btn) return;

            btn.addEventListener("click", () => {
                navigate("#projects");
            });
        }
    };
}


/* THEME */
function ThemeToggle() {
    return {
        mount(root) {
            const btn = root.getElementById("themeToggle");
            if (!btn) return;

            btn.addEventListener("click", () => {
                setState({
                    theme: state.theme === "dark" ? "light" : "dark"
                });
            });
        }
    };
}


/* ABOUT */
function AboutToggle() {
    return {
        mount(root) {
            const btn = root.getElementById("toggleAboutBtn");
            if (!btn) return;

            btn.addEventListener("click", () => {
                setState({
                    aboutVisible: !state.aboutVisible
                });
            });
        }
    };
}


/* PROJECTS */
function ProjectsList() {
    return {
        mount(root) {
            const container = root.getElementById("projects");
            if (!container) return;

            container.addEventListener("click", (e) => {
                const btn = e.target.closest(".toggleProjectBtn");
                if (!btn) return;

                const project = btn.closest(".project");
                const full = project?.querySelector(".full");
                if (!full) return;

                full.classList.toggle("hidden");

                btn.textContent =
                    full.classList.contains("hidden")
                        ? "More Info"
                        : "Less Info";
            });
        }
    };
}


/* FORM */
function ContactForm() {
    return {
        mount(root) {
            const form = root.getElementById("contactForm");
            const message = root.getElementById("formMessage");

            if (!form || !message) return;

            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const name = val("name");
                const email = val("email");
                const text = val("message");

                if (!name || !email || !text) {
                    msg("All fields are required.", "red"); return;
                }

                if (!email.includes("@")) {
                    msg("Enter a valid email.", "red"); return;
                }

                msg("Message sent successfully.", "lightgreen");
                form.reset();
            });

            function val(id) {
                return root.getElementById(id)?.value.trim();
            }

            function msg(t, c) {
                message.textContent = t;
                message.style.color = c;
            }
        }
    };
}


/* ================= ROUTER CORE ================= */
function navigate(hash, push = true) {
    const section = document.querySelector(hash);
    if (!section) return;

    if (push) {
        history.pushState(null, "", hash);
    }

    section.scrollIntoView({ behavior: "smooth" });

    setState({ currentSection: hash });

    animateSection(section);
}


/* ================= STATE SYSTEM ================= */
function setState(updates) {
    Object.assign(state, updates);
    render();
    persistState();
}

function render() {
    applyTheme();
    applyActiveNav();
    applyAboutVisibility();
}


/* ================= STATE APPLIERS ================= */
function applyTheme() {
    document.body.classList.toggle("light-mode", state.theme === "light");
}

function applyActiveNav() {
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === state.currentSection
        );
    });
}

function applyAboutVisibility() {
    const about = document.getElementById("aboutText");
    if (!about) return;

    about.classList.toggle("hidden", !state.aboutVisible);
}


/* ================= ANIMATIONS ================= */
function animateSection(activeSection) {
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.remove("active-section");
    });

    setTimeout(() => {
        activeSection.classList.add("active-section");
    }, 50);
}

function initInitialAnimation() {
    const first = document.querySelector("section");
    if (first) first.classList.add("active-section");
}

function initScrollReveal() {
    const elements = document.querySelectorAll("section, .project");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}


/* ================= PERSISTENCE ================= */
function persistState() {
    localStorage.setItem("appState", JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem("appState");
    if (!saved) return;

    try {
        Object.assign(state, JSON.parse(saved));
    } catch {}
}