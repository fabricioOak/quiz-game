import { questions, availableLanguages } from "./questions/index.js";
import { translations } from "./locale/index.js";
import createLocalizationHelper from "./locale/localizationHelper.js";

// Variables
let currentQuestion = 0;
let score = 0;
let randomQuestions = randomizeQuestions(questions);
let selectedLanguage;
const locationHelper = createLocalizationHelper(translations);

// DOM Elements
const languageSelector = document.getElementById("language-selector");
const quizContainer = document.getElementById("quiz-container");
const scoreElement = document.getElementById("score");

// Game Functions
function displayLanguageSelector() {
	availableLanguages.forEach((language) => {
		const option = document.createElement("button");
		option.value = language;
		option.textContent = language.toUpperCase();
		option.classList.add("default-button");
		languageSelector.appendChild(option);

		option.onclick = () => {
			locationHelper.setLanguage(language);
			questions[language].forEach((question) => {
				question.choices = question.choices.map((choice) =>
					choice.toUpperCase()
				);
			});
			randomQuestions = randomizeQuestions(questions[language]);
			toggleQuizContainer();
		};
	});
}

function randomizeQuestions(questions) {
	let currentIndex = questions.length,
		randomIndex;

	while (currentIndex > 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[questions[currentIndex], questions[randomIndex]] = [
			questions[randomIndex],
			questions[currentIndex],
		];
	}

	return questions;
}

function toggleQuizContainer() {
	languageSelector.style.display = "none";
	quizContainer.style.display = "block";

	displayQuestion();
}

function displayQuestion() {
	if (currentQuestion >= randomQuestions.length) {
		alert(`
    ${locationHelper.localize("finished-quiz")}
    ${locationHelper.localize("you-scored")} ${score}
    ${locationHelper.localize("out-of")} ${randomQuestions.length}
		`);
		restartQuiz();
		return; // Exit the function to prevent further execution
	}

	const questionElement = document.getElementById("question");
	const optionsContainer = document.getElementById("options-container");

	scoreElement.innerText = `${locationHelper.localize("score")}: ${score}`;
	questionElement.innerText = randomQuestions[currentQuestion].question;
	optionsContainer.innerHTML = "";

	randomQuestions[currentQuestion].choices.forEach((choice, index) => {
		const button = document.createElement("button");
		button.textContent = choice;
		button.className = "option-button";
		button.onclick = () => checkAnswer(index);
		optionsContainer.appendChild(button);
	});
}

function checkAnswer(userAnswer) {
	const correntAnswer = randomQuestions[currentQuestion].correctAnswer;
	const correctAnswerText =
		randomQuestions[currentQuestion].choices[correntAnswer];

	if (userAnswer === correntAnswer) {
		alert(`${locationHelper.localize("correct")}`);
		score++;
		scoreElement.innerText += score;
	} else {
		alert(
			`${locationHelper.localize("wrong")} ${locationHelper.localize(
				"correct-response"
			)} ${correctAnswerText}\n${locationHelper.localize(
				"you-scored"
			)} ${score}`
		);
		restartQuiz();
	}

	currentQuestion++;
	displayQuestion();
}

function restartQuiz() {
	currentQuestion = 0;
	score = 0;
	randomQuestions = randomizeQuestions(questions);
	languageSelector.style.display = "block";
	quizContainer.style.display = "none";
}

displayLanguageSelector();
