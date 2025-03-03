"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Share2, Home } from "lucide-react"
import html2canvas from "html2canvas"

export default function CardPage() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const cardRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [username, setUsername] = useState<string>("@DR. RITIKA SHARMA")

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Load saved data
    const savedImage = localStorage.getItem("womensDay_image")
    const savedAnswers = localStorage.getItem("womensDay_answers")
    const savedUsername = localStorage.getItem("doctorName")

    if (savedImage && savedAnswers) {
      setImage(savedImage)
      setAnswers(JSON.parse(savedAnswers))
      if (savedUsername) {
        setUsername(savedUsername)
      }
    } else {
      router.push("/")
    }

    return () => window.removeEventListener("resize", checkMobile)
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

  // Convert answers to an array of strings for display
  const answersList = Object.values(answers)

  // Font sizes for different answers to create visual interest
  const fontSizes = [
    "text-lg md:text-xl font-bold",
    "text-base md:text-lg font-medium",
    "text-xl md:text-2xl font-bold",
    "text-base md:text-lg font-medium",
    "text-lg md:text-xl font-semibold",
    "text-xl md:text-2xl font-bold",
    "text-base md:text-lg font-medium",
  ]

  // Colors for different answers
  const textColors = [
    "text-pink-600",
    "text-purple-700",
    "text-pink-500",
    "text-purple-600",
    "text-pink-700",
    "text-purple-800",
    "text-pink-500",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 py-6 px-3 md:py-8 md:px-4">
      <div className="container max-w-md mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Your Women's Day Card
        </h1>

        <div className="flex justify-center mb-6 md:mb-8">
          <div className="relative w-full max-w-[320px] md:max-w-md mx-auto">
            {/* Card Container - portrait oriented */}
            <div
              ref={cardRef}
              className="relative w-full aspect-[9/16] rounded-xl overflow-hidden shadow-[0_10px_50px_rgba(236,72,153,0.4)]"
            >
              {/* Background with custom image */}
              <div className="absolute inset-0">
                <Image
                  src="/assets/images/pinkbackground.jpg"
                  alt="Card background"
                  layout="fill"
                  className="object-cover"
                  priority
                />

                {/* Overlay to ensure text readability */}
                <div className="absolute inset-0 "></div>
              </div>

              {/* Decorative elements */}
              {/* <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-80">
                <Image
                  src="/assets/images/mainbg.jpg"
                  alt="Rose decoration"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div> */}

              {/* Lotus flower decoration */}
              {/* <div className="absolute bottom-1/4 left-4 w-24 h-24 opacity-80">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                  <path
                    d="M50,0 C60,30 90,40 90,60 C90,80 70,90 50,90 C30,90 10,80 10,60 C10,40 40,30 50,0"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </div> */}

              {/* Title Section with enhanced styling */}
              {/* <div className="absolute top-0 left-0 right-0 pt-6 px-4 text-center">
                {/* <div className="bg-pink-100/80 backdrop-blur-2xl py-2 rounded-lg shadow-sm inline-block px-6 mx-auto">
                  <h2 className="text-xl md:text-2xl font-bold text-pink-600 uppercase tracking-wide ">
                    International
                    <br />
                    Women's Day
                  </h2>
                </div> 
                <div className="mt-4">
                  <h3 className="text-lg md:text-xl font-medium text-pink-700 bg-white/70 backdrop-blur-sm py-1 px-4 rounded-full inline-block shadow-sm">
                    Beyond the white coat: My life
                  </h3>
                </div>
              </div> */}

              {/* White Card with Answers - more visually interesting */}
              <div className="sm:my-6 my-2 absolute top-1/4 left-4 right-4 p-4">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center">
                  {answersList.slice(0, 6).map((answer, index) => (
                    <div
                      key={index}
                      className={`${textColors[index % textColors.length]} text-sm md:text-base lg:text-lg transform ${index % 2 === 0 ? "rotate-1" : "-rotate-1"
                        } hover:scale-105 transition-transform`}
                    >
                      {answer}
                    </div>
                  ))}

                  {/* Last answer as a full-width item with special styling */}
                  {answersList.length > 6 && (
                    <div className="w-full text-center text-sm md:text-lg text-pink-600 font-medium px-2 rounded-md">
                      {answersList[6]}
                    </div>
                  )}
                </div>
              </div>


              {/* Profile Image - moved to bottom right */}
              <div className="absolute bottom-12 right-[-10%]">
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-white p-1 shadow-lg border-2 border-pink-300">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg?height=100&width=100"}
                      alt="Your photo"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 96px, 112px"
                    />
                  </div>
                </div>

                {/* Username with enhanced styling */}
                <div className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-center border border-pink-200 transform -translate-x-1/4">
                  <p className="text-xs md:text-sm text-pink-600 font-medium">@Dr. {username}</p>
                </div>
              </div>

              {/* Footer with enhanced styling */}
              {/* <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-xs text-gray-700 bg-white/80 backdrop-blur-sm py-1 px-4 rounded-full inline-block shadow-sm">
                  From the makers of <span className="font-bold">BITOL</span>
                  <sup>®</sup>
                </p>
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-8">
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white shadow-md transition-all hover:shadow-lg text-sm md:text-base"
            size="default"
            variant="default"
          >
            <Download className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            {isDownloading ? "Processing..." : "Download Card"}
          </Button>

          <Button
            onClick={handleShare}
            disabled={isDownloading}
            className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 text-white shadow-md transition-all hover:shadow-lg text-sm md:text-base"
            size="default"
            variant="default"
          >
            <Share2 className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            {isDownloading ? "Processing..." : "Share Card"}
          </Button>

          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="border-purple-300 text-purple-700 hover:bg-purple-50 shadow-sm transition-all hover:shadow-md text-sm md:text-base"
            size="default"
          >
            <Home className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Start Over
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

