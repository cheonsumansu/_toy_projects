const timeP = document.querySelector("#time-p");
const msSpan = document.querySelector("#time-ms");
const clickBtn = document.querySelector("#click-button");
const startIcon = document.querySelector("#start-icon");
const pauseIcon = document.querySelector("#pause-icon");
const resetBtn = document.querySelector("#reset-button");

let paused = true;
let startTime = 0;
let elapsedTime = 0;
let intervalId;
let hours = 0;
let minutes = 0;
let seconds = 0;
let mSeconds = 0;

clickBtn.addEventListener("click", ()=> {
    if(pauseIcon.classList.contains("hidden")) {
        pauseIcon.classList.remove("hidden");
        startIcon.classList.add("hidden");
    } else {
        pauseIcon.classList.add("hidden");
        startIcon.classList.remove("hidden");   
    }
});

startIcon.addEventListener("click", ()=> {
    if(paused) {
        paused = false;
        startTime = Date.now()-elapsedTime;
        intervalId = setInterval(makeStopwatch, 75);
    }
})

pauseIcon.addEventListener("click", ()=> {
    if(!paused) {
        paused = true;
        elapsedTime = Date.now()-startTime;
        clearInterval(intervalId);
    }
})

resetBtn.addEventListener("click", ()=> {
    paused = true;
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    mSeconds = 0;
    timeP.textContent = "00:00:00";
    msSpan.textContent = "000";
});

function makeStopwatch() {
    elapsedTime = Date.now()-startTime;
    hours = Math.floor((elapsedTime/(1000*60*60)%24));
    minutes = Math.floor((elapsedTime/(1000*60)%60));
    seconds = Math.floor((elapsedTime/1000)%60);
    mSeconds = Math.floor((elapsedTime%1000));

    displayTime(hours, minutes, seconds, mSeconds);
}

function displayTime(hours, minutes, seconds, mSeconds) {
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    mSeconds = String(mSeconds).padStart(3, "0");

    timeP.textContent = `${hours}:${minutes}:${seconds}`;
    msSpan.textContent = mSeconds;
}
