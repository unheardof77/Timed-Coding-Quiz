let $quizSection = document.querySelector(".subSection")
let $beginQuiz = document.getElementById("quizBeginButton")
let $timer = document.getElementById("timeClock")
let index = 0;
let $runningTime = 0;
// array of questions below.
const questions = [
    { question: "Place holder question",
    correct: "correct answer",
    wrong: "Wrong answer",},
    
    { question: "Another question", 
    correct: "right answer",
    wrong: "Incorrect answer"}
];
//Function that add times to the clock when question is missed.
function tryAgain(){
        $runningTime = $runningTime + 5;
        $timer.textContent = $runningTime;
};
//function that starts the time.
function startTime(){
        timeInterval = setInterval(function(){
            $runningTime++;
            $timer.textContent = $runningTime;
        }, 1000);
};
//Creates the end quiz screen that allows you too enter your initials.
function createEndQuiz(){
    let $h1 = document.createElement("h1");
    let $p = document.createElement("p");
    let $input = document.createElement("input");
    $h1.textContent= (`Congratulations, you finished!`);
    $p.textContent= (`You finished with a score of ${$runningTime}, type your initials to save your score.`);
    $quizSection.appendChild($h1);
    $quizSection.appendChild($p);
    document.querySelector("form").appendChild($input);
};
//function that creates the question and answers and appends them.
function renderQuestions(){
    $quizSection.innerHTML = ""; 
    let $h1 = document.createElement("h1"); 
    $h1.textContent = `${questions[index].question}`; 
    $quizSection.appendChild($h1);  
    let $buttonTrue = document.createElement("button");
    let $buttonFalse = document.createElement("button");
    $buttonTrue.textContent = `${questions[index].correct}`;
    $buttonFalse.textContent = `${questions[index].wrong}`;
    $quizSection.appendChild($buttonTrue);
    $quizSection.appendChild($buttonFalse);
    $buttonTrue.addEventListener("click", nextQuestion);
    $buttonFalse.addEventListener("click", tryAgain);
};
//function that checks if out of questions and makes highScore screen then saves data.
function nextQuestion(){
    if (index < questions.length - 1){
        index++;
        renderQuestions();
    }else{
        clearInterval(timeInterval);
        $quizSection.innerHTML ="";
        createEndQuiz();
    };
};
//Button that starts all the functions above.
$beginQuiz.addEventListener("click", function(){
    renderQuestions();
    startTime();
});
//Saves data when enter is clicked.
document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();
    let $input =document.querySelector("form")[0];
    const highScore = {score: $runningTime, initials: $input.value};
    localStorage.setItem("highScoreInfo", JSON.stringify(highScore)); 
});