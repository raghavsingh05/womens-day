"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Share2, Home, Heart } from "lucide-react"
import html2canvas from "html2canvas"

export default function CardPage() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

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
      setIsDownloading(true)
      try {
        const canvas = await html2canvas(cardRef.current, {
          scale: 3,
          backgroundColor: null,
          logging: false,
          useCORS: true,
          allowTaint: true,
        })

        const dataUrl = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.download = "WomensDayCard.png"
        link.href = dataUrl
        link.click()
      } catch (error) {
        console.error("Error generating image:", error)
      } finally {
        setIsDownloading(false)
      }
    }
  }

  const handleShare = async () => {
    if (cardRef.current && navigator.share) {
      setIsDownloading(true)
      try {
        const canvas = await html2canvas(cardRef.current, {
          scale: 3,
          backgroundColor: null,
          useCORS: true,
          allowTaint: true,
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
            } finally {
              setIsDownloading(false)
            }
          }
        })
      } catch (error) {
        console.error("Error generating image for sharing:", error)
        setIsDownloading(false)
      }
    }
  }

  // Positions for the cloud answers (more portrait-oriented)
  const positions = [
    { top: "18%", left: "25%", rotate: "-3deg", scale: 0.9 },
    { top: "18%", left: "75%", rotate: "2deg", scale: 0.85 },
    { top: "28%", left: "50%", rotate: "-2deg", scale: 0.9 },
    { top: "70%", left: "25%", rotate: "3deg", scale: 0.85 },
    { top: "70%", left: "75%", rotate: "-3deg", scale: 0.9 },
    { top: "80%", left: "50%", rotate: "2deg", scale: 0.85 },
    { top: "38%", left: "20%", rotate: "-2deg", scale: 0.8 },
    { top: "38%", left: "80%", rotate: "3deg", scale: 0.8 },
    { top: "60%", left: "20%", rotate: "-2deg", scale: 0.85 },
    { top: "60%", left: "80%", rotate: "2deg", scale: 0.9 },
  ]

  // Flower decorations
  const flowers = [
    { top: "5%", left: "5%", emoji: "🌸", rotate: "0deg", scale: 1.2 },
    { top: "5%", left: "95%", emoji: "🌷", rotate: "15deg", scale: 1.3 },
    { top: "95%", left: "5%", emoji: "🌹", rotate: "-10deg", scale: 1.2 },
    { top: "95%", left: "95%", emoji: "🌺", rotate: "10deg", scale: 1.3 },
    { top: "50%", left: "3%", emoji: "💐", rotate: "5deg", scale: 1.2 },
    { top: "50%", left: "97%", emoji: "🌻", rotate: "-5deg", scale: 1.3 },
    { top: "10%", left: "30%", emoji: "🌼", rotate: "8deg", scale: 0.9 },
    { top: "10%", left: "70%", emoji: "🌸", rotate: "-8deg", scale: 0.9 },
    { top: "90%", left: "30%", emoji: "🌷", rotate: "-5deg", scale: 0.9 },
    { top: "90%", left: "70%", emoji: "🌹", rotate: "5deg", scale: 0.9 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 py-8 px-4">
      <div className="container max-w-md mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Your Women's Day Card
        </h1>

        <div className="flex justify-center mb-8">
          <div className="relative w-full">
            {/* Card Container - portrait oriented */}
            <div
              ref={cardRef}
              className="relative w-full aspect-[3/5] rounded-3xl overflow-hidden shadow-[0_10px_50px_rgba(236,72,153,0.4)]"
            >
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-pink-200 via-purple-100 to-pink-200" />

              {/* Decorative pattern overlay */}
              <div className="absolute inset-0 z-0">
              <Image src="/assets/images/background.jpg" alt="Card background" fill className="object-cover" priority />
            </div>
              

              {/* Decorative border */}
              <div className="absolute inset-0 border-[12px] border-white rounded-3xl pointer-events-none" />

              {/* Inner decorative border */}
              <div className="absolute inset-[12px] border-[2px] border-pink-300 rounded-2xl pointer-events-none" />

              {/* Flower decorations */}
              {flowers.map((flower, index) => (
                <div
                  key={`flower-${index}`}
                  className="absolute"
                  style={{
                    top: flower.top,
                    left: flower.left,
                    transform: `translate(-50%, -50%) rotate(${flower.rotate}) scale(${flower.scale})`,
                    zIndex: 5,
                    fontSize: "1.5rem",
                  }}
                >
                  {flower.emoji}
                </div>
              ))}

              {/* Title Banner */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 w-11/12">
                <div className="bg-white/90 backdrop-blur-sm py-3 px-4 rounded-full shadow-lg border-2 border-pink-200">
                  <h2 className="text-center text-xl font-bold text-pink-600">Happy Women's Day</h2>
                </div>
              </div>

              {/* Answer Clouds */}
              {Object.entries(answers).map(([id, answer], index) => {
                const pos = positions[index % positions.length]
                return (
                  <div
                    key={id}
                    className="absolute"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      transform: `translate(-50%, -50%) rotate(${pos.rotate}) scale(${pos.scale})`,
                      zIndex: 10,
                    }}
                  >
                    <div className="relative w-32 h-24">
                      {/* Cloud background */}
                      <Image
                        src="/assets/images/cloud.png"
                        alt="Cloud background"
                        fill
                        className="object-contain"
                        sizes="128px"
                      />

                      {/* Text content */}
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <p className="text-pink-800 text-xs font-medium text-center drop-shadow-sm">{answer}</p>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Center User Image with decorative frame - SMALLER */}
              {image && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  {/* Decorative outer ring */}
                  <div className="relative w-48 h-48 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 p-2 shadow-[0_0_30px_rgba(219,39,119,0.6)]">
                    {/* Decorative middle ring */}
                    <div className="absolute inset-0 rounded-full border-[6px] border-white/70 m-1" />

                    {/* Inner white border */}
                    <div className="absolute inset-2 rounded-full bg-white p-1">
                      {/* Actual image container */}
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt="Your photo"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 192px"
                        />
                      </div>
                    </div>

                    {/* Decorative hearts around the image */}
                    {[...Array(8)].map((_, i) => {
                      const angle = i * 45 * (Math.PI / 180)
                      const x = Math.cos(angle) * 80
                      const y = Math.sin(angle) * 80
                      return (
                        <div
                          key={`heart-${i}`}
                          className="absolute"
                          style={{
                            top: `calc(50% + ${y}px)`,
                            left: `calc(50% + ${x}px)`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <Heart
                            fill={i % 2 === 0 ? "#ec4899" : "#c026d3"}
                            className="w-5 h-5 text-pink-500 drop-shadow-md"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Bottom Quote */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 w-11/12">
                <div className="bg-white/90 backdrop-blur-sm py-3 px-4 rounded-full shadow-lg border-2 border-pink-200">
                  <p className="text-center text-sm font-bold text-purple-700">
                    Celebrating You—Strong, Balanced & Unbreakable!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white shadow-md transition-all hover:shadow-lg"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" />
            {isDownloading ? "Processing..." : "Download Card"}
          </Button>

          <Button
            onClick={handleShare}
            disabled={isDownloading}
            className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white shadow-md transition-all hover:shadow-lg"
            size="lg"
          >
            <Share2 className="mr-2 h-5 w-5" />
            {isDownloading ? "Processing..." : "Share Card"}
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="border-purple-300 text-purple-700 hover:bg-purple-50 shadow-sm transition-all hover:shadow-md"
            size="lg"
          >
            <Home className="mr-2 h-5 w-5" /> Start Over
          </Button>
        </div>

        {isDownloading && (
          <div className="text-center text-purple-600 animate-pulse">
            Creating your beautiful card... Please wait a moment.
          </div>
        )}
      </div>
    </div>
  )
}

