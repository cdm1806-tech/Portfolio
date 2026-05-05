export function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.getElementById("menuToggle");
    const closeBtn = document.getElementById("closeSidebar");
    const overlay = document.getElementById("overlay");

    if (!sidebar || !openBtn || !closeBtn || !overlay) return;

    if (sidebar.dataset.bound) return;
    sidebar.dataset.bound = "true";

    function openSidebar() {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    }

    function closeSidebar() {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }

    openBtn.addEventListener("click", openSidebar);
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    document.querySelectorAll(".sidebar .nav-link").forEach(link => {
        link.addEventListener("click", closeSidebar);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSidebar();
    });
}