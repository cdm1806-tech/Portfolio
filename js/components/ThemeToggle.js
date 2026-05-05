import { state, setState } from "../state.js";

export default function ThemeToggle() {
    let btn;

    return {
        mount(root) {
            btn = root.getElementById("themeToggle");
            if (!btn) return;

            if (btn.dataset.bound) return;
            btn.dataset.bound = "true";

            btn.addEventListener("click", () => {
                setState({
                    theme: state.theme === "dark" ? "light" : "dark"
                });
            });
        },

        update(state) {
            document.body.classList.toggle("light-mode", state.theme === "light");
        }
    };
}