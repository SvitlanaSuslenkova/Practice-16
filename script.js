'use strict';
const inputs = document.getElementsByTagName("input");
const buttons = document.getElementsByTagName("button");
const section2 = document.querySelector(".section2");
const section3 = document.querySelector(".section3");
const errorText = document.querySelectorAll(".errorText");

let validName;
let validYear;
let validMonth;
let validNumber;
let validCVC;
let today = new Date();
let todayYear=today.getFullYear().toString().slice(-2);
let todayMonth=today.getMonth()+1;

let year = inputs[3].value;
let month = inputs[2].value.padStart(2, '0');
let lastDayOfMonth = new Date(year, month, 0);
let lastDayNumber = lastDayOfMonth.getDate();

let imageNumber = document.querySelector(".cardNumber");
imageNumber.innerHTML=`0000 0000 0000 0000`;
let imageName = document.querySelector(".cardName");
imageName.innerHTML=`JANE APPLESEED`; 
let imageMM = document.querySelector(".cardMM");
imageMM.innerHTML=`00`; 
let imageYY = document.querySelector(".cardYY");
imageYY.innerHTML=`00`; 
let imageCVC = document.querySelector(".cardCVC");
imageCVC .innerHTML=`000`; 

 inputs[1].addEventListener("input", function() {
    if (inputs[1].value !== '') { 
  imageNumber.innerHTML= 
  (inputs[1].value.slice(0, -5).replaceAll(/[0-9]/g, '*') +
  inputs[1].value.trim().replaceAll(/ /g,'').slice(-4).padStart(5, ' ')).slice(0, 24);
    
    if((imageNumber.innerHTML.trim().replaceAll(/ /g,'').length)%4===0 ) { 
        imageNumber.innerHTML=imageNumber.innerHTML.trimStart()+` `;
}}});

 inputs[0].addEventListener("input", function() {
    if (inputs[0].value !== '') {imageName.innerHTML=inputs[0].value.toUpperCase();}
 });
 inputs[2].addEventListener("input", function() {
    if (inputs[2].value !== '') {imageMM.innerHTML=inputs[2].value.padStart(2, '0').slice(0, 2);}
 });
 inputs[3].addEventListener("input", function() {
    if (inputs[3].value !== '') {imageYY.innerHTML=inputs[3].value.slice(0, 2);}
 });
 inputs[4].addEventListener("input", function() {
if (inputs[4].value !== '') {
        
imageCVC.innerHTML=
(inputs[4].value.toString().slice(0, -1).replaceAll(/[0-9]/g, '*') +
inputs[4].value.toString().slice(-1)).slice(0, 3);
}});

// borders
for (let i = 0; i < inputs.length; i++) {
    let self=inputs[i];
    self.addEventListener('focus', function(event) {
        event.preventDefault();
        this.parentElement.classList.add('borderInFocusImage');
    });}
for (let i = 0; i < inputs.length; i++) {
    let self=inputs[i];
    self.addEventListener('blur', function(event) {
        event.preventDefault();
        this.parentElement.classList.remove('borderInFocusImage');
    });}

//max input
document.querySelectorAll('input[type="number"]').forEach(input => {
   input.oninput=()=>{
    if(input.value.length > input.maxLength) input.value=input.value.slice(0, input.maxLength);
   };});

//name
inputs[0].addEventListener("input", function () {
if (inputs[0].value.match(/^[A-Za-z\-\s]*$/) == null )    {    
    errorText[0].innerHTML="Your name can't contain numbers!";
    inputs[0].parentElement.classList.add('borderError');
    validName=0;  
}
else {
    errorText[0].innerHTML='';
    inputs[0].parentElement.classList.remove('borderError');
    validName=1;
}});

buttons[0].addEventListener("click", function(){ 
if(inputs[0].value === "") {
    errorText[0].innerHTML='Please, input your full name!';    
    inputs[0].parentElement.classList.add('borderError');
    validName=0;
    }
else if (inputs[0].value.length <=3) {
    errorText[0].innerHTML='Please, input your full name!';    
    inputs[0].parentElement.classList.add('borderError');
    validName=0;  
}  
});

//MM
buttons[0].addEventListener("click", function(){
if  (inputs[2].value==="") {
    errorText[2].innerHTML="Can't be blank!";
    inputs[2].parentElement.classList.add('borderError');
    validMonth=0;        
    }         
else if (inputs[2].value<1 || inputs[2].value>12) {
    errorText[2].innerHTML="Not valid month!";
    inputs[2].parentElement.classList.add('borderError');
    validMonth=0;        
    }
else   {validMonth=1;} 
}); 
inputs[2].addEventListener("input", function () {
    if (inputs[2].value!=="") {
        errorText[2].innerHTML=""; 
        inputs[2].parentElement.classList.remove('borderError'); 
        errorText[3].innerHTML=""; 
        inputs[3].parentElement.classList.remove('borderError');     
    }});

