let currentQuestion = 0;
let rightAnsweredQuestions = 0;
let AUDIO_SUCCESS = new Audio("audio/success.mp3");
let AUDIO_FAIL = new Audio("audio/fail.mp3");
let questions = [];

function init() {
  document.getElementById("startSceen").style = "";
  document.getElementById("question_body").style = "display: none;";
  document.getElementById("endScreen").style = "display: none;";
}

function selectQuestionType(index) {
  if (index == 1) {
    questions = questions_html;
    createStartText(index);
    createEndText(index);
  } else if (index == 2) {
    questions = questions_css;
    createStartText(index);
    createEndText(index);
  } else {
    questions = questions_js;
    createStartText(index);
    createEndText(index);
  }
  document.getElementById("startButton").disabled = false;
}

function createStartText(index) {
  let startText = document.getElementById("startQuestionText");
  if (index == 1) {
    startText.innerHTML = `<h2>WELCOME to <br> The Answer HTML Quiz</h2>
    <span class="readyText">
        Ready for the Challenge?
    </span>`;
  } else if (index == 2) {
    startText.innerHTML = `<h2>WELCOME to <br> The Answer CSS Quiz</h2>
    <span class="readyText">
        Ready for the Challenge?
    </span>`;
  } else {
    startText.innerHTML = `<h2>WELCOME to <br> The Answer JS Quiz</h2>
    <span class="readyText">
        Ready for the Challenge?
    </span>`;
  }
}

function createEndText(index) {
  let endText = document.getElementById("winnText");
  if (index == 1) {
    endText.innerHTML = `<h2>COMPLETE HTML QUIZ</h2>`;
  } else if (index == 2) {
    endText.innerHTML = `<h2>COMPLETE CSS QUIZ</h2>`;
  } else {
    endText.innerHTML = `<h2>COMPLETE JS QUIZ</h2>`;
  }
}

function startGame() {
  document.getElementById("startSceen").style = "display: none;";
  document.getElementById("question_body").style = "";
  document.getElementById("endScreen").style = "display: none;";
  createReplayButton();
  initQuestions();
  disableQuestionType();
}

function createReplayButton() {
  document.getElementById("sideMenu").innerHTML = `
    <a id="HTMLQuestions" onclick="selectQuestionType(1)">HTML</a>
    <a id="CSSQuestions" onclick="selectQuestionType(2)">CSS</a>
    <a id="JSQuestions" onclick="selectQuestionType(3)">JS</a>
    <a onclick="restartGame()">Replay</a>`;
}

function initQuestions() {
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

function disableQuestionType() {
  document.getElementById("HTMLQuestions").classList.add("stopClickFunction");
  document.getElementById("CSSQuestions").classList.add("stopClickFunction");
  document.getElementById("JSQuestions").classList.add("stopClickFunction");
}

function aktivateQuestionType() {
  document
    .getElementById("HTMLQuestions")
    .classList.remove("stopClickFunction");
  document.getElementById("CSSQuestions").classList.remove("stopClickFunction");
  document.getElementById("JSQuestions").classList.remove("stopClickFunction");
}

function restartGame() {
  currentQuestion = 0;
  rightAnsweredQuestions = 0;
  document.getElementById("endScreen").style = "display: none;";
  document.getElementById("question_body").style = "display: none;";
  document.getElementById("startSceen").style = "";
  document.getElementById("startButton").disabled = true;
  initQuestions();
  aktivateQuestionType();
}

let questions_html = [
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

let questions_css = [
  {
    question: "Breite relativ zum Elternelement?",
    answer_1: "rem",
    answer_2: "em",
    answer_3: "px",
    answer_4: "vw",
    right_answer: 2,
  },
  {
    question: "Selektion von &#60;p&#62 mit Klasse 'beispiel'?",
    answer_1: ".beispiel p",
    answer_2: "p .beispiel",
    answer_3: "p.beispiel",
    answer_4: "#beispiel p",
    right_answer: 3,
  },
  {
    question: "Bedeutung von CSS?",
    answer_1: "Cascading Style Sheets",
    answer_2: "Creative Style Sheets",
    answer_3: "Computer Style Sheets",
    answer_4: "Colorful Style Sheets",
    right_answer: 1,
  },
  {
    question: "Abstand zwischen Inhalten und Rand?",
    answer_1: "margin",
    answer_2: "padding",
    answer_3: "border",
    answer_4: "spacing",
    right_answer: 2,
  },
  {
    question: "Text in Großbuchstaben?",
    answer_1: "uppercase",
    answer_2: "capitalize",
    answer_3: "lowercase",
    answer_4: "text-transform",
    right_answer: 4,
  },
];

let questions_js = [
  {
    question: "Bedeutung von JS?",
    answer_1: "Java Styled Markup",
    answer_2: "Just Stylish Modules",
    answer_3: "JavaScript",
    answer_4: "Joint Syntax Markup",
    right_answer: 3,
  },
  {
    question: "Datentyp für ganze Zahlen in JavaScript?",
    answer_1: "float",
    answer_2: "integer",
    answer_3: "number",
    answer_4: "char",
    right_answer: 3,
  },
  {
    question: "Wie deklariert man eine Variable in JavaScript?",
    answer_1: "var",
    answer_2: "let",
    answer_3: "const",
    answer_4: "var, let, und const",
    right_answer: 4,
  },
  {
    question: "Wie erstellt man eine Funktion in JavaScript?",
    answer_1: "function: myFunction()",
    answer_2: "create function myFunction()",
    answer_3: "def myFunction():",
    answer_4: "function myFunction() {}",
    right_answer: 4,
  },
  {
    question: "Was bedeutet 'DOM' in Bezug auf JavaScript?",
    answer_1: "Document Object Model",
    answer_2: "Data Object Model",
    answer_3: "Dynamic Output Mapping",
    answer_4: "Document Oriented Middleware",
    right_answer: 1,
  },
];
