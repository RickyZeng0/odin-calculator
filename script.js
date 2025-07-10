let num1 , operator , num2 ;
const buttonContainer = document.querySelector(".button-container");
const display = document.querySelector(".display");
const MAX_DISPLAY_LENGTH = 16;
let input_buffer = "";
let cal_array = [];


function shortenNum(number){
    let result = String(number);
    if(result.length > MAX_DISPLAY_LENGTH) {
        result = result.slice(0,MAX_DISPLAY_LENGTH);
    }
    return Number(result);
}

function treatAndReturnMathError(){
    alert("Math Error ! You have divide the number by 0 ! The calculator will restart");
    restartCal();
}

function restartCal(){
    clearArray();
    input_buffer = "";
    display.textContent = "";
}

function operate(firstNum,oneOperator,secondNum){
    let result;
    if(oneOperator == "+") result = firstNum + secondNum;
    else if(oneOperator == "-") result = firstNum - secondNum;
    else if(oneOperator == "*") result = firstNum * secondNum;
    else if(oneOperator == "/") {
        if(secondNum == 0)  return undefined;
        else result = firstNum / secondNum;
    }
    return shortenNum(result);
}

function addBufferAndDisplay(event){
    input_buffer += event.target.textContent;
    display.textContent = input_buffer;
}

//make sure the display will not overflow by limiting the input
function checkValidDisplayLength(){
    if(display.textContent.length <= MAX_DISPLAY_LENGTH) return true;
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
        obj.isArithmetic = true;
    }    
    if(classValue == "times") {
        obj.type = "*"; 
        obj.isArithmetic = true;
    }   
    if(classValue == "adds") {
        obj.type = "+"; 
        obj.isArithmetic = true;
    }   
    if(classValue == "subtracts") {
        obj.type = "-";
        obj.isArithmetic = true;
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
        //case 1: user enter number , then enter operator at the beginning.
        if(input_buffer){
            cal_array.push(Number(input_buffer));
            cal_array.push(operator);
            input_buffer = "";
            console.log(cal_array);
        }
        //case 2 : user type the operator mutiple times at the beginning.
    }
    //case 3 : the case after user press the equal buuton
    else if(len == 1){
        if(input_buffer) {
            cal_array[0] = Number(input_buffer);
            input_buffer = "";
        } 
        cal_array.push(operator);
    }
    else if(len == 2){
        //case 4 : user enter number and operator again after case 1
        if(input_buffer){
            evaluateAndDisplayResult();
            cal_array.push(operator);
            console.log(cal_array);
        }
        //case 5 : user type the operator mutiple times after case 1
        else{
            cal_array[1] = operator;
        }
    }
    console.log(cal_array);
}

function evaluateAndDisplayResult(){
    if(cal_array.length == 2 && input_buffer){
        cal_array.push(Number(input_buffer));
        let result = operate(cal_array[0],cal_array[1],cal_array[2]);
        if(result === undefined){               
            treatAndReturnMathError();
        }
        else{
            clearArray();
            cal_array.push(result);
            input_buffer = "";
            display.textContent = `${result}`;           
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
    else if(button.type == "clears"){
        restartCal();
    }
    else if(button.isArithmetic){
        doArithmetic(button.type);
    }
    else if(button.type == "equals"){
        evaluateAndDisplayResult();
    }
    console.log(cal_array);
}

buttonContainer.addEventListener("click",main);