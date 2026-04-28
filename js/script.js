/* ================= FORM ================= */
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

if (form && message) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const text = document.getElementById("message").value.trim();

        if (!name || !email || !text) {
            message.textContent = "All fields are required.";
            message.style.color = "red";
            return;
        }

        if (!email.includes("@")) {
            message.textContent = "Enter a valid email.";
            message.style.color = "red";
            return;
        }

        message.textContent = "Message sent successfully.";
        message.style.color = "lightgreen";

        form.reset();
    });
}


/* ================= HERO BUTTON ================= */
const heroBtn = document.getElementById("viewProjectsBtn");

if (heroBtn) {
    heroBtn.addEventListener("click", () => {
        // Choose ONE behavior only:

        // OPTION A (multi-page setup)
        window.location.href = "projects.html";

        // OPTION B (single page scroll) → use instead of above if needed
        // document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
    });
}


/* ================= ABOUT TOGGLE ================= */
const toggleBtn = document.getElementById("toggleAboutBtn");
const aboutSection = document.getElementById("about");

if (toggleBtn && aboutSection) {
    toggleBtn.addEventListener("click", () => {
        aboutSection.classList.toggle("hidden");
    });
}


/* ================= PROJECT TOGGLE ================= */
const projectButtons = document.querySelectorAll(".toggleProjectBtn");

projectButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const project = btn.closest(".project");
        if (!project) return;

        const fullText = project.querySelector(".full");
        if (!fullText) return;

        fullText.classList.toggle("hidden");

        btn.textContent =
            fullText.classList.contains("hidden")
                ? "More Info"
                : "Less Info";
    });
});


/* ================= NAV ACTIVE ================= */
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
});


/* ================= THEME TOGGLE ================= */
const themeBtn = document.getElementById("themeToggle");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
}