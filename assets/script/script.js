var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');
var headerEl = document.querySelector('header');
var introEl = document.getElementById('intro');
var questionsContainerEl = document.getElementById('question-cards');
var questionEL = document.getElementById('question');
var choiceButtonsEl = document.getElementById('choice-buttons');
var resultEl = document.getElementById('result');
var scoreEl = document.getElementById('score');
var scoreFormEl = document.getElementById('score-form');
var initialsEl = document.getElementById('initials');
var submitBtnEl = document.getElementById('submit');
var scoreContainerEl = document.getElementById('scores');
var scoreListEl = document.getElementById("score-list");
var backBtnEl = document.getElementById('back-btn');
var clearBtnEl = document.getElementById('clear-btn');
var noScoreEl = document.getElementById('no-score');

var score = 0;
let availableQuestions = [];
var currentQuestionIndex = 0; 
var currentQuestionCard = {};
var timeLeft = 60;

// function launches the quiz
function startQuiz() {
    introEl.setAttribute("class", "hide");
    questionsContainerEl.removeAttribute("class", "hide");
    availableQuestions =  quiz;
    getNewQuestion();

}


// function serves next question
function getNewQuestion() {

    // set the text for the current question
    currentQuestionCard = availableQuestions[currentQuestionIndex];
    questionEL.innerText = currentQuestionCard.q;

    // create buttons from the choices
    for  (i=0; i<currentQuestionCard.choices.length; i++) {
        const button = document.createElement('button');
        button.innerText = currentQuestionCard.choices[i];
        button.setAttribute("class", "btn");
        button.addEventListener('click', function(){
            checkAnswer(event);
            resetQuestions();
        });
        
        choiceButtonsEl.appendChild(button);


    }
}

// function that resets the buttons for the next set of choices
function resetQuestions() {
    currentQuestionIndex++;
    if (currentQuestionIndex < availableQuestions.length) {
        
        while (choiceButtonsEl.firstChild){
            choiceButtonsEl.removeChild(choiceButtonsEl.firstChild);
        }    

        getNewQuestion();  
    }
    else {
        getScore();
        showScore(score);
        clearInterval(timeInterval);
    }
}


// function to check if selected choice is the answer
function checkAnswer(event) {
    
    var selectedEl = event.target;
    var selected = selectedEl.innerText;

    
    if (resultEl.firstChild !== null) {
        resultEl.removeChild(resultEl.firstChild);
    }

    if (selected === currentQuestionCard.a) {
        const msgEl = document.createElement('h4');
        msgEl.innerText = "Correct!";
        resultEl.appendChild(msgEl);
    }
    else {
        const msgEl = document.createElement('h4');
        msgEl.innerText = "Wrong!";
        resultEl.appendChild(msgEl);
        timeLeft -= 15;
    }

}

function getScore() {

    if (timeLeft < 0) {
        timeLeft = 0;
    }
    console.log(timeLeft);
    return score = timeLeft;
    
}

// end of quiz, display form for score keeping
function showScore(s) {

    
    scoreFormEl.removeAttribute("class", "hide");
    questionsContainerEl.setAttribute("class", "hide");
    headerEl.setAttribute("class", "hide");
    scoreEl.textContent = s + ".";
}

// function processScore() {
    
//     getScore();
//     showScore(score);
//     debugger;
//     submitBtnEl.addEventListener('click', function() {
//         saveScore(score);
//     });
// }



function saveScore(s) {
    
    scoreContainerEl.removeAttribute("class", "hide");
    scoreFormEl.setAttribute("class", "hide");

    var scoreLineEl = document.createElement('li');
    scoreLineEl.innerText = initialsEl.value + " - " + s;
    scoreListEl.appendChild(scoreLineEl);
}

function resetQuiz() {

    timeLeft = 60;
    currentQuestionIndex = 0;

    scoreContainerEl.setAttribute("class", "hide");
    timerEl.textContent =  "Time: " + timeLeft;
    headerEl.removeAttribute("class", "hide");
    introEl.removeAttribute("class", "hide");
    noScoreEl.setAttribute("class", "hide");

    while (choiceButtonsEl.firstChild){
        choiceButtonsEl.removeChild(choiceButtonsEl.firstChild);
    }
    
}

function clearScore() {

    while (scoreListEl.firstChild){
        scoreListEl.removeChild(scoreListEl.firstChild);
    }
    console.log(scoreListEl.firstChild);
    noScoreEl.removeAttribute("class", "hide");
    
}


// question cards' information
const quiz = [
    {
        q: "Commonly used datatypes DO NOT include:",
        choices: ['1. string', '2. boolean', '3. alerts', '4. numbers'],
        a: "3. alerts"
    },
    {
        q: "The condition in an if/else statement is enclosed with ____.",
        choices: ['1. quotes', '2. curly braces', '3. parenthesis', '4. square brackets'],
        a: "3. parenthesis"
    },
    {
        q: "Arrays in javascript can be used to store ____.",
        choices: ['1. numbers an strings', '2. booleans', '3. other arrays', '4. all of the above'],
        a: "4. all of the above"
    },
    {
        q: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
        a: "4. console.log"
    }
];

// Timer that counts down from 75
function countdown() {
  
   timeInterval = setInterval(function() {
    
    timerEl.textContent =  "Time: " + timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timeInterval);

    }
  }, 1000);
 
}




// runs countdown once quiz is started
startBtn.onclick = countdown;
startBtn.addEventListener('click', startQuiz);
backBtnEl.addEventListener('click', resetQuiz);
clearBtnEl.addEventListener('click', clearScore);
submitBtnEl.addEventListener('click', function(){
    saveScore(score)
});
