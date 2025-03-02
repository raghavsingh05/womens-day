"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "What quality do you admire most in yourself?",
    type: "text",
    placeholder: "Share your strength...",
  },
  {
    id: 2,
    question: "Who is a woman that inspires you and why?",
    type: "textarea",
    placeholder: "Tell us about your inspiration...",
  },
  {
    id: 3,
    question: "What achievement are you most proud of?",
    type: "text",
    placeholder: "Share your accomplishment...",
  },
  {
    id: 4,
    question: "What's one challenge you've overcome that made you stronger?",
    type: "textarea",
    placeholder: "Tell us your story...",
  },
  {
    id: 5,
    question: "What's your favorite way to practice self-care?",
    type: "text",
    placeholder: "How do you take care of yourself...",
  },
  {
    id: 6,
    question: "What's one piece of advice you'd give to younger women?",
    type: "textarea",
    placeholder: "Share your wisdom...",
  },
  {
    id: 7,
    question: "What does Women's Day mean to you?",
    type: "textarea",
    placeholder: "Share your thoughts...",
  },
  {
    id: 8,
    question: "What's a dream you're currently pursuing?",
    type: "text",
    placeholder: "Tell us about your aspirations...",
  },
  {
    id: 9,
    question: "What makes you feel empowered?",
    type: "text",
    placeholder: "Share what gives you strength...",
  },
  {
    id: 10,
    question: "Complete this sentence: As a woman, I am...",
    type: "text",
    placeholder: "Express yourself...",
  },
]

export default function QuestionsPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [doctorName, setDoctorName] = useState("")

  useEffect(() => {
    const name = localStorage.getItem("doctorName")
    if (name) {
      setDoctorName(name)
    } else {
      router.push("/")
    }
  }, [router])

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleNext = () => {
    if (currentAnswer.trim()) {
      setAnswers({ ...answers, [questions[currentQuestion].id]: currentAnswer })

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setCurrentAnswer(answers[questions[currentQuestion + 1]?.id] || "")
      } else {
        localStorage.setItem(
          "womensDay_answers",
          JSON.stringify({
            ...answers,
            [questions[currentQuestion].id]: currentAnswer,
          }),
        )
        router.push("/upload")
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setAnswers({ ...answers, [questions[currentQuestion].id]: currentAnswer })
      setCurrentQuestion(currentQuestion - 1)
      setCurrentAnswer(answers[questions[currentQuestion - 1]?.id] || "")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 py-12">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">Hello, Dr. {doctorName}!</h2>
          <Progress value={progress} className="h-2 bg-pink-100" />
          <p className="text-right text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-pink-200 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Star className="h-8 w-8 text-pink-500 flex-shrink-0 mt-1" />
                    <h2 className="text-2xl font-semibold text-gray-800">{questions[currentQuestion].question}</h2>
                  </div>

                  {questions[currentQuestion].type === "textarea" ? (
                    <Textarea
                      placeholder={questions[currentQuestion].placeholder}
                      className="min-h-[150px] border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                    />
                  ) : (
                    <Input
                      placeholder={questions[currentQuestion].placeholder}
                      className="border-pink-200 focus:border-pink-400 focus:ring-pink-400"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                    />
                  )}

                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="border-pink-300 text-pink-700 hover:bg-pink-50"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>

                    <Button
                      onClick={handleNext}
                      disabled={!currentAnswer.trim()}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

