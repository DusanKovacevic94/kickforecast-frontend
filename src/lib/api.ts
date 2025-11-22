const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
    }

    return res.json();
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    summary?: string;
    is_published: boolean;
    match_date?: string;
    home_team?: string;
    away_team?: string;
    prediction?: string;
    odds?: string;
    author_id: number;
    created_at: string;
}
