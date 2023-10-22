const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelector("input[type=checkbox]");

let passwword = "";
let passwordLength = 10;
let checkCount = 1;
//  Set Color to grey


// FunctionCalls

handleSlider();


// Function to set password length according to slider input
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "5px 5px 5px 5px rgba(0,0,0,0.75)";
}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbols(){
    let symbols = '!@{}|[]\:"<>?,./#$%^&*()';
    const randomNumber = getRndInteger(0,symbols.length);
    return symbols.charAt[randomNumber];

}

function caculateStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8){
        setIndicator("#0f0");
    } else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >=6){
        setIndicator("#ff0");
    } else {
        setIndicator("#ff0");
    }
}

async function copyContent(){
    
}