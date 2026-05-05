export default function ContactForm() {
    let form, message;

    return {
        mount(root) {
            form = root.getElementById("contactForm");
            message = root.getElementById("formMessage");

            if (!form || !message) return;

            if (form.dataset.bound) return;
            form.dataset.bound = "true";

            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const name = root.getElementById("name")?.value.trim();
                const email = root.getElementById("email")?.value.trim();
                const text = root.getElementById("message")?.value.trim();

                if (!name || !email || !text) {
                    return show("All fields required", "red");
                }

                if (!email.includes("@")) {
                    return show("Invalid email", "red");
                }

                show("Message sent", "lightgreen");
                form.reset();
            });

            function show(text, color) {
                message.textContent = text;
                message.style.color = color;
            }
        }
    };
}