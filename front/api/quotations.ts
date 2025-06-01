import { apiFetch } from "./base"

export function getAllQuotations() {
    return apiFetch("/quotations")
}

export function getQuotation(id: number) {
    return apiFetch(`/quotations/${id}`)
}

export function createQuotation(data: {
    content: string
    author: string
    categoryId: number
}) {
    return apiFetch("/quotations", {
        method: "POST",
        body: JSON.stringify(data),
    })
}

export function updateQuotation(id: number, data: {
    content: string
    author: string
    categoryId: number
}) {
    return apiFetch(`/quotations/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    })
}

export function deleteQuotation(id: number) {
    return apiFetch(`/quotations/${id}`, {
        method: "DELETE",
    })
}

export function getRandomQuotation() {
    return apiFetch("/quotations/random")
}

export function getRandomByCategory(categoryId: number) {
    return apiFetch(`/quotations/random/category/${categoryId}`)
}

export function getQuotationById(id: number) {
    return apiFetch(`/quotations/${id}`)
}
