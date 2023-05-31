const yourSpan = document.querySelector("#your-score");
const compSpan = document.querySelector("#computer-score");
const resultP = document.querySelector("#result-div p");
const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");

let yourScore = 0;
let compScore = 0;

rockBtn.addEventListener("click", ()=> playRps("rock"));
paperBtn.addEventListener("click", ()=> playRps("paper"));
scissorsBtn.addEventListener("click", ()=> playRps("scissors"));

function computerChoice() {
    let compRps = ["rock", "paper", "scissors"];
    return compRps[Math.floor(Math.random()*(compRps.length))];
}

function youWin(you, comp) {
    yourScore += 1;
    yourSpan.textContent = yourScore;
    compSpan.textContent = compScore;
    resultP.textContent = `${you} beats ${comp}. You win !`;
    
    yourSpan.classList.add("active-win");
    setTimeout(()=> yourSpan.classList.remove("active-win"), 800);
}

function youLose(you, comp) {
    compScore += 1;
    yourSpan.textContent = yourScore;
    compSpan.textContent = compScore;
    resultP.textContent = `${you} loses to ${comp}. You lose...`;

    compSpan.classList.add("active-win");
    setTimeout(()=> compSpan.classList.remove("active-win"), 800);
}

function youDraw(you, comp) {
    resultP.textContent = `${you} equals to ${comp}. It's a draw.`;
}

function playRps(you) {
    const comp = computerChoice();

    if(you==="rock" && comp==="scissors") {
        youWin(you, comp);
    } else if(you==="rock" && comp==="paper") {
        youLose(you, comp);
    } else if(you==="paper" && comp==="rock") {
        youWin(you, comp);
    } else if(you==="paper" && comp==="scissors") {
        youLose(you, comp);
    } else if(you==="scissors" && comp==="paper") {
        youWin(you, comp);
    } else if(you==="scissors" && comp==="rock") {
        youLose(you, comp);
    } else {
        youDraw(you, comp);
    }
}