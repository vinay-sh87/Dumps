import { useReducer } from "react";

const initialState = {
  currentQuestion: 0,
  score: 0,
  answers: [],
  showResult: false,
};

const questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    question: "What is 10 / 2?",
    options: ["3", "4", "5", "6"],
    correct: 2,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "selectAnswer": {
      const isCorrect = action.answerIndex === action.correctAnswer;
      return {
        ...state,
        answers: [...state.answers, action.answerIndex],
        score: isCorrect ? state.score + 1 : state.score,
      };
    }
    case "nextQuestion": {
      // Move to next question
      const nextQuestion = state.currentQuestion + 1;

      // If last question, show results
      if (nextQuestion >= questions.length) {
        return {
          ...state,
          showResult: true,
        };
      }

      return {
        ...state,
        currentQuestion: nextQuestion,
      };
    }
    case "restart":
      return initialState;

    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  {
    state.showResult && (
      <div>
        <h2>Quiz Complete</h2>
        <p>
          Your score : {state.score} / {questions.length}
        </p>
        <button onClick={() => dispatch({ type: "restart" })}>Restart</button>
      </div>
    );
  }
  const question = questions[state.currentQuestion];
  const hasAnswered = state.answers.length > state.currentQuestion;

  return (
    <>
      <h2>
        Question {state.currentQuestion + 1} / {questions.length}{" "}
      </h2>
      <p>{question.question}</p>
      <div>
        {questions.options.map((option, index) => {
          return (
            <button
              className="p-3"
              key={index}
              onClick={() =>
                dispatch({
                  type: "selectAnswer",
                  answerIndex: index,
                  correctAnswer: question.correct,
                })
              }
              disabled={hasAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>
      {hasAnswered && (
        <button onClick={() => dispatch({ type: "nextQuestion" })}>
          {state.currentQuestion === questions.length - 1
            ? "See Results"
            : "Next Question"}
        </button>
      )}
      <p>Current Score: {state.score}</p>
    </>
  );
}
