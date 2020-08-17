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
    hideElement(introEl);
    showElement(questionsContainerEl);
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

// turns time left into score
function getScore() {

    if (timeLeft < 0) {
        timeLeft = 0;
    }
    console.log(timeLeft);
    return score = timeLeft;
    
}

// end of quiz, display form for score keeping
function showScore(s) {

    
    showElement(scoreFormEl);
    hideElement(questionsContainerEl);
    hideElement(headerEl);
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

// score is added to score list
function saveScore(s) {
    
    showElement(scoreContainerEl);
    hideElement(scoreFormEl);

    var scoreLineEl = document.createElement('li');
    scoreLineEl.innerText = initialsEl.value + " - " + s;
    scoreListEl.appendChild(scoreLineEl);
    initialsEl.value = "";
}

// restarts quiz
function resetQuiz() {

    timeLeft = 60;
    currentQuestionIndex = 0;

    hideElement(scoreContainerEl);
    timerEl.textContent =  "Time: " + timeLeft;
    showElement(headerEl);
    showElement(introEl);
    hideElement(noScoreEl);

    while (choiceButtonsEl.firstChild){
        choiceButtonsEl.removeChild(choiceButtonsEl.firstChild);
    }
}

// clears score list
function clearScore() {

    while (scoreListEl.firstChild){
        scoreListEl.removeChild(scoreListEl.firstChild);
    }
    console.log(scoreListEl.firstChild);
    showElement(noScoreEl);
    
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

    // won't let the timer go under 0 and stops quiz
    if (timeLeft < 0) {
      
      score = 0;
      showScore(score);
      clearInterval(timeInterval);

    }
  }, 1000);
 
}

function showElement(element) {
    element.removeAttribute("class", "hide");
}

function hideElement(element) {
    element.setAttribute("class", "hide");
}

// runs countdown once quiz is started
startBtn.onclick = countdown;
startBtn.addEventListener('click', startQuiz);
backBtnEl.addEventListener('click', resetQuiz);
clearBtnEl.addEventListener('click', clearScore);
submitBtnEl.addEventListener('click', function(){
    saveScore(score)
});
