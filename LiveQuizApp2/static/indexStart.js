let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function startQuiz() {
  const response = await fetch("/quiz");
  questions = await response.json();
  currentQuestionIndex = 0;
  score = 0;
  document.querySelector(".quiz-container").innerHTML = `
    <div id="score-display" style="position: fixed; top: 10px; right: 10px; font-size: 18px; font-weight: bold;">
      Score: ${score}
    </div>
    <div id="question-container"></div>
  `;

  showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
  const question = questions[index];
  let questionHtml = `
    <div>
      <h3>Q${index + 1}: ${question.question}</h3>
  `;

  for (let i = 0; i < question.options.length; i++) {
    const option = question.options[i];
    questionHtml += `
      <label>
        <input type="radio" name="answer" value="${option[0]}" />
        ${option}
      </label><br />
    `;
  }

  questionHtml += `
    <button onclick="submitAnswer()">Submit Answer</button>
  </div>`;

  document.getElementById("question-container").innerHTML = questionHtml;
}

function submitAnswer() {
  const selectedOption = document.querySelector(`input[name="answer"]:checked`);

  if (!selectedOption) {
    alert("Please select an answer before submitting.");
    return;
  }

 
  const userAnswer = selectedOption.value;
  if (userAnswer === questions[currentQuestionIndex].answer) {
    score += 4;
  } else {
    score -= 1;
  }

 
  document.getElementById("score-display").textContent = `Score: ${score}`;

 
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    showQuizResults();
  }
}

function showQuizResults() {
  document.getElementById("question-container").innerHTML = `
    <h3>Quiz Completed!</h3>
    <p>Total Questions: ${questions.length}</p>
    <p>Final Score: ${score}</p>
    <button onclick="startQuiz()">Restart Quiz</button>
  `;
}

async function createQuiz() {
  document.querySelector(".quiz-container").innerHTML = `
    <h3>Create a Quiz</h3>
    <button onclick="manuallyAddQuestions()">Manually Add Questions</button>
    <button onclick="aiGenerateQuestions()">Generate Questions with AI</button>
    <div id="quiz-creation-container"></div>
  `;
}

function manuallyAddQuestions() {
  const container = document.getElementById("quiz-creation-container");
  container.innerHTML = `
    <h4>Manually Add Questions</h4>
    <form id="manual-quiz-form">
      <div class="question-block">
        <label>Question:</label><br />
        <input type="text" name="question" placeholder="Enter your question" required /><br />
        <label>Options:</label><br />
        <input type="text" name="option1" placeholder="Option A" required /><br />
        <input type="text" name="option2" placeholder="Option B" required /><br />
        <input type="text" name="option3" placeholder="Option C" required /><br />
        <input type="text" name="option4" placeholder="Option D" required /><br />
        <label>Correct Answer (A/B/C/D):</label><br />
        <input type="text" name="answer" placeholder="Correct option" required /><br />
      </div>
      <button type="button" onclick="addMoreQuestions()">Add More Questions</button>
      <button type="submit">Save Quiz</button>
    </form>
  `;

  const form = document.getElementById("manual-quiz-form");
  form.addEventListener("submit", saveQuiz);
}

function addMoreQuestions() {
  const form = document.getElementById("manual-quiz-form");
  const newQuestionBlock = document.createElement("div");
  newQuestionBlock.classList.add("question-block");
  newQuestionBlock.innerHTML = `
    <hr />
    <label>Question:</label><br />
    <input type="text" name="question" placeholder="Enter your question" required /><br />
    <label>Options:</label><br />
    <input type="text" name="option1" placeholder="Option A" required /><br />
    <input type="text" name="option2" placeholder="Option B" required /><br />
    <input type="text" name="option3" placeholder="Option C" required /><br />
    <input type="text" name="option4" placeholder="Option D" required /><br />
    <label>Correct Answer (A/B/C/D):</label><br />
    <input type="text" name="answer" placeholder="Correct option" required /><br />
  `;
  form.insertBefore(newQuestionBlock, form.lastChild.previousSibling);
}

function saveQuiz(event) {
  event.preventDefault();

  const form = event.target;
  const questions = [];
  const questionBlocks = form.querySelectorAll(".question-block");

  questionBlocks.forEach((block) => {
    const question = block.querySelector(`input[name="question"]`).value.trim();
    const options = [
      block.querySelector(`input[name="option1"]`).value.trim(),
      block.querySelector(`input[name="option2"]`).value.trim(),
      block.querySelector(`input[name="option3"]`).value.trim(),
      block.querySelector(`input[name="option4"]`).value.trim(),
    ];
    const answer = block.querySelector(`input[name="answer"]`).value.trim().toUpperCase();

    if (question && options.length === 4 && "ABCD".includes(answer)) {
      questions.push({ question, options, answer });
    }
  });

  console.log("Quiz Saved!", questions); // Replace this with a function to send data to the server
  alert("Quiz successfully saved!");
  document.querySelector(".quiz-container").innerHTML = `<button onclick="startQuiz()">Start Quiz</button>`;
}