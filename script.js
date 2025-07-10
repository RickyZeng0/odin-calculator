let num1 , operator , num2 ;
const buttonContainer = document.querySelector(".button-container");
const display = document.querySelector(".display");
let input_buffer = "";
let cal_array = [];

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

function addBufferAndDisplay(event){
    input_buffer += event.target.textContent;
    display.textContent = input_buffer;
}

//make sure the display will not overflow by limiting the input
function isValidDisplayLength(){
    if(display.textContent.length < 16) return true;
    return false;
}

//only remove the last char if the string is not empty
function removeBufferAndDisplay(){
    if(input_buffer){
        input_buffer = input_buffer.slice(0, input_buffer.length-1);
        display.textContent = input_buffer;
    }
}


function main(event){
    let buttonType = event.target.classList.value;
    if(buttonType == "digit"){
        if(isValidDisplayLength()) addBufferAndDisplay(event);
        
    }
    else if(buttonType == "deletes"){
        removeBufferAndDisplay();
    }
    else if(buttonType == "divides" || buttonType == "times" || buttonType == "adds" || buttonType == "subtracts"){

    }
    console.log(input_buffer);
}

buttonContainer.addEventListener("click",main);