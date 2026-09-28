interface QuestionProps {
  currentQuestion: { question: string; answers: string[]; correctAnswer: number };
  onAnswer: (index: number) => void;
  currentQuestionIndex: number;
}

const Question = ({currentQuestion, currentQuestionIndex, onAnswer }: QuestionProps) => {

  return (
    <>
      <h2 id="question">{currentQuestionIndex + 1}. {currentQuestion.question}</h2>
      <ol id="answers">
        {currentQuestion.answers.map((answer, index) => (
          <li key={'answer-' + index}>
            <button onClick={() => onAnswer(index)}>{answer}</button>
          </li>
        ))}
      </ol>
    </>
  );
}

export default Question;