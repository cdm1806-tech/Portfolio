import { state, setState, getAllTags } from "../state.js";

export default function ProjectsList() {

    let root;

    function setFilter(tag) {
        setState({
            filterTag: tag
        });
    }

    function openProject(id) {

        const project = state.projects.find(p => p.id === id);

        if (!project) return;

        setState({
            activeProject: project
        });
    }

    return {

        mount(dom) {

            root = dom.getElementById("projectsRoot");

            if (!root) {
                console.warn("Projects root not found");
                return;
            }

            // ================= EVENT DELEGATION =================
            root.addEventListener("click", (e) => {

                // ================= FILTER BUTTON =================
                const filterBtn = e.target.closest(".tag-filter-btn");

                if (filterBtn) {
                    setFilter(filterBtn.dataset.tag);
                    return;
                }

                // ================= PROJECT CARD =================
                const card = e.target.closest(".card");

                if (!card) return;

                const id = Number(card.dataset.id);

                openProject(id);
            });
        },

        update(state) {

            if (!root) return;

            // ================= FILTERED PROJECTS =================
            const filtered = state.filterTag === "All"

                ? state.projects

                : state.projects.filter(p =>
                    p.tags?.includes(state.filterTag)
                );

            // ================= FILTERS =================
            const filtersHTML = `
                <div class="tag-filters">

                    ${getAllTags().map(tag => `

                        <button
                            class="
                                tag-filter-btn
                                ${state.filterTag === tag ? "active" : ""}
                            "
                            data-tag="${tag}"
                        >
                            ${tag}
                        </button>

                    `).join("")}

                </div>
            `;

            // ================= RENDER =================
            root.innerHTML = `

                ${filtersHTML}

                <div class="projects-grid">

                    ${filtered.map(p => `

                        <article
                            class="card"
                            data-id="${p.id}"
                        >

                            <!-- IMAGE -->
                            <div class="card-image">

                                <img
                                    src="${p.image || ""}"
                                    alt="${p.title || ""}"
                                    loading="lazy"
                                >

                            </div>

                            <!-- TITLE -->
                            <h3>
                                ${p.title || ""}
                            </h3>

                            <!-- TAGS -->
                            <div class="tags">

                                ${(p.tags || []).map(tag => `

                                    <span class="tag">
                                        ${tag}
                                    </span>

                                `).join("")}

                            </div>

                            <!-- SHORT DESCRIPTION -->
                            <p class="short">
                                ${p.short || ""}
                            </p>

                            <!-- LINKS -->
                            <div class="project-links">

                                ${p.live ? `

                                    <a
                                        href="${p.live}"
                                        target="_blank"
                                        class="btn btn-outline"
                                    >
                                        Live
                                    </a>

                                ` : ""}

                                ${p.github ? `

                                    <a
                                        href="${p.github}"
                                        target="_blank"
                                        class="btn btn-outline"
                                    >
                                        Code
                                    </a>

                                ` : ""}

                            </div>

                        </article>

                    `).join("")}

                </div>
            `;
        }
    };
}