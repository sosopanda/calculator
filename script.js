const mostrar = document.createElement("p");
const results = document.querySelector("#results");

let num1 = '0';
let num2 = '0';
let operating = false;
let reset = false;
let validInput = false;
let operator = "";
let firsNumber = true;
let pointed = false;

results.appendChild(mostrar);

const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".op");
const cleanButton = document.querySelector("#clean");
const pointButton = document.querySelector("#point");

numberButtons.forEach((button) => {
    button.addEventListener("click",() => {
        if(reset == true)
            mostrar.textContent = ''; reset = false;

        mostrar.textContent = mostrar.textContent + button.id;
        
        if(!operating){
            if(!firsNumber){
                num1 = num1 + button.id;
            } else {
                mostrar.textContent = button.id;
                num1 = button.id; 
                firsNumber = false;
            }           
        } else
            if(!firsNumber){
                num2 = num2 + button.id;
            } else {
                num2 = button.id; 
                firsNumber = false;
            } 

        validInput = true;
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click",() => {
        if(validInput){
            pointed = false;
            if(!operating && button.id != "="){
                firsNumber = true;
                //save first number
                operating = true;
                operator = button.id;
                mostrar.textContent = mostrar.textContent + button.id;
                validInput = false;
            } else if (operating && button.id == "="){
                //resolve
                mostrar.textContent = resolve(num1,num2,operator)
                num1 = mostrar.textContent;
                num2 = 0;
                operating = false;
                firsNumber = true;
            } else if(operating){
                //resolve to keep going
                mostrar.textContent = resolve(num1,num2,operator)  + button.id;
                operator = button.id;
                num1 = mostrar.textContent;
                num2 = '0';
                validInput = false;
                firsNumber = true;
            } else{
                mostrar.textContent = "ERROR!";
                reset = true;
                num1 = '0';
                num2 = '0';
                operating = false;
                firsNumber = true;
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

pointButton.addEventListener("click",() => {
    if(!pointed){
        mostrar.textContent = mostrar.textContent + '.';
        if(!operating)
            num1 = num1 + '.';
        else
            num2 = num2 + '.';
        pointed = true;
    }
});

cleanButton.addEventListener("click",() => {
    num1 = '0';
    num2 = '0';
    operating = false;
    reset = true;
    mostrar.textContent = "LIMPIO!";
    validInput = false;
});

function resolve(a,b,op){
    switch (op){
        case "/":
            if(b!=0)
                return parseFloat(a) / parseFloat(b);
            else
                num1 = '0';
                num2 = '0';
                operating = false;
                reset = true;
                validInput = false
                return "ERROR!" 
        case "+":
            return parseFloat(a) + parseFloat(b);
        case "-":
            return parseFloat(a) - parseFloat(b);
        case "X":
            return parseFloat(a) * parseFloat(b);
    }
}

