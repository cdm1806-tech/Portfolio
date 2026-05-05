import { state, setState } from "../state.js";

export default function ProjectsList() {
    let cards = [];

    return {
        mount(root) {
            cards = root.querySelectorAll(".card");

            cards.forEach(card => {
                const btn = card.querySelector(".toggleProjectBtn");
                if (!btn) return;

                if (btn.dataset.bound) return;
                btn.dataset.bound = "true";

                btn.addEventListener("click", () => {
                    const id = Number(card.dataset.id);

                    const updated = state.projects.map(p =>
                        p.id === id
                             ? { ...p, open: !p.open }
                            : { ...p, open: false }
);

                    setState({ projects: updated });
                });
            });
        },

        update(state) {
            cards.forEach(card => {
                const id = Number(card.dataset.id);
                const project = state.projects.find(p => p.id === id);

                if (!project) return;

                const full = card.querySelector(".full");
                const btn = card.querySelector(".toggleProjectBtn");

                if (!full || !btn) return;

                full.classList.toggle("hidden", !project.open);

                btn.textContent = project.open
                    ? "Less Info"
                    : "More Info";
            });
        }
    };
}