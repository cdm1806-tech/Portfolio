import { state, setState } from "../state.js";

export default function ProjectsList() {
    let root;

    return {
        mount(dom) {
            root = dom.getElementById("projectsRoot");
            if (!root) return;

            root.addEventListener("click", (e) => {
                const btn = e.target.closest(".toggleProjectBtn");
                if (!btn) return;

                const id = Number(btn.dataset.id);

                const updated = state.projects.map(p =>
                    p.id === id ? { ...p, open: !p.open } : p
                );

                setState({ projects: updated });
            });
        },

        update(state) {
            if (!root) {
                console.warn("Projects root not found");
            }

            root.innerHTML = state.projects.map(p => `
                <article class="card">

                    <div class="card-image">
                        <img src="${p.image || ''}" alt="${p.title || ''}">
                    </div>

                    <h3>${p.title || ""}</h3>

                    <div class="tags">
                        ${(p.tags || []).map(tag => `
                            <span class="tag">${tag}</span>  
                        `).join("")}
                    </div>

                    <p class="short">${p.short || ""}</p>

                    <p class="full ${p.open ? "" : "hidden"}">
                        ${p.full || ""}
                    </p>

                    <!-- LINKS -->
                    <div class="project-links">
                       <div class="project-links">
                            ${p.live ? `<a href="${p.live}" target="_blank" class="btn btn-outline">Live</a>` : ""}
                            ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-outline">Code</a>` : ""}
                        </div>
                    </div>

                    <button class="btn btn-primary toggleProjectBtn" data-id="${p.id}">
                        ${p.open ? "Less Info" : "More Info"}
                    </button>

                </article>
            `).join("");

            console.log("PROJECT ITEM:", p);
        }
    };
}