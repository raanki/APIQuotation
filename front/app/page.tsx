"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { getRandomQuotation } from "@/api/quotations"
import { useRouter } from "next/navigation"
import { RotateCcw } from "lucide-react"

export default function Home() {
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    const router = useRouter()

    const fetchQuote = async () => {
        const q = await getRandomQuotation()
        if (q?.content)
        {
            setQuote(q.content)
            setAuthor(q.author)
        }
    }

    useEffect(() => {
        fetchQuote()
    }, [])

    return (
        <main className="p-6 min-h-screen flex flex-col justify-center items-center gap-10">
            {/* Boutons à droite */}
            <div className="flex flex-col gap-2 items-end self-end">
                <Button className="w-[120px]" variant="outline" onClick={() => router.push("/quotation/new")}>
                    + citation
                </Button>
                <Button className="w-[120px]" variant="default" onClick={() => router.push("/category/new")}>
                    + catégorie
                </Button>
            </div>

            {/* Citation affichée */}
            <div className="max-w-xl text-center italic text-2xl font-light leading-relaxed">
                “{quote || "Chargement..."}”
                <div className="mt-4 text-right not-italic text-base font-medium">
                    — {author || "..."}
                </div>
            </div>

            {/* Bouton reroll */}
            <Button variant="ghost" onClick={fetchQuote}>
                <RotateCcw className="h-5 w-5" />
            </Button>
        </main>
    )
}
