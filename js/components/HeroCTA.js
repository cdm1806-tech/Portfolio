import { navigate } from "../router.js";

export default function HeroCTA() {
    let btn;

    return {
        mount(root) {
            btn = root.getElementById("viewProjectsBtn");
            if (!btn) return;

            if (btn.dataset.bound) return;
            btn.dataset.bound = "true";

            btn.addEventListener("click", () => {
                navigate("#projects");
            });
        }
    };
}