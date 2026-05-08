import { setState } from "../state.js";
import { closeProjectRoute } from "../router.js";

export default function ProjectModal() {

    let root;
    let escBound = false;

    function closeModal() {
        setState({ activeProject: null });
        document.body.classList.remove("modal-open");
        closeProjectRoute(project.id);
    }

    function handleKeydown(e) {
        if (e.key === "Escape") {
            closeModal();
        }
    }

    return {

        mount(dom) {

            root = dom.getElementById("modalRoot");
            if (!root) return;

            // Prevent duplicate ESC listeners
            if (!escBound) {
                document.addEventListener("keydown", handleKeydown);
                escBound = true;
            }

            // Stable event delegation
            root.addEventListener("click", (e) => {

                // Overlay click (only outer layer)
                if (e.target.classList.contains("modal-overlay")) {
                    closeModal();
                    return;
                }

                // Close button
                const closeBtn = e.target.closest(".modal-close");
                if (closeBtn) {
                    closeModal();
                    return;
                }
            });
        },

        update(state) {

            if (!root) return;

            const p = state.activeProject;

            // CLOSE STATE
            if (!p) {
                root.innerHTML = "";
                document.body.classList.remove("modal-open");
                return;
            }

            // OPEN STATE
            document.body.classList.add("modal-open");

            root.innerHTML = `
                <div class="modal-overlay">

                    <div class="modal">

                        <button class="modal-close">✕</button>

                        <div class="modal-content">

                            <!-- everything inside modal -->

                        </div>

                        <div class="modal-image">
                            <img src="${p.image || ""}" alt="${p.title || ""}">
                        </div>

                        <h2>${p.title || ""}</h2>

                        <div class="tags">
                            ${(p.tags || []).map(tag => `
                                <span class="tag">${tag}</span>
                            `).join("")}
                        </div>

                        <p>${p.full || ""}</p>

                        <div class="project-links">

                            ${p.live ? `
                                <a href="${p.live}" target="_blank" class="btn btn-primary">
                                    Live Demo
                                </a>
                            ` : ""}

                            ${p.github ? `
                                <a href="${p.github}" target="_blank" class="btn btn-outline">
                                    Code
                                </a>
                            ` : ""}

                        </div>

                    </div>

                </div>
            `;
        }
    };
}