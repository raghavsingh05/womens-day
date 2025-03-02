"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Share2, Home, Star, Sparkles } from "lucide-react"
import html2canvas from "html2canvas"

export default function CardPage() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedImage = localStorage.getItem("womensDay_image")
    const savedAnswers = localStorage.getItem("womensDay_answers")

    if (savedImage && savedAnswers) {
      setImage(savedImage)
      setAnswers(JSON.parse(savedAnswers))
    } else {
      router.push("/")
    }
  }, [router])

  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
      })

      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = "WomensDayCard.png"
      link.href = dataUrl
      link.click()
    }
  }

  const handleShare = async () => {
    if (cardRef.current && navigator.share) {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
      })

      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            await navigator.share({
              title: "My Women's Day Celebration Card",
              text: "Check out my personalized Women's Day card!",
              files: [new File([blob], "WomensDayCard.png", { type: "image/png" })],
            })
          } catch (error) {
            console.error("Error sharing:", error)
          }
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
          Your Women's Day Celebration Card
        </h1>

        <div className="flex justify-center mb-10">
          <div ref={cardRef} className="w-full max-w-3xl aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-400/90 via-pink-300/80 to-purple-300/90 z-0"></div>

            {/* Floating stars */}
            <div className="absolute inset-0 z-10 overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-pulse"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                  }}
                >
                  <Star fill="white" className="text-yellow-200" size={Math.random() * 15 + 5} />
                </div>
              ))}
            </div>

            {/* Content Container */}
            <div className="absolute inset-0 z-20 flex flex-col items-center p-8 md:p-12">
              {/* Header with sparkles */}
              <div className="text-center relative mb-6">
                <Sparkles className="absolute -top-8 -left-8 text-yellow-200 h-8 w-8" />
                <Sparkles className="absolute -top-8 -right-8 text-yellow-200 h-8 w-8" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  Celebrating Women's Day
                </h2>
                <p className="text-pink-100 text-lg font-medium">March 8th</p>
              </div>

              {/* Main content grid */}
              <div className="w-full grid grid-cols-2 gap-4 overflow-y-auto max-h-[calc(100%-8rem)]">
                {/* Left column answers */}
                <div className="space-y-3">
                  {Object.entries(answers)
                    .slice(0, 5)
                    .map(([id, answer]) => (
                      <div
                        key={id}
                        className="relative bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/50"
                      >
                        <p className="text-pink-800 text-sm font-medium">{answer}</p>
                        <Star className="absolute top-1 right-1 h-3 w-3 text-yellow-400 fill-yellow-400" />
                      </div>
                    ))}
                </div>

                {/* Center image */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-72">
                  {image && (
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white/70 shadow-lg">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt="Your photo"
                        fill
                        className="object-cover"
                        style={{ objectPosition: "center top" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
                    </div>
                  )}
                </div>

                {/* Right column answers */}
                <div className="space-y-3">
                  {Object.entries(answers)
                    .slice(5)
                    .map(([id, answer]) => (
                      <div
                        key={id}
                        className="relative bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/50"
                      >
                        <p className="text-pink-800 text-sm font-medium">{answer}</p>
                        <Star className="absolute top-1 right-1 h-3 w-3 text-yellow-400 fill-yellow-400" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" /> Download Card
          </Button>

          <Button
            onClick={handleShare}
            className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white"
            size="lg"
          >
            <Share2 className="mr-2 h-5 w-5" /> Share Card
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="border-purple-300 text-purple-700 hover:bg-purple-50"
            size="lg"
          >
            <Home className="mr-2 h-5 w-5" /> Start Over
          </Button>
        </div>
      </div>
    </div>
  )
}

