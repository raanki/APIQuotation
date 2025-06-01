"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getRandomQuotation } from "@/api/quotations"
import { getAllCategories } from "@/api/categories"

export default function Home() {
    const [quote, setQuote] = useState<string>("")
    const [categories, setCategories] = useState<string[]>([])

    useEffect(() => {
        getRandomQuotation().then((q) => {
            setQuote(q.content)
        })

        getAllCategories().then((data) => {
            setCategories(data.map((cat: any) => cat.name))
        })
    }, [])

    return (
        <main className="p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <Button variant="outline">Voir</Button>
                <Button variant="default">+</Button>
            </div>

            <div className="flex gap-4">
                <Button variant="secondary">{categories[0] || "Catégorie"}</Button>
                <Button variant="default">{quote || "Citation"}</Button>
            </div>
        </main>
    )
}
