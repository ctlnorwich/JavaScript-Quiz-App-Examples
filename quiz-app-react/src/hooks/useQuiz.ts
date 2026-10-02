import { useEffect, useState } from 'react'

type Question = {
  question: string, 
  answers: string[],
  correctAnswer: number
}

const useQuiz = () => {
  // This string doesn't change
  const messageFirst: string = "First question..."

  // Set up state. Rely on implicit types for state based on default values except the questionBank array, since we have a type for the question object defined above.
  const [questionBank, setQuestionBank] = useState<Question[]>([])
  const [score, setScore] = useState(0)
  const [name, setName] = useState("")
  const [nameEntered, setNameEntered] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [resultMessage, setResultMessage] = useState(messageFirst)
  const [inProgress, setInProgress] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Set current question via index
  const currentQuestion: Question = questionBank[currentQuestionIndex]

  // Fetch Questions with a try catch statement - could use useMemo for this too.
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('http://localhost:3000/questions')

        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`)
        }
        const data: Question[] = await res.json()
        setQuestionBank(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const checkAnswer = (index: number) => {
    const isCorrect = currentQuestion.correctAnswer === index

    if (isCorrect) setScore(s => s + 1)

    setResultMessage(isCorrect
      ? `Yes, that's correct, ${name}!`
      : `Sorry, that's incorrect, ${name}!`
    )

    if (currentQuestionIndex < questionBank.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setInProgress(false)
    }
  }

  const resetQuiz = () => {
    setInProgress(true)
    setScore(0)
    setCurrentQuestionIndex(0)
    setResultMessage(messageFirst)
    setNameEntered(false)
  }

  return {
    score,
    name,
    setName,
    nameEntered,
    setNameEntered,
    currentQuestion,
    currentQuestionIndex,
    resultMessage,
    inProgress,
    loading,
    totalQuestions: questionBank.length,
    checkAnswer,
    resetQuiz,
    error
  }
}

export default useQuiz
