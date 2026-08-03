const API = "http://127.0.0.1:8000";

export async function register(data) {
    const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Register failed");
    }

    return await response.json();
}

export async function login(data) {
    const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Login failed");
    }

    return await response.json();
}