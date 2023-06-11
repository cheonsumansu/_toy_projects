const shoppingInput = document.querySelector("#shopping-item");
const itemButton = document.querySelector("#item-button");
const listDiv = document.querySelector("#list-div");
const inventoryDiv = document.querySelector("#inventory-div");
const clearButton = document.querySelector("#clear-button");
const alertP = document.querySelector("#alert-p");

let shoppingList = [];

shoppingInput.addEventListener("keydown", e=> {
    if(e.code==="Enter") {
        addShoppingList();
    }
})
itemButton.addEventListener("click", addShoppingList);

clearButton.addEventListener("click", ()=> {
    const items = document.querySelectorAll(".itemDiv");

    items.forEach(item=> {
        inventoryDiv.removeChild(item);
    })
    
    listDiv.classList.add("hidden");
    shoppingInput.value = "";
    localStorage.removeItem("shoppingList");
    location.reload();
});

function addShoppingList() {
    const shoppingItem = shoppingInput.value.toLowerCase();
    const listObject = {name: shoppingItem,
                        count: 1,};
    
    if(shoppingItem!=="") {
        shoppingInput.value = "";
        checkDuplication(listObject);
        listDiv.classList.remove("hidden");
    } else {
        alertMessage("! Enter the value");
    }
}

function checkDuplication(listObject) {
    let isExists = false;

    for(let i=0; i<shoppingList.length; i++) {
        if(listObject.name===shoppingList[i].name) {
            isExists = true;
        }
    }

    if(isExists) {
        alertMessage("! Already exists");
        return;
    }
    shoppingList.push(listObject);
    addToLocal();
    drawItemDiv(listObject);
}

function drawItemDiv(listObject) {
    const name = listObject.name;
    const count = listObject.count;

    const itemDiv = document.createElement("div");
    itemDiv.setAttribute("class", "item-div");
    const pTag = document.createElement("p");
    pTag.textContent = name;
    const itemEdit = document.createElement("div");
    itemEdit.setAttribute("class", "item-edit");
    const inputTag = document.createElement("input");
    inputTag.setAttribute("type", "text");
    inputTag.setAttribute("value", count);
    inputTag.setAttribute("readOnly", true);
    const plusButton = document.createElement("button");
    plusButton.setAttribute("class", "plus button");
    plusButton.setAttribute("type", "button");
    const minusButton = document.createElement("button");
    minusButton.setAttribute("class", "minus button");
    minusButton.setAttribute("type", "button");
    plusButton.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    minusButton.innerHTML = `<i class="fa-solid fa-minus"><i/>`;
    
    itemEdit.appendChild(inputTag);
    itemEdit.appendChild(plusButton);
    itemEdit.appendChild(minusButton);
    itemDiv.appendChild(pTag);
    itemDiv.appendChild(itemEdit);
    inventoryDiv.appendChild(itemDiv);

    plusButton.addEventListener("click", addItem);
    minusButton.addEventListener("click", subtractItem);
}

function addItem(e) {
    const item = e.target.parentElement;
    const aItem = item.querySelector("input");
    const addItem =item.parentElement.querySelector("p");

    let aItemValue = Number(aItem.value);
    aItemValue++;
    aItem.value = aItemValue;

    for(let i=0; i<shoppingList.length; i++) {
        if(addItem.textContent===shoppingList[i].name) {
            shoppingList[i].count++;
        }
    }
    
    addToLocal();
}

function subtractItem(e) {
    const item = e.target.parentElement;
    const dItem = item.querySelector("input");
    const deleteItem = item.parentElement.querySelector("p");  
        
    let dItemValue = Number(dItem.value);

    if(dItemValue>1) {
        dItemValue--;
        dItem.value = dItemValue;

        for(let i=0; i<shoppingList.length; i++) {
            if(deleteItem.textContent===shoppingList[i].name) {
                shoppingList[i].count--;
            }
        }

    } else {
        item.parentElement.remove();

        shoppingList = shoppingList.filter(item=>
            item.name!==deleteItem.textContent);
    }

    addToLocal();
}

function alertMessage(message) {
    alertP.textContent = `${message}`;
    alertP.classList.add("alert-message");

    setTimeout(()=> {
        alertP.textContent = "";
        alertP.classList.remove("alert-message");
    }, 1000);
}


/* local storage */
function addToLocal() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

const localSaved = localStorage.getItem("shoppingList");
if(localSaved!==null) {
    const savedList = JSON.parse(localSaved);
    shoppingList = savedList;
    savedList.forEach(drawItemDiv);
    listDiv.classList.remove("hidden");
}
