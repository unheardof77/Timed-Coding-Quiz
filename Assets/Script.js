let $quizSection = document.querySelector(".subSection")
let $beginQuiz = document.getElementById("quizBeginButton")
let $timer = document.getElementById("timeClock")
let index = 0;
let $runningTime = 0;
// array of questions below.
const questions = [
    { question: "What language is this? <h1>",
    correct: "HTML",
    wrong: "CSS",
    secondWrong: "JavaScript"},
    
    { question: "What is CSS?", 
    correct: "A programming language that adds style to a website.",
    wrong: "A programming language that adds interactivity to a website.",
    secondWrong: "A programming language that structures websites."},

    {question: "What is the proper syntax to create a function in JavaScript?",
    correct: "function steve(){};",
    wrong: "steve = function(){};",
    secondWrong: "function steve{}();"},

    {question: "Where do you link a CSS file in an HTML document?",
    correct: "The head.",
    wrong: "The footer.",
    secondWrong: "It doesn't need to be linked."
    },

    {question: "What method is used to add a variable or other applicable element(s) to local storage?",
    correct: "localStorage.setItem()",
    wrong: "localStorage.getItem()",
    secondWrong: "JSON.stringify()"
    },

    {question: "Which of these is NOT an array method?",
    correct: "Array.prototype.upshift()",
    wrong: "Array.prototype.reverse",
    secondWrong: "Array.prototype.reduceRight()"
    }
    
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
//makes option buttons not in the same spot every time.
function addChildren($buttonTrue, $buttonFalse, $buttonAlsoWrong){
    const storedIndex = []
    while (storedIndex.length < 3){ // [ 0 ]
        let randomIndex = Math.floor(Math.random()*3) // 0, 1, 1
        if(storedIndex.includes(randomIndex)){
            continue;
        }else{
            storedIndex.push(randomIndex);  // [ 0, 1 ]
            if(randomIndex== 0){
                $quizSection.appendChild($buttonTrue);
                $buttonTrue.addEventListener("click", nextQuestion);
            }else if(randomIndex== 1){
                $quizSection.appendChild($buttonFalse);
                $buttonFalse.addEventListener("click", tryAgain);
            }else {
                $quizSection.appendChild($buttonAlsoWrong);
                $buttonAlsoWrong.addEventListener("click", tryAgain);
            }
        }
    }
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
    let $buttonTrue = document.createElement("button");
    let $buttonFalse = document.createElement("button");
    let $buttonAlsoWrong = document.createElement("button");
    $h1.textContent = `${questions[index].question}`; 
    $buttonTrue.textContent = `${questions[index].correct}`;
    $buttonFalse.textContent = `${questions[index].wrong}`;
    $buttonAlsoWrong.textContent = `${questions[index].secondWrong}`;
    $quizSection.appendChild($h1);  
    addChildren($buttonTrue, $buttonFalse, $buttonAlsoWrong);
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
    let highScoreCloudInfo =  JSON.parse(localStorage.getItem("highScoreInfo")) || []
    highScoreCloudInfo.push(highScore);
    localStorage.setItem("highScoreInfo", JSON.stringify(highScoreCloudInfo));
    window.location.assign("./highScore.html");
});

