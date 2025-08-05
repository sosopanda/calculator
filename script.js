const mostrar = document.createElement("p");
const results = document.querySelector("#results");

const checkOperators = '/+-X';

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

//adding the first and second number
numberButtons.forEach((button) => {

    //checking if screen needs to be cleaned
    button.addEventListener("click",() => {
        if(reset == true)
            mostrar.textContent = ''; reset = false;

        mostrar.textContent = mostrar.textContent + button.id;

        //first number
        if(!operating){
            if(!firsNumber){
                num1 = num1 + button.id;
            } else {
                mostrar.textContent = button.id;
                num1 = button.id; 
                firsNumber = false;
            }     
            
        //second number    
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

//adding the operator and resolving if needed
operatorButtons.forEach((button) => {
    button.addEventListener("click",() => {
        if(validInput){
            pointed = false;

            //save first number and adding the first operator
            if(!operating && button.id != "="){
                firsNumber = true;
                operating = true;
                operator = button.id;
                mostrar.textContent = mostrar.textContent + button.id;
                validInput = false;

            //resolving when = pressed    
            } else if (operating && button.id == "=" && num2 != ''){
                mostrar.textContent = resolve(num1,num2,operator)
                num1 = mostrar.textContent;
                num2 = 0;
                operating = false;
                firsNumber = true;
            
            //resolve to keep going with more operators   
            } else if(operating){
                mostrar.textContent = resolve(num1,num2,operator)  + button.id;
                operator = button.id;
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
    });
});

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
        } else if(mostrar.textContent.includes(checkOperators)){
            mostrar.textContent = mostrar.textContent.slice(0,-1);
            operating = false;

        } else{
            operating = false;
            num1 = mostrar.textContent.slice(0,-1);
            mostrar.textContent = mostrar.textContent.slice(0,-1);
        }
    }
});

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

