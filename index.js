const questions = [
    {
        question: "Which is the larget animal in the world?",
        answers: [
            
            {text: "Shark" , correct: false},
            {text: "Blue whale" , correct: true},
            {text: "Elephant" , correct: false},
            {text: "Giraffe" , correct: false}
        ]
    },

    {
        question: "What is the capital of France?",
        answers: [
            
            {text: "Barlin" , correct: false},
            {text: "Madrid" , correct: false},
            {text: "Paris" , correct: true},
            {text: "Rome" , correct: false}
        ]
    },

    {
        question: "Which planet is know as Red Planet?",
        answers: [
            
            {text: "Earth" , correct: false},
            {text: "Venus" , correct: false},
            {text: "Jupitar" , correct: false},
            {text: "Mars" , correct: true}
        ]
    },

    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
            
            {text: "Charles Dickens" , correct: false},
            {text: "William Shakesopeare" , correct: true},
            {text: "Jane Austen" , correct: false},
            {text: "Mark Twain" , correct: false}
        ]
    },

    {
        question: "What is the main ingredient in sushi?",
        answers: [
            
            {text: "Chicken" , correct: false},
            {text: "Beef" , correct: false},
            {text: "Rice" , correct: true},
            {text: "Tofu" , correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuize(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display= "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You have scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuize();
    }
})


startQuize();