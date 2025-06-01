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
        <main className="relative p-6 min-h-screen flex flex-col justify-center items-center gap-10">

            {/* Boutons en haut à droite */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                <Button className="w-[130px]" variant="outline" onClick={() => router.push("/quotation/manage")}>
                    Gérer les citations
                </Button>
                <Button className="w-[130px]" variant="default" onClick={() => router.push("/category/manage")}>
                    Gérer les catégories
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
