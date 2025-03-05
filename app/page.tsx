"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Star, Heart } from "lucide-react"
import Image from "next/image"

const FloatingElement = ({
  children,
  initialX,
  initialY,
}: {
  children: React.ReactNode
  initialX: number
  initialY: number
}) => {
  return (
    <motion.div
      drag
      dragMomentum={false} // Prevents it from flying off
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.2 }}
      onDragEnd={(event, info) => {
        // Reset the position when dragging stops
        if (event.currentTarget) {
          (event.currentTarget as HTMLElement).style.transform = `translate(${initialX}px, ${initialY}px)`
        }
      }}
      animate={{
        x: initialX,
        y: [initialY, initialY + 20, initialY],
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ zIndex: 40 }}
    >
      {children}
    </motion.div>
  )
}


export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    city: ""
  })
  const [showWelcome, setShowWelcome] = useState(true)

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name.trim() && formData.mobile.trim() && formData.city.trim()) {
      // Store all data in localStorage
      localStorage.setItem("doctorName", formData.name.trim())
      localStorage.setItem("doctorMobile", formData.mobile.trim())
      localStorage.setItem("doctorCity", formData.city.trim())
      setShowWelcome(false)
    }
  }

  const handleStartJourney = () => {
    router.push("/questions")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 overflow-hidden">
      <div className="container max-w-5xl mx-auto px-4 py-12 relative">
        {/* Background Elements */}
        {/* Background Elements */}
        {showWelcome && (
          <>
            <FloatingElement initialX={730} initialY={240}>
              <Image
                src="/assets/images/stethoscope.png"
                alt="Stethoscope"
                width={100}
                height={100}
                draggable="false"
                className="max-w-none hidden sm:block"
              />
            </FloatingElement>

            <FloatingElement initialX={182} initialY={61}>
              <Image
                src="/assets/images/pink-heart.png"
                alt="Heart"
                width={100}
                height={100}
                draggable="false"
                className="max-w-none hidden sm:block"
              />
            </FloatingElement>
          </>
        )}




        <AnimatePresence mode="wait">
          {showWelcome ? (
            // Name Input Screen
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="max-w-xl mx-auto border-2 border-pink-200 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 mx-auto mb-10 rounded-full"
                  >
                    <Image
                      src="/assets/images/logohome.png"
                      alt="Biological E"
                      width={90}
                      height={90}
                      className=""
                    />
                  </motion.div>

                  <form onSubmit={handleNameSubmit} className="space-y-6">
                    <div className="text-center space-y-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Welcome to Women's Day Celebration
                      </h1>
                      <p className="text-gray-600">Please enter your details to begin your journey</p>
                    </div>

                    <div className="space-y-4">
                      {/* Name Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Dr.</label>
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                          required
                        />
                      </div>

                      {/* Mobile Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Mobile Number</label>
                        <Input
                          type="tel"
                          placeholder="Enter your mobile number"
                          value={formData.mobile}
                          onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          required
                        />
                      </div>

                      {/* City Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <Input
                          type="text"
                          placeholder="Enter your city"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      disabled={!formData.name.trim() || !formData.mobile.trim() || !formData.city.trim()}
                    >
                      Continue
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            // Main Welcome Screen
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-4"
              >
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                  Celebrating You—Strong, Balanced & Unbreakable!
                </h1>
              </motion.div>

              <Card className="border-2 border-pink-200 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <p className="text-xl text-gray-800 font-medium">
                        Dear Dr. {formData.name}, When a woman is in balance, she's unbreakable. 💪
                      </p>

                      <p className="text-gray-700 leading-relaxed">
                        This Women's Day, let's celebrate you—your strength, your passion, and your dedication. At
                        <span className="font-semibold">  Biological E </span>, we believe that true wellness comes from balance—in health, hormones, and
                        happiness.
                      </p>

                      <p className="text-gray-700 leading-relaxed">
                        To honour this, we'd love to understand what inspires you, energizes you, and keeps you going
                        through a short, fun survey.
                      </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex justify-center">
                      <Button
                        onClick={handleStartJourney}
                        size="lg"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
                      >
                        <Star className="mr-2 h-5 w-5 fill-yellow-100" /> Begin Your Journey
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

