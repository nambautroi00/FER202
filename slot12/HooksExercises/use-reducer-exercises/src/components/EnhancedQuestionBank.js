import React, { useReducer, useEffect, useState } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: "",
  isCorrect: null,
  timeLeft: 10,
  highScore: 0
};

function enhancedQuizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "NEXT_QUESTION":
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showScore: state.currentQuestion + 1 === state.questions.length,
        feedback: "",
        isCorrect: null,
        timeLeft: 10
      };

    case "SHOW_FEEDBACK":
      const correct = state.selectedOption === state.questions[state.currentQuestion].answer;
      const correctAnswer = state.questions[state.currentQuestion].answer;
      return {
        ...state,
        isCorrect: correct,
        feedback: correct 
          ? "Correct! 🎉" 
          : `Incorrect! The correct answer is ${correctAnswer}`
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: state.highScore
      };

    case "UPDATE_TIMER":
      return {
        ...state,
        timeLeft: action.timeLeft
      };

    case "SET_HIGH_SCORE":
      return {
        ...state,
        highScore: action.highScore
      };

    default:
      return state;
  }
}

function EnhancedQuestionBank() {
  const [state, dispatch] = useReducer(enhancedQuizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, feedback, isCorrect, timeLeft, highScore } = state;
  const [timer, setTimer] = useState(null);

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
      dispatch({ type: "SET_HIGH_SCORE", highScore: parseInt(savedHighScore) });
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (!showScore && timeLeft > 0) {
      const timerId = setTimeout(() => {
        const newTimeLeft = timeLeft - 1;
        dispatch({ type: "UPDATE_TIMER", timeLeft: newTimeLeft });
        
        if (newTimeLeft === 0) {
          // Time's up - show feedback and move to next question
          dispatch({ type: "SHOW_FEEDBACK" });
          setTimeout(() => {
            dispatch({ type: "NEXT_QUESTION" });
          }, 2000);
        }
      }, 1000);
      
      setTimer(timerId);
    } else {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, showScore]);

  // Save high score when quiz ends
  useEffect(() => {
    if (showScore) {
      if (score > highScore) {
        const newHighScore = score;
        dispatch({ type: "SET_HIGH_SCORE", highScore: newHighScore });
        localStorage.setItem('quizHighScore', newHighScore.toString());
      }
    }
  }, [showScore, score, highScore]);

  const handleOptionSelect = (option) => {
    if (!selectedOption && !feedback) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption && !feedback) {
      dispatch({ type: "SHOW_FEEDBACK" });
      setTimeout(() => {
        dispatch({ type: "NEXT_QUESTION" });
      }, 2000);
    }
  };

  const handleRestartQuiz = () => {
    if (timer) {
      clearTimeout(timer);
    }
    dispatch({ type: "RESTART_QUIZ" });
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isTimeWarning = timeLeft <= 5;

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <h2>Quiz Completed!</h2>
            <h3 className="mb-3">
              Your Score: {score} / {questions.length}
            </h3>
            {score === questions.length && (
              <Alert variant="success" className="mb-3">
                <FaCheckCircle className="me-2" />
                Perfect Score! 🎉
              </Alert>
            )}
            {highScore > 0 && (
              <div className="mb-3">
                <h5>High Score: {highScore} / {questions.length}</h5>
              </div>
            )}
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Progress: {currentQuestion + 1} / {questions.length}</span>
                <div className="d-flex align-items-center">
                  <FaClock className="me-2" />
                  <span className={isTimeWarning ? "text-danger fw-bold" : ""}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
              <ProgressBar 
                now={progress} 
                label={`${Math.round(progress)}%`}
                variant={isTimeWarning ? "danger" : "primary"}
              />
            </div>

            {/* Question */}
            <h4 className="mb-4">
              Question {questions[currentQuestion].id}:<br />
              {questions[currentQuestion].question}
            </h4>

            {/* Feedback */}
            {feedback && (
              <Alert variant={isCorrect ? "success" : "danger"} className="mb-3">
                {isCorrect ? (
                  <>
                    <FaCheckCircle className="me-2" />
                    {feedback}
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="me-2" />
                    {feedback}
                  </>
                )}
              </Alert>
            )}

            {/* Options */}
            <div className="mb-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option 
                      ? (isCorrect === true ? "success" : isCorrect === false ? "danger" : "primary")
                      : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                  disabled={!!feedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="primary"
              className="mt-3"
              disabled={!selectedOption || !!feedback}
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default EnhancedQuestionBank;
