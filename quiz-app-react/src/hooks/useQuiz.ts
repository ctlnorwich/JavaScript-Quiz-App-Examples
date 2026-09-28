import { useMemo, useState } from 'react'

type Question = {
  question: string, 
  answers: string[],
  correctAnswer: number
}

const useQuiz = () => {
  // This doesn't change
  const messageFirst: string = "First question..."

  // State
  const [questionBank, setQuestionBank] = useState<Question[]>([])
  const [score, setScore] = useState<number>(0)
  const [name, setName] = useState<string>("")
  const [nameEntered, setNameEntered] = useState<boolean>(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [resultMessage, setResultMessage] = useState<string>(messageFirst)
  const [inProgress, setInProgress] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  // Set current question via index
  const currentQuestion: Question = questionBank[currentQuestionIndex]

  // Fetch Questions with a try catch statement - could use useEffect for this too.
  useMemo(() => {
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