//YY+MM
buttons[0].addEventListener("click", function(){     
if  (inputs[3].value==="") {
    errorText[3].innerHTML="Can't be blank!";
    inputs[3].parentElement.classList.add('borderError');
    validYear=0;
}   
else if (inputs[3].value < Number(todayYear)) {  //+
    errorText[3].innerHTML="Your card has expired!";
    inputs[3].parentElement.classList.add('borderError');
    validYear=0;
}
else if (inputs[3].value == Number(todayYear) && inputs[2].value<todayMonth) {
    errorText[3].innerHTML="Your card has expired!";
    inputs[3].parentElement.classList.add('borderError');
    validYear=0;   
}
else if (inputs[3].value == Number(todayYear) && inputs[2].value==todayMonth && today.getDate() == lastDayNumber) {
    errorText[3].innerHTML="Your card has expired!";
    inputs[3].parentElement.classList.add('borderError');
    validYear=0;
}
else {validYear=1;}
});
inputs[3].addEventListener("input", function () {
    if (inputs[3].value!=="") {
        errorText[3].innerHTML=""; 
        inputs[3].parentElement.classList.remove('borderError');      
    }
});

//CVC 
buttons[0].addEventListener("click", function(){
if (inputs[4].value==="") {
    errorText[4].innerHTML="Can't be blank!";
    inputs[4].parentElement.classList.add('borderError');
    validCVC=0;        
}
else if (inputs[4].value.length<3) {
    errorText[4].innerHTML="Not valid cvc!";
    inputs[4].parentElement.classList.add('borderError');
    validCVC=0;    
}       
    else   {validCVC=1;} 
    }); 
inputs[4].addEventListener("input", function () {
    if (inputs[4].value!=="") {
    errorText[4].innerHTML=""; 
    inputs[4].parentElement.classList.remove('borderError');      
    }
});

//NUMBER

//add spaces
/*
// Mask doesnt work
var patternMask = IMask((inputs[1].value), {
    mask: '**** **** **** ****'
});
*/
inputs[1].addEventListener('keydown', function(event) {
    const key = event.key;
if((inputs[1].value.toString().trim().replaceAll(/ /g,'').length)%4===0 ) { 
    inputs[1].value=inputs[1].value.trimStart()+` `;
if (key === "Backspace"){
   inputs[1].value=inputs[1].value.toString().trimEnd();
}
//else if (key === "Delete") {inputs[1].value="";}
}});

// only numbers
inputs[1].addEventListener("input", function () {
    if (/^\d+$/.test(Number(inputs[1].value.trim().replaceAll(/ /g,'')))==false || Number.isInteger(inputs[1].value.trim().replaceAll(/ /g,''))==true) {
    errorText[1].innerHTML="Wrong format, numbers only";   
    inputs[1].parentElement.classList.add('borderError');
    validNumber=0;        
}
    else {   
    errorText[1].innerHTML="";
    inputs[1].parentElement.classList.remove('borderError'); 
}});

// LUHN VALIDATION  from internet
const luhnValidation = num => {  
    let arr = (num + '')
      .split('')
      .reverse()
      .map(x => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
    sum += lastDigit;
    console.log(sum);
    return sum % 10 === 0;
  };
// Valid numbers
  //4444 4444 4444 4444 4
  //4444 4444 4444 4448
  //5555 5555 5555 5557

buttons[0].addEventListener("click", function(){
    if (inputs[1].value==="") {
        errorText[1].innerHTML="Can't be blank!";
        inputs[1].parentElement.classList.add('borderError');
        validNumber=0;  
        if (inputs[1].value!=="") {
            errorText[1].innerHTML=""; 
            inputs[1].parentElement.classList.remove('borderError');      
            }      
    }
    //13 – 19 digits long   
    else if (inputs[1].value.toString().trim().replaceAll(/ /g,'').length<13) {
        errorText[1].innerHTML="Wrong format, should be 13 didgits or longer";
        inputs[1].parentElement.classList.add('borderError');
        validNumber=0;        
    }
    else if (luhnValidation(inputs[1].value.toString().trim().replaceAll(/ /g,''))==false) {
        errorText[1].innerHTML="Not valid card number";
        inputs[1].parentElement.classList.add('borderError');
        validNumber=0;        
    }
    else {validNumber=1;}
});   

buttons[0].addEventListener("click", function(event){ 
    event.preventDefault();
    if (validName===1 && validMonth===1 && validYear===1 && validCVC===1 && validNumber==1) {
section2.style.display="none";
section3.style.display="block";
errorText[0].innerHTML="";
errorText[1].innerHTML="";
errorText[2].innerHTML="";
errorText[3].innerHTML="";
errorText[4].innerHTML="";
    }});
buttons[1].addEventListener("click", function(event){ 
    event.preventDefault();
section2.style.display="block";
section3.style.display="none";
});

