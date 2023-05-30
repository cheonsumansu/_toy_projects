const textContainer = document.querySelector("#text-container");
const backspaceKey  = document.querySelector(".backspace");
const tabKey = document.querySelector(".tab");
const capslockKey = document.querySelector(".capslock");
const enterKey = document.querySelector(".enter");
const shiftKey = document.querySelector(".shift");
const spaceKey = document.querySelector(".space");
const keys = document.querySelectorAll(".key");

const numberSymbol = {"1":"!", "2":"@", "3":"#",
                    "4":"$", "5":"%", "6":"^",
                    "7":"&", "8":"*", "9":"(", "0":")"};
let isCaps = false;

keys.forEach(key=> {
    key.addEventListener("click", ()=> {
        textContainer.textContent += key.innerText;
    })
});

backspaceKey.addEventListener("click", ()=> {
    let texts = textContainer.textContent;
    let newTexts = texts.slice(0, texts.length-1);
    textContainer.textContent = newTexts;
});

tabKey.addEventListener("click", ()=> {
    textContainer.textContent += "\t";
});

capslockKey.addEventListener("click", ()=> {
    if(isCaps) {
        capslockKey.classList.remove("active-click");
        makeLower();
    } else {
        capslockKey.classList.add("active-click");
        makeUpper();
    }
    isCaps = !isCaps;
});

enterKey.addEventListener("click", ()=> {
    textContainer.textContent += "\n";
});

shiftKey.addEventListener("click", ()=> {
    makeUpper();
    keys.forEach(key=> {
        key.addEventListener("click", makeLower);
    });
});

spaceKey.addEventListener("click", ()=> {
    textContainer.textContent += " ";
});

function makeUpper() {
    for(let key of keys) {
        key.innerText = key.innerText.toUpperCase();

        if(key.innerText===";") {
            key.innerText = ":"
        } else if(key.innerText===",") {
            key.innerText = "<";
        } else if(key.innerText===".") {
            key.innerText = ">";
        } else if(key.innerText==="?") {
            key.innerText = "/";
        } else if(key.innerText in numberSymbol) {
            key.innerText = numberSymbol[key.innerText];
        }
    }
}

function makeLower() {
    for(let key of keys) {
        if(getKeyByValue(numberSymbol, key.innerText)!==undefined) {
            key.innerText = getKeyByValue(numberSymbol, key.innerText);

        } else {
            key.innerText = key.innerText.toLowerCase();

            if(key.innerText===":") {
                key.innerText = ";"
            } else if(key.innerText==="<") {
                key.innerText = ",";
            } else if(key.innerText===">") {
                key.innerText = ".";
            } else if(key.innerText==="/") {
                key.innerText = "?";
            }
        }
    }
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key=> object[key]===value);
}