var timerEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');

// question card's information'
const quiz = [
    {
        question: "Commonly used datatypes DO NOT include:",
        choices: ['1. string', '2. boolean', '3. alerts', '4. numbers'],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with ___",
        choices: ['1. quotes', '2. curly braces', '3. parenthesis', '4. square brackets'],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in javascript can be used to store ____",
        choices: ['1. numbers an strings', '2. booleans', '3. other arrays', '4. all of the above'],
        answer: "4. all of the above"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
        answer: "4. console.log"
    }
];

// Timer that counts down from 75
function countdown() {
  var timeLeft = 75;

  var timeInterval = setInterval(function() {
    
    timerEl.textContent = "Time: " + timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
}



startBtn.onclick = countdown;
