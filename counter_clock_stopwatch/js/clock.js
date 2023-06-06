const clockSpan = document.querySelector("#clock");
const dateSpan = document.querySelector("#date");

getClock();
setInterval(getClock, 1000);
getDate();

function getClock() {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();

    clockSpan.textContent = `${addZero(hours)} : ${addZero(minutes)} : ${addZero(seconds)}`;
}

function addZero(time) {
    return String(time).padStart(2, "0");
}

function getDate() {
    const today = new Date();
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
    };

    dateSpan.textContent = today.toLocaleDateString("en-US", options);
}