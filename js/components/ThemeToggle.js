import { state, setState } from "../state.js";

export default function ThemeToggle() {
    return {
        mount(root) {
            const btn = root.getElementById("themeToggle");
            if (!btn) return;

            btn.addEventListener("click", () => {
                setState({
                    theme: state.theme === "dark" ? "light" : "dark"
                });
            });
        }
    };
}