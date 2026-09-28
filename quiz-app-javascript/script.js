const quiz = function () {
  // Register all the elements as variables
  const nameInput = document.getElementById("name");
  const nameButton = document.getElementById("name-button");
  const welcomeText = document.getElementById("welcome-text");
  const questionText = document.getElementById("question");
  const answerList = document.querySelector("#answers");
  const scoreText = document.querySelector(".score");
  const resultMessage = document.querySelector(".result-message");
  const resetButton = document.querySelector("#reset-button");

  // Set the name using an event listner function
  nameButton.addEventListener("click", function (event) {
    if (nameInput.value.trim() === "") {
      alert("Please enter your name!");
      return;
    }
    welcomeText.textContent = `Welcome ${nameInput.value}!`;
  });

  // Question bank is an array of objects - explore simple arrays first.
  const questionBank = [
    {
      question: "In what year was JavaScript created?",
      answers: ["1993", "1995", "2000"],
      correctAnswer: 1,
    },
    {
      question: "What is the orignial keyword for declaring a variable?",
      answers: ["var", "let", "const"],
      correctAnswer: 0,
    },
    {
      question: "What do you use to define an object?",
      answers: ["Square Brackets", "Parentheses", "Curly Braces"],
      correctAnswer: 2,
    },
  ];

  // Define state variables
  let currentScore = 0;
  let questionIndex = 0;
  let currentQuestion = null;

  // Add this to a function after testing a simpler example
  const setUpQuestion = function (questionIndex) {
    answerList.innerHTML = "";

    // Add this to check that there is a question!
    if (!questionBank[questionIndex]) {
      questionText.innerHTML = `You scored ${currentScore.toString()} out of ${questionBank.length.toString()}!`;
      return;
    }

    // Set the current question
    currentQuestion = questionBank[questionIndex];
    questionText.innerHTML = questionIndex + 1 + ". " + currentQuestion.question;

    // Set the answers
    for (const [index, answer] of currentQuestion.answers.entries()) {
      const answerListItem = document.createElement("li");
      const answerButton = document.createElement("button");
      answerButton.innerHTML = answer;
      answerButton.setAttribute("data-index", index);

      answerList.append(answerListItem);
      answerListItem.append(answerButton);
    }
  };

  // Add cevent listener to answer buttons
  answerList.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
      let answerButton = event.target;
      let answerIndex = Number(answerButton.getAttribute("data-index"));
      let result = answerIndex === currentQuestion.correctAnswer;

      // Go to next question, and...
      questionIndex++;

      if (result) {
        currentScore++;
        scoreText.textContent = currentScore.toString();
        resultMessage.innerHTML = `Well done ${nameInput.value}, that's correct!`;
      } else {
        resultMessage.innerHTML = `Sorry ${nameInput.value}, that's not correct.`;
      }

      setUpQuestion(questionIndex);
    }
  });

  // Reset everyting
  resetButton.addEventListener("click", function () {
    currentScore = 0;
    questionIndex = 0;
    scoreText.innerHTML = "0";
    resultMessage.innerHTML = "";
    setUpQuestion(questionIndex);
  });

  setUpQuestion(questionIndex);
};

quiz();
