const buttonContainer = document.querySelector(".button-container");
const display = document.querySelector(".display");
const body = document.querySelector("body");
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

function checkDecimalAbsent(){
    if(input_buffer.indexOf(".") == -1) return true;
    return false;
}

function addBufferAndDisplay(content){
    input_buffer += content;
    display.textContent = input_buffer;
}

//make sure the display will not overflow by limiting the input
function checkValidDisplayLength(){
    if(input_buffer.length < MAX_DISPLAY_LENGTH) return true;
    return false;
}

//only remove the last char if the string is not empty
function removeBufferAndDisplay(){
    if(input_buffer){
        input_buffer = input_buffer.slice(0, input_buffer.length-1);
        display.textContent = input_buffer;
    }
}

function checkButtonClass(button,input){
    let classValue = button.classList.value ;
    if(classValue == "digit"){
        input.content = button.textContent;
        input.isDigit = true;   
    }
    else if(classValue == "dot"){
        input.content = button.textContent;
        input.isDecimal = true;
    }
    else if(classValue == "divides") {
        input.content = "/"; 
        input.isArithmetic = true;
    }    
    else if(classValue == "times") {
        input.content = "*"; 
        input.isArithmetic = true;
    }   
    else if(classValue == "adds") {
        input.content = "+"; 
        input.isArithmetic = true;
    }   
    else if(classValue == "subtracts") {
        input.content = "-";
        input.isArithmetic = true;
    } 
    else if(classValue == "clears"){
        input.isClear = true;
    }
    else if(classValue == "deletes"){
        input.isDelete = true;
    }
    else if(classValue == "equals"){
        input.isEqual = true;
    }
}

function checkKeybroad(key , input){
    const DIGIT = "0123456789";
    const ARITHMETIC = "+-/*";
    if(DIGIT.includes(key)){
        input.content = key;
        input.isDigit = true;
    }
    else if(key == "."){
        input.content = key;
        input.isDecimal = true;
    }
    else if(ARITHMETIC.includes(key)){
        input.content = key;
        input.isArithmetic = true;
    }
    else if(key == "Backspace"){
        input.isDelete = true;
    }
    else if(key == "Delete"){
        input.isClear = true;
    }
    else if(key == "=" || key == "Enter"){
        input.isEqual = true;
    }
}

function checkInput(event){
    input = {
        isDigit : false,
        isDecimal : false,
        isClear : false,
        isDelete : false,
        isEqual : false,
        isArithmetic : false,
        content : "",
    }
    if(event.type == "click"){
        checkButtonClass(event.target , input);
    }
    else if(event.type == "keydown"){
        checkKeybroad(event.key , input);
    }
    return input;
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
    let input = checkInput(event);
    if(input.isDigit){
        if(checkValidDisplayLength()) addBufferAndDisplay(input.content);       
    }
    else if(input.isDecimal){
        if(checkDecimalAbsent()){
            if(checkValidDisplayLength()) addBufferAndDisplay(input.content);
        }
    }
    else if(input.isDelete){
        removeBufferAndDisplay();
    }
    else if(input.isClear){
        restartCal();
    }
    else if(input.isArithmetic){
        doArithmetic(input.content);
    }
    else if(input.isEqual){
        evaluateAndDisplayResult();
    }
    console.log(cal_array);
}

buttonContainer.addEventListener("click",main);
body.addEventListener("keydown",main);