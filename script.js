const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerEl = document.getElementById("quiestion-container");
const questionEl = document.getElementById("question");
const answerBtnEl = document.getElementById("answer-button");

let suffledQuestions, currentQuestionInsex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionInsex++;
    setNextQuestion();
})

function startGame() {
    startButton.classList.add("hide");
    suffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionInsex = 0;
    questionContainerEl.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(suffledQuestions[currentQuestionInsex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(ans => {
        const button = document.createElement('button');
        button.innerText = ans.text;
        button.classList.add('btn');
        if (ans.correct) {
            button.dataset.correct = ans.correct; // add a data attribute to the button correct = ans.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerBtnEl.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerBtnEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (suffledQuestions.length > currentQuestionInsex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

const questions = [
    {
        question:"What is 2+2?",
        answers: [
            {text: "4", correct: true},
            {text: "22", correct: false}
        ]
    },
    {
        question:"Which animal has two legs?",
        answers: [
            {text: "Pigs", correct: false},
            {text: "Ducks", correct: true},
            {text: "Dogs", correct: false},
            {text: "Cats", correct: false}
        ]
    },
    {
        question:"What color is the Banana?",
        answers: [
            {text: "Yellow", correct: true},
            {text: "Pink", correct: false},
            {text: "Rainbow", correct: false},
            {text: "Purple", correct: false}
        ]
    }
]