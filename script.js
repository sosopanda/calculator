const mostrar = document.createElement("p");
const results = document.querySelector("#results");

let num1 = '0';
let num2 = '0';
let operating = false;
let reset = false;
let validInput = true;
let operator = "";

results.appendChild(mostrar);

const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".op");
const cleanButton = document.querySelector("#clean");

numberButtons.forEach((button) => {
    button.addEventListener("click",() => {
        if(reset == true)
            mostrar.textContent = ''; reset = false;

        mostrar.textContent = mostrar.textContent + button.id;
        if(!operating)
            num1 = num1 + button.id;
        else
            num2 = num2 + button.id;

        validInput = true;
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click",() => {
        if(validInput){
            if(!operating && button.id != "="){
                //save first number
                operating = true;
                operator = button.id;
                mostrar.textContent = mostrar.textContent + button.id;
                validInput = false;
            } else if (button.id == "="){
                //resolve
                mostrar.textContent = resolve(num1,num2,operator)
                operating = false;
                num1 = mostrar.textContent;
                num2 = 0;
            } else {
                //resolve to keep going
                mostrar.textContent = resolve(num1,num2,operator)  + button.id;
                operator = button.id;
                num1 = mostrar.textContent;
                num2 = '0';
                validInput = false;
            }
        } else {
            mostrar.textContent = "ERROR!";
            reset = true;
            num1 = '0';
            num2 = '0';
            operating = false;
        }
    });
});

cleanButton.addEventListener("click",() => {
    num1 = '0';
    num2 = '0';
    operating = false;
    reset = true;
    mostrar.textContent = "LIMPIO!";
});

function resolve(a,b,op){
    switch (op){
        case "/":
            return parseFloat(a) / parseFloat(b); 
            break;
        case "+":
            return parseInt(a) + parseInt(b);
            break;
        case "-":
            return parseInt(a) - parseInt(b);
            break;
        case "X":
            return parseInt(a) * parseInt(b);
            break;
    }
}

