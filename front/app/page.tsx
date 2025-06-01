"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getRandomQuotation } from "@/api/quotations"
import { getAllCategories } from "@/api/categories"
import { useRouter } from "next/navigation"

export default function Home() {
    const [quote, setQuote] = useState<string>("")
    const [categories, setCategories] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
        getRandomQuotation().then((q) => {
            if (q?.content)
            {
                setQuote(q.content)
            }
        })

        getAllCategories().then((data) => {
            if (Array.isArray(data))
            {
                setCategories(data.map((cat: any) => cat.name))
            }
            else
            {
                setCategories([])
            }
        })
    }, [])

    return (
        <main className="p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <Button variant="outline" onClick={() => router.push("/quotation/new")}>
                    Ajouter une citation
                </Button>
                <Button variant="default" onClick={() => router.push("/category/new")}>
                    Ajouter une catégorie
                </Button>
            </div>

            <div className="flex gap-4">
                <Button variant="secondary">{categories[0] || "Catégorie"}</Button>
                <Button variant="default">{quote || "Citation"}</Button>
            </div>
        </main>
    )
}
