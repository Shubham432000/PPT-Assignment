const quizQuestions = [
  {
    question: "2 + 2",
    options: ["5", "8", "4", "9"],
    answer: "4",
  },
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Rome"],
    answer: "Paris",
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Lion"],
    answer: "Blue Whale",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Saturn"],
    answer: "Mars",
  },
];

// Global variables
let currentQuestionIndex = 0;
let userScore = 0;
let userAnswers = [];

// Elements
const questionElem = document.getElementById("question");
const optionsElem = document.getElementById("options");
const submitBtn = document.getElementById("submit-btn");
const leaderboardContainer = document.querySelector(".leaderboard-container");
const leaderboardList = document.getElementById("leaderboard-list");

// Function to start the quiz
function startQuiz() {
  showQuestion();
  submitBtn.addEventListener("click", checkAnswer);
}

// Function to display the current question and options
function showQuestion() {
  if (currentQuestionIndex < quizQuestions.length) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElem.textContent = currentQuestion.question;
    optionsElem.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => selectAnswer(index));
      optionsElem.appendChild(li);
    });
  } else {
    endQuiz();
  }
}

// Function to handle user's answer selection
function selectAnswer(selectedIndex) {
  // Clear any previous selection
  const selectedOption = optionsElem.querySelector(".selected");
  if (selectedOption) {
    selectedOption.classList.remove("selected");
  }

  // Mark the current selection
  const currentOption = optionsElem.children[selectedIndex];
  currentOption.classList.add("selected");
}

// Function to check the user's answers and display the leaderboard
function checkAnswer() {
  const selectedOption = optionsElem.querySelector(".selected");
  if (!selectedOption) {
    alert("Please select an answer before submitting.");
    return;
  }

  const selectedIndex = Array.from(optionsElem.children).indexOf(
    selectedOption
  );
  userAnswers.push(selectedIndex);

  // Display immediate feedback to the user
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const selectedAnswer = currentQuestion.options[selectedIndex];
  alert(selectedAnswer === currentQuestion.answer ? "Correct!" : "Wrong!");

  currentQuestionIndex++;
  showQuestion();
}

// Function to end the quiz and display the leaderboard
function endQuiz() {
  // Hide quiz container and show leaderboard
  document.querySelector(".quiz-container").style.display = "none";
  leaderboardContainer.style.display = "block";

  // Calculate user's score
  userAnswers.forEach((selectedOptionIndex, questionIndex) => {
    const currentQuestion = quizQuestions[questionIndex];
    if (
      currentQuestion.options[selectedOptionIndex] === currentQuestion.answer
    ) {
      userScore++;
    }
  });

  // Display user's score in the leaderboard
  const li = document.createElement("li");
  li.textContent = `Correct: ${userScore}, Incorrect: ${
    quizQuestions.length - userScore
  }`;
  leaderboardList.appendChild(li);
}

// Start the quiz
startQuiz();
