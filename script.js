const mostrar = document.createElement("p");
const results = document.querySelector("#results");

const checkOperators = "/+-X";
const checkNumbers = "0123456789"

let num1 = '';
let num2 = '';
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
const backButton = document.querySelector("#back");

//calling the funciton to add a number when a number is clicked
numberButtons.forEach((button) => {
    button.addEventListener("click",() => {
        addNumber(button.id);
    });
});

//calling the function to add an operator and resolve if needed when an operator is clicked
operatorButtons.forEach((button) => {
    button.addEventListener("click",() => {
        addOperator(button.id);
    });
});

//keyboard controls
document.addEventListener("keydown", function(event) {
    if(checkNumbers.includes(event.key))
        addNumber(event.key);
    if(checkOperators.includes(event.key))
        addOperator(event.key);
    if(event.key == "Enter")
        addOperator('=');
}, true);

//adding a decimal and controlling not adding two points to the same number
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

//clean all and reset states
cleanButton.addEventListener("click",() => {
    num1 = '0';
    num2 = '0';
    operating = false;
    reset = true;
    mostrar.textContent = "LIMPIO!";
    validInput = false;
});

//backspace depending on the number or operator being deleted
backButton.addEventListener("click",() => {
    if(num1 != ''){
        if(num2 != ''){
            num2 = num2.slice(0,-1);
            mostrar.textContent = mostrar.textContent.slice(0,-1);
        } else if(checkOperators.includes(mostrar.textContent)){
            mostrar.textContent = mostrar.textContent.slice(0,-1);
            operating = false;

        } else{
            operating = false;
            num1 = mostrar.textContent.slice(0,-1);
            mostrar.textContent = mostrar.textContent.slice(0,-1);
        }
    }
});

//adding the operator and resolving if needed
function addOperator(op) {
    if(validInput){
        pointed = false;

        //save first number and adding the first operator
        if(!operating && op != "="){
            firsNumber = true;
            operating = true;
            operator = op;
            mostrar.textContent = mostrar.textContent + op;
            validInput = false;

        //resolving when = pressed    
        } else if (operating && op == "=" && num2 != ''){
            mostrar.textContent = resolve(num1,num2,operator)
            num1 = mostrar.textContent;
            num2 = 0;
            operating = false;
            firsNumber = true;
            
        //resolve to keep going with more operators   
        } else if(operating){
            mostrar.textContent = resolve(num1,num2,operator)  + op;
            operator = op;
            num1 = mostrar.textContent;
            num2 = '0';
            validInput = false;
            firsNumber = true;

        //handling unwanted scenarios
        } else{
            mostrar.textContent = "ERROR!";
            reset = true;
            num1 = '0';
            num2 = '0';
            operating = false;
            firsNumber = true;
        }

    //handling unwanted scenarios
    } else {
        mostrar.textContent = "ERROR!";
        reset = true;
        num1 = '0';
        num2 = '0';
        operating = false;
    }
}

//adding the first or the second number
function addNumber(num) {

    //checking if screen needs to be cleaned
    if(reset == true)
            mostrar.textContent = ''; reset = false;

        mostrar.textContent = mostrar.textContent + num;

        //first number
        if(!operating){
            if(!firsNumber){
                num1 = num1 + num;
            } else {
                mostrar.textContent = num;
                num1 = num; 
                firsNumber = false;
            }     
            
        //second number    
        } else
            if(!firsNumber){
                num2 = num2 + num;
            } else {
                num2 = num; 
                firsNumber = false;
            } 

        validInput = true;
}

//function to resolve operations depending on the operator
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

