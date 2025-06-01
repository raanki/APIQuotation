"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createCategory } from "@/api/categories"

export default function NewCategoryPage() {
    const [name, setName] = useState("")
    const router = useRouter()

    const handleSubmit = async () => {
        await createCategory({ name })
        router.push("/")
    }

    return (
        <main className="p-6 flex flex-col gap-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold">Nouvelle catégorie</h1>
            <Input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
            <Button onClick={handleSubmit}>Créer</Button>
        </main>
    )
}
