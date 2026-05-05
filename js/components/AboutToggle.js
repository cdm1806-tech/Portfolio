import { state, setState } from "../state.js";

export default function AboutToggle() {
    let btn, about;

    return {
        mount(root) {
            btn = root.getElementById("toggleAboutBtn");
            about = root.getElementById("aboutText");

            if (!btn || !about) return;

            if (btn.dataset.bound) return;
            btn.dataset.bound = "true";

            btn.addEventListener("click", () => {
                setState({ aboutVisible: !state.aboutVisible });
            });
        },

        update(state) {
            if (!btn || !about) return;

            about.classList.toggle("hidden", !state.aboutVisible);

            btn.textContent = state.aboutVisible
                ? "Hide About"
                : "Show About";
        }
    };
}