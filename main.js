const QuizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Who is the CEO of Tesla?",
        options: ["Elon Musk", "Jeff Bezos", "Bill Gates", "Mark Zuckerberg"],
        answer: "Elon Musk"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Jupiter"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Dollar", "Yen", "Euro", "Pound"],
        answer: "Yen"
    }
];

const questionNumberEl = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionEl = document.querySelectorAll(".option");
const timerEl = document.getElementById("timer");
const prevButton = document.getElementById('prev-btn');
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const correctAnswersEl = document.getElementById("correct-answers");
const answersListEl = document.getElementById("answers-list");
const restartBtn = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;
let timeleft = 10;
let timer;
let answerSelected = false;

function loadQuestion() {
    const { question, options } = QuizData[currentQuestion];
    questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${QuizData.length}`;
    questionEl.textContent = question;
    optionEl.forEach((option, index) => {
        option.textContent = options[index];
        option.classList.remove("correct", "incorrect");
        option.onclick = () => selectOption(option);
    });
    resetTimer();
    updateNavButtons();
}

function resetTimer() {
    clearInterval(timer);
    timeleft = 10;
    timerEl.textContent = `Time Left: ${timeleft}s`;
    timer = setInterval(() => {
        timeleft--;
        timerEl.textContent = `Time Left: ${timeleft}s`;
        if (timeleft <= 0) {
            clearInterval(timer);
            nextBtn.disabled = false;
            answerSelected = true;
        }
    }, 1000);
}

function selectOption(option) {
    if (answerSelected) return;
    answerSelected = true;
    clearInterval(timer);
    const selectedAnswer = option.textContent;
    const correctAnswer = QuizData[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
        option.classList.add("correct");
        score++;
    } else {
        option.classList.add("incorrect");
    }
    nextBtn.disabled = false;
}

function updateNavButtons() {
    prevButton.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === QuizData.length - 1 && answerSelected ? false : !answerSelected;
    if (currentQuestion === QuizData.length - 1) {
        nextBtn.textContent = "Show Results";
    } else {
        nextBtn.textContent = "Next";
    }
}

nextBtn.addEventListener("click", () => {
    if (currentQuestion < QuizData.length - 1) {
        currentQuestion++;
        loadQuestion();
        answerSelected = false;
    } else if (currentQuestion === QuizData.length - 1 && answerSelected) {
        showResult();
    }
});

prevButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        answerSelected = false;
    }
});

function showResult() {
    clearInterval(timer);
    resultEl.classList.remove("hide");
    const quizEl = document.getElementById("quiz");
    quizEl.classList.add("hide");
    scoreEl.textContent = `${score} out of ${QuizData.length}`;
    
    correctAnswersEl.classList.remove("hide");
    answersListEl.innerHTML = '';
    QuizData.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${item.question} - Correct Answer: ${item.answer}`;
        answersListEl.appendChild(listItem);
    });
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultEl.classList.add("hide");
    correctAnswersEl.classList.add("hide");
    document.getElementById("quiz").classList.remove("hide");
    loadQuestion();
});

loadQuestion();
