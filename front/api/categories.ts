import { apiFetch } from "./base"

export function getAllCategories() {
    return apiFetch("/categories")
}

export function getCategory(id: number) {
    return apiFetch(`/categories/${id}`)
}

export function createCategory(data: { name: string }) {
    return apiFetch("/categories", {
        method: "POST",
        body: JSON.stringify(data),
    })
}

export function updateCategory(id: number, data: { name: string }) {
    return apiFetch(`/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    })
}

export function deleteCategory(id: number) {
    return apiFetch(`/categories/${id}`, {
        method: "DELETE",
    })
}
