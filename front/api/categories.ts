import { apiFetch } from "./base"

export function getAllCategories() {
    return apiFetch("/categories")
}

export function createCategory(data: { name: string }) {
    return apiFetch("/categories", {
        method: "POST",
        body: JSON.stringify(data),
    })
}
