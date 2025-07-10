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

function checkArithmetic(classValue){
    obj = {
        isArithmetic : false,
        type : classValue,
    }
    if(classValue == "divides") {
        obj.type = "/"; 
        obj.result = true;
    }    
    if(classValue == "times") {
        obj.type = "*"; 
        obj.result = true;
    }   
    if(classValue == "adds") {
        obj.type = "+"; 
        obj.result = true;
    }   
    if(classValue == "subtracts") {
        obj.type = "-";
        obj.result = true;
    } 
    return obj;
}

function doArithmetic(operator){
    let len = cal_array.length;
    if(len == 0){

    }
}


function main(event){
    let button = checkArithmetic(event.target.classList.value);
    if(button.type == "digit"){
        if(isValidDisplayLength()) addBufferAndDisplay(event);
        
    }
    else if(button.type == "deletes"){
        removeBufferAndDisplay();
    }
    else if(button.isArithmetic){
        doArithmetic(button.type);
    }
    console.log(input_buffer);
}

buttonContainer.addEventListener("click",main);