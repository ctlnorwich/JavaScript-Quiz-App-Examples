import Question from './components/Question'
import useQuiz from './hooks/useQuiz'

function App() {
  // The application logic has been added to a useQuiz custom hook, but it could also just be put at the top of this App component.

  const quiz = useQuiz()

  // If loading or if error, return appropriate html message.
  if (quiz.loading) return <p>Loading questions...</p>
  if (quiz.error) return <p>Failed to load questions.</p>

  // Else return quiz:
  return (
    <>
      <h1>React Quiz</h1>

      {!quiz.nameEntered && (
        <div className="name-form">
          <label htmlFor="name">What's your name?</label>
          <input type="text" id="name" value={quiz.name} onChange={(e) => quiz.setName(e.target.value)} />
          <button id="name-button" onClick={() => quiz.setNameEntered(true)}>Submit Name</button>
        </div>
      )}

      {quiz.nameEntered && (
        <>
          <p id="welcome-text">Let's go, {quiz.name}!</p>

          <article id="question-holder">

            <p>Score: <strong className="score">{quiz.score}</strong></p>
            <div className="result-message">{quiz.resultMessage}</div>

            {quiz.inProgress
              ?
              <Question
                currentQuestion={quiz.currentQuestion}
                onAnswer={quiz.checkAnswer}
                currentQuestionIndex={quiz.currentQuestionIndex}
              />
              :
              <h2>That's the end of the quiz! You scored {quiz.score}/{quiz.totalQuestions}!</h2>
            }

          </article>
        </>
      )}

      {quiz.nameEntered && (
        <button id="reset-button" onClick={quiz.resetQuiz}>Reset Quiz</button>
      )}
    </>
  )
}

export default App