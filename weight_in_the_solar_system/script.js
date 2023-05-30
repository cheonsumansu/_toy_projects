const inputText = document.querySelector(".input-text");
const outputText = document.querySelector(".output-text");
const btnChoice = document.querySelectorAll(".btn");
const fromSelect = document.querySelector("#input-container select");
const toSelect = document.querySelector("#output-container select");
let mass;
let resultValue;
let earth = 9.807;

//console.log(btnChoice)

btnChoice.forEach(btn=> {
    btn.addEventListener("click", e=> {
        let btnText = e.currentTarget.classList;
        let inputValue = Number(inputText.value);
        //console.log(inputValue);
        
        resultValue = calculateWeight(btnText, inputValue).toFixed(3);
        //console.log(resultValue);
        outputText.value = resultValue;
    })
})

function calculateWeight(btnText, inputValue) {
    mass = inputValue/earth;

    if(btnText.contains("sun")) {
        return mass*274;
    } else if(btnText.contains("moon")) {
        return mass*1.62;
    } else if(btnText.contains("mercury")) {
        return mass*3.7;
    } else if(btnText.contains("venus")) {
        return mass*8.87;
    } else if(btnText.contains("earth")) {
        return inputValue;
    } else if(btnText.contains("mars")) {
        return mass*3.721;
    } else if(btnText.contains("jupiter")) {
        return mass*24.79;
    } else if(btnText.contains("saturn")) {
        return mass*10.44;
    } else if(btnText.contains("uranus")) {
        return mass*8.87;
    } else if(btnText.contains("neptune")) {
        return mass*11.15;
    } else {
        return mass*0.62;
    }
}
