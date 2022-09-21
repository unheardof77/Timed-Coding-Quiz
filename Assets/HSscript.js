let $listSection = document.getElementById(`scoreListH`);
let scores = JSON.parse(localStorage.getItem("highScoreInfo"));
const clearButton = document.getElementById(`clearScoreButtonH`);

function clearScores(){
    $listSection.innerHTML = ""
    
    localStorage.clear()
};

for(i = 0; i < scores.length; i++){
    let $li = document.createElement("li");
    $li.textContent = scores[i].initials + " " + scores[i].score;
    $listSection.appendChild($li);
};

clearButton.addEventListener(`click`, clearScores)
