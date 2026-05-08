export async function fetchProjects() {
    try {
        const res = await fetch("./data/projects.json");

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }

        return await res.json();

    } catch (err) {
        console.error("Project load failed:", err);
        return [];
    }
}