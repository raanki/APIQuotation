"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Pencil, Trash, Plus } from "lucide-react"
import { getAllCategories, deleteCategory } from "@/api/categories"

export default function ManageCategoriesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const router = useRouter()

    const fetchData = async () => {
        const data = await getAllCategories()
        if (Array.isArray(data))
        {
            setCategories(data)
        }
    }

    const handleDelete = async (id: number) => {
        await deleteCategory(id)
        const updated = categories.filter((c) => c.id !== id)
        setCategories(updated)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <main className="p-6 space-y-4 max-w-3xl mx-auto">
            {/* Bouton retour en haut à gauche de la page */}
            <div className="absolute top-6 left-6">
                <Button variant="outline" onClick={() => router.push("/")}>
                    ← Retour
                </Button>
            </div>
            <h1 className="text-2xl font-bold">Gestion des catégories</h1>

            <div className="flex justify-end">
                <Button onClick={() => router.push("/category/new")}>
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                </Button>
            </div>

            {categories.map((cat) => (
                <div
                    key={cat.id}
                    className="border rounded p-4 flex justify-between items-center"
                >
                    <div className="font-medium">{cat.name}</div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => router.push(`/category/edit/${cat.id}`)}>
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(cat.id)}>
                            <Trash className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </main>
    )
}
