let questions = [
  {
    question: "Was bedeutet die Abkürzung 'HTML'?",
    answer_1: "Hyper Text Markup Language",
    answer_2: "High Tech Modern Language",
    answer_3: "Hyperlink and Text Markup Language",
    answer_4: "Home Tool Markup Language",
    right_answer: 1,
  },
  {
    question:
      "Welches HTML-Element wird verwendet, um einen Absatz zu definieren?",
    answer_1: "&#60;paragraph&#62",
    answer_2: "&#60;p&#62",
    answer_3: "&#60;para&#62",
    answer_4: "&#60;text&#62",
    right_answer: 2,
  },
  {
    question:
      "Welches HTML-Element wird verwendet, um eine geordnete Liste zu erstellen?",
    answer_1: "&#60;ol&#62",
    answer_2: "&#60;ul&#62",
    answer_3: "&#60;li&#62",
    answer_4: "&#60;list&#62",
    right_answer: 1,
  },
  {
    question: "Was bedeutet die Abkürzung 'CSS' in Bezug auf Webentwicklung?",
    answer_1: "Computer Style Sheets",
    answer_2: "Creative Style Sheets",
    answer_3: "Cascading Style Sheets",
    answer_4: "Colorful Style Sheets",
    right_answer: 3,
  },
  {
    question:
      "Welches HTML-Element wird verwendet, um einen Hyperlink zu erstellen?",
    answer_1: "&#60;link&#62",
    answer_2: "&#60;a&#62",
    answer_3: "&#60;hlink&#62",
    answer_4: "&#60;url&#62",
    right_answer: 2,
  },
  {
    question:
      "Was ist der Zweck des HTML-Elements &#60head&#62 in einer HTML-Seite?",
    answer_1: "Um den Hauptinhalt der Seite zu definieren",
    answer_2: "Um den Header der Seite zu definieren",
    answer_3: "Um den Fußbereich der Seite zu definieren",
    answer_4:
      "Um den Kopfbereich der Seite zu definieren, der Metadaten und Verweise auf externe Ressourcen enthält",
    right_answer: 4,
  },
  {
    question:
      "Welches HTML-Element wird verwendet, um eine Tabelle zu erstellen?",
    answer_1: "&#60;table&#62",
    answer_2: "&#60;tab&#62",
    answer_3: "&#60;tr&#62",
    answer_4: "&#60;tb&#62",
    right_answer: 1,
  },
];

let currentQuestion = 0;
let rightAnsweredQuestions = 0;
let AUDIO_SUCCESS = new Audio("audio/success.mp3");
let AUDIO_FAIL = new Audio("audio/fail.mp3");

function init() {
  document.getElementById("sumQuestions").innerHTML = questions.length;
  document.getElementById("finalsum").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (gameIsOver()) {
    showEndSceen();
  } else {
    updateToNextQuestion();
  }
}

function gameIsOver() {
  return currentQuestion >= questions.length;
}

function showEndSceen() {
  document.getElementById("endScreen").style = "";
  document.getElementById("question_body").style = "display: none;";
  document.getElementById("finalsumOfAnswers").innerHTML =
    rightAnsweredQuestions;
}

function updateToNextQuestion() {
  updateProgressBar();

  let question = questions[currentQuestion];
  document.getElementById("currentQuestion").innerHTML = question["question"];
  document.getElementById("currentPosition").innerHTML = currentQuestion + 1;
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function updateProgressBar() {
  let percent = (currentQuestion + 1) / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progress-bar").innerHTML = `${percent}%;`;
  document.getElementById("progress-bar").style = `width: ${percent}%;`;
}

function showAnswer(pickedAnswer) {
  let rightAnswer = questions[currentQuestion]["right_answer"];
  let numberOfPickedAnswer = pickedAnswer.slice(-1);
  let answerString = "answer_" + rightAnswer;

  if (rightAnswerSelected(numberOfPickedAnswer, rightAnswer)) {
    let myRightAnswer = document.getElementById(pickedAnswer);
    myRightAnswer.parentNode.classList.add("bg-success");
    rightAnsweredQuestions++;
    AUDIO_SUCCESS.play();
  } else {
    let myWrongAnswer = document.getElementById(answerString);
    myWrongAnswer.parentNode.classList.add("bg-success");
    document.getElementById(pickedAnswer).parentNode.classList.add("bg-danger");
    AUDIO_FAIL.play();
  }
  blockButtonsAfterAnswer();
}

function rightAnswerSelected(numberOfPickedAnswer, rightAnswer) {
  return numberOfPickedAnswer == rightAnswer;
}

function nextQuestion() {
  currentQuestion++;
  showQuestion();

  document.getElementById("nextButton").disabled = true;
  resetAnwerButton();
}

function blockButtonsAfterAnswer() {
  document.getElementById("answer_1").classList.add("stopClickFunction");
  document.getElementById("answer_2").classList.add("stopClickFunction");
  document.getElementById("answer_3").classList.add("stopClickFunction");
  document.getElementById("answer_4").classList.add("stopClickFunction");

  document.getElementById("nextButton").disabled = false;
}

function resetAnwerButton() {
  document.getElementById("answer_1").classList.remove("stopClickFunction");
  document.getElementById("answer_2").classList.remove("stopClickFunction");
  document.getElementById("answer_3").classList.remove("stopClickFunction");
  document.getElementById("answer_4").classList.remove("stopClickFunction");

  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
}

function restartGame() {
  currentQuestion = 0;
  rightAnsweredQuestions = 0;
  document.getElementById("endScreen").style = "display: none;";
  document.getElementById("question_body").style = "";
  init();
}
