
let $listSection = document.getElementById(`scoreListH`);
let $li = document.createElement("li");
let scores = JSON.parse(localStorage.getItem("highScoreInfo"));
$li.textContent = scores.initials + " " + scores.score;
$listSection.appendChild($li);
console.log(scores)

