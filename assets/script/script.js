var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');
var introEl = document.getElementById('intro');
var questionsContainerEl = document.getElementById('question-cards');
var questionEL = document.getElementById('question');
var choiceButtonsEl = document.getElementById('choice-buttons');
var resultEl = document.getElementById('result');
var scoreFormEl = document.getElementById('score-form');

var score = 0;
let availableQuestions = [];
var currentQuestionIndex = 0; 
var currentQuestionCard = {};

function startQuiz() {
    introEl.setAttribute("class", "hide");
    questionsContainerEl.removeAttribute("class", "hide");
    availableQuestions =  quiz;
    getNewQuestion();

}



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


function resetQuestions() {
    currentQuestionIndex++;
    if (currentQuestionIndex < availableQuestions.length) {
        
        while (choiceButtonsEl.firstChild){
            choiceButtonsEl.removeChild(choiceButtonsEl.firstChild);
        }
        
        getNewQuestion();
        
    }
    else {
        showScore();
    }


}



function checkAnswer(event) {
    
    var selectedEl = event.target;
    var selected = selectedEl.innerText;

    console.log(selected);
    
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
    }

}

function showScore() {

    questionsContainerEl.setAttribute("class", "hide");
    scoreFormEl.removeAttribute("class", "hide");
    console.log('no more');

}

function getScore() {

}



// question cards' information
const quiz = [
    {
        q: "Commonly used datatypes DO NOT include:",
        choices: ['1. string', '2. boolean', '3. alerts', '4. numbers'],
        a: "3. alerts"
    },
    {
        q: "The condition in an if/else statement is enclosed with ___",
        choices: ['1. quotes', '2. curly braces', '3. parenthesis', '4. square brackets'],
        a: "3. parenthesis"
    },
    {
        q: "Arrays in javascript can be used to store ____",
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
  var timeLeft = 75;

  var timeInterval = setInterval(function() {
    
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

