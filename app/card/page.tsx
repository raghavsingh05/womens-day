"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Share2, Home, Bold } from "lucide-react"
import html2canvas from "html2canvas"
import 'html2canvas-objectfit-fix';

const baseSize = {
  xs: 'text-xs sm:text-sm md:text-base',
  sm: 'text-sm sm:text-base md:text-lg',
  md: 'text-base sm:text-lg md:text-xl',
  lg: 'text-xl sm:text-xl md:text-2xl',
}

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
      setIsDownloading(true);
      try {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: null,
          logging: false,
          useCORS: true,
          allowTaint: true,
          imageTimeout: 15000, // Ensures images load fully before capture
        });

        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "WomensDayCard.png";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleShare = async () => {
    if (cardRef.current && navigator.share) {
      setIsDownloading(true)
      try {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: null,
          useCORS: true,
          allowTaint: true,
        })

        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              await navigator.share({
                title: "Happy Women's Day! 🌸",
                text: "Celebrating Women's Day!",
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
    "text-red-700",
    "text-pink-500",
    "text-pink-600",
    "text-pink-700",
    "text-pink-800",
    "text-pink-500",
  ]

  // Font families for different answers
  const fontFamilies = [
    'Inter',
    'Inter',
    'Inter',
    'Inter',
    'Inter',
    'Inter',
  ]

  // Add this function to generate random size class
  const getRandomSize = () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const
    const randomIndex = Math.floor(Math.random() * sizes.length)
    const randomOffset = Math.floor(Math.random() * 6) // 0 to 5
    
    // Different scaling for mobile and larger screens
    return `${baseSize[sizes[randomIndex]]} transform 
      scale-${85 + randomOffset * 15} // Mobile: 85% to 160%
      sm:scale-${90 + randomOffset * 10} // Tablet: 90% to 140%
      md:scale-${95 + randomOffset * 8}` // Desktop: 95% to 135%
  }

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

              {/* White Card with Answers - organized layout */}
              <div className="absolute inset-0 flex items-start justify-center">
                <div className="mt-44 sm:mt-[13rem] relative w-[79%] h-[25%]">
                  {Object.entries(answers).map(([key, answer]) => {
                    const index = parseInt(key) - 1
                    if (key !== "6") {
                      let topPosition, leftPosition;
                      
                      switch(index) {
                        case 0:
                          topPosition = 10;
                          leftPosition = 20;
                          break;
                        case 1:
                          topPosition = 10;
                          leftPosition = 65;
                          break;
                        case 2:
                          topPosition =60;
                          leftPosition = 55;
                          break;
                        case 3:
                          topPosition = 52;
                          leftPosition = 80;
                          break;
                        default:
                          topPosition = 52;
                          leftPosition = 11;
                      }
                      
                      return (
                        <div
                          key={key}
                          className={`absolute transform transition-all duration-500 ease-in-out
                            ${textColors[index % textColors.length]} 
                            hover:scale-105 cursor-default
                            text-center max-w-[45%] tracking-wide
                            hover:z-10`}
                          style={{
                            top: `${topPosition}%`,
                            left: `${leftPosition}%`,
                            transform: `translate(-50%, -50%) rotate(0deg)`,
                            fontFamily: fontFamilies[index % fontFamilies.length],
                            fontSize: `${14 + (index % 3)}px`,
                            letterSpacing: '0.03em',
                            textShadow: '1px 1px 1px rgba(0,0,0,0.05)',
                            filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))',
                            lineHeight: '1.6',
                            fontWeight:600
                          }}
                        >
                          {answer}
                        </div>
                      )
                    }
                  })}

                  {/* Last answer (key 6) with special styling */}
                  {answers["6"] && (
                    <div 
                      className="absolute top-[88%] left-1/2 w-full transform -translate-x-1/2 -translate-y-1/2
                        text-lg sm:text-xl md:text-2xl text-pink-600 font-bold text-center
                        max-w-[100%] z-20 tracking-wide"
                      style={{
                        fontFamily: 'Poppins',
                        letterSpacing: '0.03em',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                        lineHeight: '1.4'
                      }}
                    >
                      {answers["6"]}
                    </div>
                  )}
                </div>
              </div>


              {/* Profile Image - moved to bottom right */}
              <div className="absolute sm:bottom-14 bottom-12 sm:right-1 right-0">
                <div className="relative right-0 w-24 h-24 md:h-32 md:w-32 rounded-full bg-white p-1 shadow-lg border-2 border-pink-300">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg?height=100&width=100"}
                      alt="Your photo"
                      fill
                      className="object-fit"
                      sizes="(max-width: 768px) 96px, 112px"
                    />
                  </div>
                </div>

                {/* Username with enhanced styling */}
                <div className="mt-2 ml-[20px] bg-white/90 backdrop-blur-sm px-3 pb-4 py-1 rounded-lg shadow-sm text-center border border-pink-200 transform -translate-x-1/4">
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

        {/* Add this in the head section of your document */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Pacifico&family=Caveat:wght@400;700&family=Satisfy&family=Great+Vibes&family=Kalam:wght@400;700&display=swap');
        `}</style>
      </div>
    </div>
  )
}

