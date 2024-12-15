import React, { useState, useEffect } from "react";

const App = () => {
  const [currentView, setCurrentView] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = async () => {
    try {
      const response = await fetch("/quiz");
      const data = await response.json();
      setQuestions(data);
      setCurrentQuestionIndex(0);
      setScore(0);
      setCurrentView("quiz");
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const submitAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore((prev) => prev + 4);
    } else {
      setScore((prev) => prev - 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setCurrentView("result");
    }
  };

  const restartQuiz = () => {
    setCurrentView("start");
  };

  const showCreateQuiz = () => {
    setCurrentView("create");
  };

  if (currentView === "start") {
    return (
      <div>
        <h1>Welcome to the Quiz App</h1>
        <button onClick={startQuiz}>Start Quiz</button>
        <button onClick={showCreateQuiz}>Create Quiz</button>
      </div>
    );
  }

  if (currentView === "quiz") {
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div>
        <div style={{ position: "fixed", top: 10, right: 10, fontSize: 18, fontWeight: "bold" }}>
          Score: {score}
        </div>
        <div>
          <h3>Q{currentQuestionIndex + 1}: {currentQuestion.question}</h3>
          {currentQuestion.options.map((option, index) => (
            <div key={index}>
              <button onClick={() => submitAnswer(option[0])}>{option}</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentView === "result") {
    return (
      <div>
        <h3>Quiz Completed!</h3>
        <p>Total Questions: {questions.length}</p>
        <p>Final Score: {score}</p>
        <button onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  if (currentView === "create") {
    return <CreateQuiz onSave={() => setCurrentView("start")} />;
  }

  return null;
};

const CreateQuiz = ({ onSave }) => {
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { question: "", options: ["", "", "", ""], answer: "" }]);
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? { ...q, options: q.options.map((opt, oi) => (oi === oIndex ? value : opt)) }
          : q
      )
    );
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/save-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questions }),
      });
      if (!response.ok) {
        throw new Error("Failed to save quiz");
      }
      alert("Quiz successfully saved!");
      onSave();
    } catch (error) {
      console.error("Failed to save quiz:", error);
    }
  };

  return (
    <div>
      <h3>Create a Quiz</h3>
      {questions.map((q, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
          />
          {q.options.map((opt, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${String.fromCharCode(65 + i)}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, i, e.target.value)}
            />
          ))}
          <input
            type="text"
            placeholder="Correct answer (A/B/C/D)"
            value={q.answer}
            onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSave}>Save Quiz</button>
    </div>
  );
};

export default App;
