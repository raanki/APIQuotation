"use client"

import { useEffect, useState } from "react"
import { getAllQuotations, deleteQuotation } from "@/api/quotations"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Pencil, Trash, Plus } from "lucide-react"


export default function ManageQuotationsPage() {
    const [quotations, setQuotations] = useState<any[]>([])
    const router = useRouter()

    const fetchData = async () => {
        const data = await getAllQuotations()
        if (Array.isArray(data))
        {
            setQuotations(data)
        }
    }

    const handleDelete = async (id: number) => {
        await deleteQuotation(id)
        const updated = quotations.filter((q) => q.id !== id)
        setQuotations(updated)
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

            <h1 className="text-2xl font-bold">Gestion des citations</h1>

            <div className="flex justify-end">
                <Button onClick={() => router.push("/quotation/new")}>+ Ajouter</Button>
            </div>

            {quotations.map((q) => (
                <div
                    key={q.id}
                    className="border rounded p-4 flex justify-between items-start flex-col gap-2 sm:flex-row sm:items-center"
                >
                    <div>
                        <div className="font-medium italic">“{q.content}”</div>
                        <div className="text-sm text-muted-foreground">
                            — {q.author} ({q.category?.name || "Sans catégorie"})
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => router.push(`/quotation/edit/${q.id}`)}>
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(q.id)}>
                            <Trash className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </main>
    )
}
