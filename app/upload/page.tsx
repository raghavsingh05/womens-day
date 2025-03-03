"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, Camera, ArrowLeft, ArrowRight } from "lucide-react"

export default function UploadPage() {
  const router = useRouter()
  const [image, setImage] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load answers from localStorage
    const savedAnswers = localStorage.getItem("womensDay_answers")
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers))
    } else {
      router.push("/questions")
    }
  }, [router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string)
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (image) {
      setIsLoading(true)
      // Save image to localStorage
      localStorage.setItem("womensDay_image", image)

      // Simulate processing time
      setTimeout(() => {
        setIsLoading(false)
        router.push("/card")
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <Progress value={90} className="h-2 bg-pink-100" />
          <p className="text-right mt-2 text-sm text-gray-600">Final Step</p>
        </div>

        <Card className="border-2 border-pink-200 shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Upload Your Photo</h2>

            <p className="text-center text-gray-600 mb-8">
              Add your photo to complete your personalized Women's Day celebration card
            </p>

            <div className="flex flex-col items-center justify-center">
              {image ? (
                <div className="relative w-64 h-64 mb-6 rounded-full overflow-hidden border-4 border-pink-300">
                  <Image src={image || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-64 h-64 mb-6 rounded-full bg-pink-100 flex items-center justify-center border-4 border-pink-300">
                  <Camera className="h-20 w-20 text-pink-300" />
                </div>
              )}

              <label htmlFor="photo-upload" className="cursor-pointer">
                <div className="flex items-center justify-center px-6 py-3 bg-white border border-pink-300 rounded-full text-pink-600 hover:bg-pink-50 transition-colors duration-300">
                  <Upload className="mr-2 h-5 w-5" />
                  <span>{image ? "Change Photo" : "Upload Photo"}</span>
                </div>
                <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>

            <div className="flex justify-between mt-12">
              <Button
                variant="outline"
                onClick={() => router.push("/questions")}
                className="border-pink-300 text-pink-700 hover:bg-pink-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={!image || isLoading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {isLoading ? "Creating Card..." : "Create Card"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

