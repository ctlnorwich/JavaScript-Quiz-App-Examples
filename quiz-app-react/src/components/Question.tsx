type onAnswer = (index: number) => void;

type AnswerProps = {
  onButtonClick: onAnswer;
  answer: string;
  index: number;
}
type QuestionProps = {
  currentQuestion: { question: string; answers: string[]; correctAnswer: number };
  onAnswer: onAnswer;
  currentQuestionIndex: number;
}

const Answer = ({onButtonClick, answer, index}: AnswerProps) => {
  return (
     <li key={'answer-' + index}>
        <button onClick={() => onButtonClick(index)}>{answer}</button>
    </li>
  )
}

const Question = ({currentQuestion, currentQuestionIndex, onAnswer }: QuestionProps) => {

  return (
    <>
      <h2 id="question">{currentQuestionIndex + 1}. {currentQuestion.question}</h2>
      <ol id="answers">
        {currentQuestion.answers.map((answer, index) => (
         <Answer onButtonClick={onAnswer} answer={answer} index={index}/>
        ))}
      </ol>
    </>
  );
}

export default Question;