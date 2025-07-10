let num1 , operator , num2 ;
const buttonContainer = document.querySelector(".button-container");
const display = document.querySelector(".display");
let input_buffer = "";
let cal_array = [1,2,3];

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
function checkValidDisplayLength(){
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

function clearArray(){
    while(cal_array.length > 0){
        cal_array.pop();
    }
}

function doArithmetic(operator){
    let len = cal_array.length;
    if(len == 0){
        if(input_buffer){
            cal_array.push(Number(input_buffer));
            cal_array.push(operator);
        }
    }
    else if(len == 2){
        if(input_buffer){
            cal_array.push(Number(input_buffer));
            let result = operate(cal_array[0],cal_array[1],cal_array[2]);

        }
    }
}


function main(event){
    let button = checkArithmetic(event.target.classList.value);
    if(button.type == "digit"){
        if(checkValidDisplayLength()) addBufferAndDisplay(event);       
    }
    else if(button.type == "deletes"){
        removeBufferAndDisplay();
    }
    else if(button.isArithmetic){
        doArithmetic(button.type);
    }
    console.log(button.type);
}

buttonContainer.addEventListener("click",main);