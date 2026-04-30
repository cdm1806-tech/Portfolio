import { navigate } from "../router.js";

export default function HeroCTA() {
    return {
        mount(root) {
            const btn = root.getElementById("viewProjectsBtn");
            if (!btn) return;

            btn.addEventListener("click", () => {
                navigate("#projects");
            });
        }
    };
}