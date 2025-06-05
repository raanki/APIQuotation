// const BASE_URL = "http://69.62.110.48:8080"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    })

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`)
    }

    return res.json()
}

export { BASE_URL, apiFetch }
