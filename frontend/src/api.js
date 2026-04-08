const API_URL = "/api";

export async function fetchProjects() {
    const res = await fetch(`${API_URL}/projects/`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    const data = await res.json();
    return data.results !== undefined ? data.results : data;
}

export async function fetchQuestions() {
    const res = await fetch(`${API_URL}/questions/`);
    if (!res.ok) throw new Error("Failed to fetch questions");
    const data = await res.json();
    return data.results !== undefined ? data.results : data;
}

export async function createQuestion(formData) {
    const res = await fetch(`${API_URL}/questions/`, {
        method: "POST",
        body: formData,
    });
    if (!res.ok) throw new Error("Failed to post question");
    return res.json();
}

export async function updateQuestion(id, formData) {
    const res = await fetch(`${API_URL}/questions/${id}/`, {
        method: "PATCH",
        body: formData,
    });
    if (!res.ok) throw new Error("Failed to update question");
    return res.json();
}

export async function createAnswer(questionId, instructorName, content) {
    const res = await fetch(`${API_URL}/answers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            question: questionId,
            instructor_name: instructorName,
            content,
        }),
    });
    if (!res.ok) throw new Error("Failed to post answer");
    return res.json();
}

export async function checkBackendHealth() {
    const res = await fetch("/health/");
    if (!res.ok) throw new Error("Backend unhealthy");
    return res.json();
}
