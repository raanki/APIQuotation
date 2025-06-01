"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getQuotationById, updateQuotation } from "@/api/quotations"
import { getAllCategories } from "@/api/categories"

export default function EditQuotationPage() {
    const { id } = useParams()
    const router = useRouter()
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [categories, setCategories] = useState<{ id: number, name: string }[]>([])

    useEffect(() => {
        getAllCategories().then((data) => {
            if (Array.isArray(data))
            {
                setCategories(data)
            }
        })

        if (id)
        {
            getQuotationById(Number(id)).then((q) => {
                if (q)
                {
                    setContent(q.content)
                    setAuthor(q.author)
                    setCategoryId(q.category?.id?.toString() || "")
                }
            })
        }
    }, [id])

    const handleUpdate = async () => {
        await updateQuotation(Number(id), {
            content,
            author,
            categoryId: parseInt(categoryId),
        })
        router.push("/quotation/manage")
    }

    return (
        <main className="relative p-6 min-h-screen">
            <div className="absolute top-6 left-6">
                <Button variant="outline" onClick={() => router.push("/quotation/manage")}>
                    ← Retour
                </Button>
            </div>

            <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
                <h1 className="text-xl font-bold">Modifier la citation</h1>
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

                <Button onClick={handleUpdate}>Enregistrer</Button>
            </div>
        </main>
    )
}
