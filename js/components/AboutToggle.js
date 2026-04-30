import { state, setState } from "../state.js";

export default function AboutToggle() {
    return {
        mount(root) {
            const btn = root.getElementById("toggleAboutBtn");
            if (!btn) return;

            btn.addEventListener("click", () => {
                setState({ aboutVisible: !state.aboutVisible });
            });
        }
    };
}