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
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0;
//  Set Color to grey
setIndicator("#ccc");


// FunctionCalls

handleSlider();


// Function to set password length according to slider input
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
});

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "0px 0px 5px 5px hsl(281, 89%, 26%)";
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

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
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

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckboxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider(); 
    };
};

// Assuming allCheckBox is a NodeList or array of checkboxes
// const allCheckBox = document.querySelectorAll('input[type="checkbox"]');

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
});


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    } catch(e){
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
    
}



copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});

generateBtn.addEventListener('click',()=>{
    if(checkCount==0) return;

    if(passwordLength<checkCount){
        passwordLength = checkCount; 
        handleSlider();
    }
    console.log("Starting");

    //remove old pass

    password = "";


    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }

    // if(numberCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(symbolCheck.checked){
    //     password += generateSymbols();
    // }

    // mandetory

    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }

    if(numberCheck.checked){
        funcArr.push(generateRandomNumber);
    }

    if(symbolCheck.checked){
        funcArr.push(generateSymbol);
    }

    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    console.log("Mandatory done");
    // remaining 

    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex = getRndInteger(0,funcArr.length);
        password+=funcArr[randIndex]();    
    }

    console.log("Remaining done");

    password = shufflePassword(Array.from(password));

    console.log("Shuffle done");

    passwordDisplay.value = password;

    caculateStrength();

    console.log("strength done");
});