const mostrar = document.createElement("p");
const results = document.querySelector("#results");

let num1 = '0';
let num2 = '0';
let operating = false;
let resolved = false;
let operator = "";

results.appendChild(mostrar);

const numberButtons = document.querySelectorAll(".num");
const operatorButtons = document.querySelectorAll(".op");
const cleanButton = document.querySelector("#clean");

numberButtons.forEach((button) => {
    button.addEventListener("click",() => {
        if(mostrar.textContent == "ERROR" || mostrar.textContent == "LIMPIO!" || resolved == true)
            mostrar.textContent = ''; resolved = false;

        mostrar.textContent = mostrar.textContent + button.id;
        if(!operating)
            num1 = num1 + button.id;
        else
            num2 = num2 + button.id;
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click",() => {
        if(!operating && button.id != "equal"){
            //save first number
            operating = true;
            operator = button.id;
            mostrar.textContent = "";
        } else if (button.id == "equal"){
            //resolve
            mostrar.textContent = resolve(num1,num2,operator)
            operating = false
            resolved = true;
            num1 = 0;
            num2 = 0;
        } else {
            //error so reset
            num1 = '0';
            num2 = '0';
            operating = false;
            mostrar.textContent = "ERROR"
        }
    });
});

cleanButton.addEventListener("click",() => {
    num1 = '0';
    num2 = '0';
    operating = false;
    mostrar.textContent = "LIMPIO!";
});

function resolve(a,b,op){
    switch (op){
        case "divide":
            return parseFloat(a) / parseFloat(b); 
            break;
        case "sum":
            return parseInt(a) + parseInt(b);
            break;
        case "min":
            return parseInt(a) - parseInt(b);
            break;
        case "mult":
            return parseInt(a) * parseInt(b);
            break;
    }
}

