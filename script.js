let num1 , operator , num2 ;
const buttonContainer = document.querySelector(".button-container");
const display = document.querySelector(".display");
let input_buffer = "";
let cal_array = [0,0,0];

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(firstNum,oneOperator,secondNum){
    if(oneOperator == "+") return add(firstNum,secondNum);
    else if(oneOperator == "-") return subtract(firstNum,secondNum);
    else if(oneOperator == "*") return multiply(firstNum,secondNum);
    else if(oneOperator == "/") return divide(firstNum,secondNum);
}

function updateBufferAndDisplay(event){
    input_buffer += event.target.textContent;
    display.textContent = input_buffer;
}

//make sure the display will not overflow by limiting the input
function isValidDisplayLength(){
    if(display.textContent.length < 16) return true;
    return false;
}

function main(event){
    let buttonType = event.target.classList.value;
    if(buttonType == "digit"){
        if(isValidDisplayLength()) updateBufferAndDisplay(event);
        
    }
    else if(buttonType == "divides" || buttonType == "times" || buttonType == "adds" || buttonType == "subtracts"){

    }
    console.log(buttonType, typeof buttonType)
}

buttonContainer.addEventListener("click",main);