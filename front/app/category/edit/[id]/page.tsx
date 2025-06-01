"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCategory, updateCategory } from "@/api/categories"

export default function EditCategoryPage() {
    const { id } = useParams()
    const router = useRouter()
    const [name, setName] = useState("")

    useEffect(() => {
        if (id)
        {
            getCategory(Number(id)).then((data) => {
                if (data?.name)
                {
                    setName(data.name)
                }
            })
        }
    }, [id])

    const handleUpdate = async () => {
        await updateCategory(Number(id), { name })
        router.push("/category/manage")
    }

    return (
        <main className="relative p-6 min-h-screen">
            <div className="absolute top-6 left-6">
                <Button variant="outline" onClick={() => router.push("/category/manage")}>
                    ← Retour
                </Button>
            </div>

            <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
                <h1 className="text-xl font-bold">Modifier la catégorie</h1>
                <Input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
                <Button onClick={handleUpdate}>Enregistrer</Button>
            </div>
        </main>
    )
}
