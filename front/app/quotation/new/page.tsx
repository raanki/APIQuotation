"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createQuotation } from "@/api/quotations"
import { getAllCategories } from "@/api/categories"

export default function NewQuotationPage() {
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([])
    const router = useRouter()

    useEffect(() => {
        getAllCategories().then((data) => {
            if (Array.isArray(data))
            {
                setCategories(data)
            }
        })
    }, [])

    const handleSubmit = async () => {

        console.log("categoryId => ", categoryId);
        await createQuotation({ content, author, categoryId: parseInt(categoryId) })
        router.push("/")
    }

    return (
        <main className="p-6 flex flex-col gap-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold">Nouvelle citation</h1>
            <Input placeholder="Contenu" value={content} onChange={(e) => setContent(e.target.value)} />
            <Input placeholder="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} />

            <select
                className="border p-2 rounded"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <Button onClick={handleSubmit}>Créer</Button>
        </main>
    )
}
