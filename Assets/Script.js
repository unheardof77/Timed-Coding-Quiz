let $quizSection = document.querySelector("section")
let $beginQuiz = document.getElementById("quizBeginButton")
let $timer = document.getElementById("timeClock")
let index = 0;
let $runningTime = 0;

const questions = [
    { question: "Place holder question",
    correct: "correct answer",
    wrong: "Wrong answer",},
    
    { question: "Another question", 
    correct: "right answer",
    wrong: "Incorrect answer"}];
    
function tryAgain(){
        $runningTime = $runningTime + 5;
        $timer.textContent = $runningTime;
};

function startTime(){
        timeInterval = setInterval(function(){
            $runningTime++;
            $timer.textContent = $runningTime;
        }, 1000);
};
    
function renderQuestions(){
    $quizSection.innerHTML = ""; //clears display
    let $h1 = document.createElement("h1"); //creates h1 tags
    $h1.textContent = `${questions[index].question}`; //adds content to h1 tags
    $quizSection.appendChild($h1);  //makes h1 tags visible
    let $buttonTrue = document.createElement("button");
    let $buttonFalse = document.createElement("button");
    $buttonTrue.textContent = `${questions[index].correct}`;
    $buttonFalse.textContent = `${questions[index].wrong}`;
    $quizSection.appendChild($buttonTrue);
    $quizSection.appendChild($buttonFalse);
    $buttonTrue.addEventListener("click", nextQuestion);
    $buttonFalse.addEventListener("click", tryAgain)
};

function nextQuestion(e){
    if (index < questions.length - 1){
        index++;
        renderQuestions();
    }else{
        clearInterval(timeInterval);
        e.preventDefault()
        $quizSection.innerHTML ="";
        let $h1 = document.createElement("h1");
        let $p = document.createElement("p");
        let $input = document.createElement("input");
        $h1.textContent= (`Congratulations, you finished!`);
        $p.textContent= (`You finished with a score of ${timeInterval}, type your initials below to save your score.`);
        $quizSection.appendChild($h1)
        $quizSection.appendChild($p)
        $quizSection.appendChild($input)
        initials = $input.value;
        localStorage.setItem("initials", initials)
    };
};

    
    



$beginQuiz.addEventListener("click", function(event){
    event.stopImmediatePropagation();
    renderQuestions();
    startTime();
});

