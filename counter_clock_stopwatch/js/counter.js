const countSpan = document.querySelector("#count");
const counterBtn = document.querySelectorAll(".btn");

let count = 0;

counterBtn.forEach(btn=> {
    btn.addEventListener("click", (e)=> {
        const className = e.currentTarget.classList;

        if(className.contains("increase")) {
            count += 1;
        } else if(className.contains("decrease")) {
            count -= 1;
        } else {
            count = 0;
        }

        countSpan.textContent = count;
    });
});