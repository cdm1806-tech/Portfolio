export default function ProjectsList() {
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