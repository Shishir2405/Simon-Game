let body = document.querySelector("body");

let main = document.querySelector(".main");

//Intializing two arrays to track about color generated by computer and clicked by user
let gameSeq = [];
let userSeq = [];

//This array is used to track of color which is containing exactly same class value of button
let color = ["red", "yellow", "green", "blue"];

//accessing the start button
let start = document.querySelector(".center");

//We will start game with false value and level will zero
let started = false;
let level = 0;

//Starting the game
let h2 = document.querySelector("h2");
start.addEventListener("click", function () {
  //when user click start button audio will play
  audioStart();
  if (started == false) {
    //change the started value into false when start button will click
    console.log("Game Started");
    started = true;
    //now calling levelUp function to increase level count
    levelUp();
  }
});


//this function created for to start a audio
function audioStart() {
  let audio = document.querySelector(".audioStart");
  setTimeout(() => {
    audio.play();
  }, 150);
}


function compFlash(btn) {
  //creating a flash animation by changing backgroundcolor to white
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 350);
}


function userFlash(btn) {
  //when we click a button to give input it will also blink a animation
  btn.classList.add("userInput");
  setTimeout(function () {
    btn.classList.remove("userInput");
  }, 350);
}


function levelUp() {
  //Now userSeq will be empty
  userSeq = [];
  //Count of level will increases
  level++;
  //And h2 will updated as level number
  h2.innerHTML = `Level Number ${level}`;
  //Generate the Random number which will help us to access the index of color array
  let random = Math.floor(Math.random() * 3);
  //Random Number generated intialize random number as index of color
  let randomColor = color[random];
  //we already store colors and it will help to create a random color
  let randomBtn = document.querySelector(`.${randomColor}`);
  //And we will push color value to gameSeq array which will keep track for sequence of color generated
  gameSeq.push(randomColor);
  console.log(gameSeq);
  //Calling the compFlash function
  compFlash(randomBtn);
}


//this function created for when user click a wrong button
function failed() {
  //the started value which was intialize as true to start game it will return to false
  started = false;
  //gameSeq will become empty
  gameSeq = [];
  //userSeq will also become empty
  userSeq = [];
  //level will become zero
  level = 0;
  //adding a classList to add and animation
  main.classList.add("failedAnimation");
  setTimeout(function () {
    main.classList.remove("failedAnimation");
  }, 500);
}


function checkAns(idx) {
  //if userSeq index is equal to gameSeq than
  if (userSeq[idx] === gameSeq[idx]) {
    //and both of array length are same than
    if (userSeq.length === gameSeq.length) {
      //function will called to increase level
      setTimeout(function () {
        levelUp();
      }, 900);
    }
  }
  //failed by user
  else {
    //score will displayed and game ended
    h2.innerHTML = `<strong>Game Ended !! Your is Score : ${level-1} Congratulation✌️</strong>`;
    //to show error background color will turn into red
    main.style.backgroundColor = "red";
    //after that it will return to white
    setTimeout(function () {
      main.style.backgroundColor = "white";
    }, 800);
    start.innerHTML = `Restart <span class="material-symbols-outlined">replay</span>`;
    //audio for game completion will play
    audioFailed();
    failed();
  }
}


//this function created for audio when user end the game
function audioFailed() {
  let audiofailed = document.querySelector(".audioEnd");
  setTimeout(() => {
    audiofailed.play();
  }, 350);
}


function btnPress() {
  //when user click button
  let btn = this;
  //function will called to change animation
  userFlash(btn);
  //userColor will give id value which is same as color string
  userColor = btn.getAttribute("id");
  //and color of user input will stored in userSeq
  userSeq.push(userColor);
  //add sound when user click
  console.log(userSeq);
  checkAns(userSeq.length - 1);
}


//accessing all button by its id
let btns = document.querySelectorAll(".press");
//for of loop to access all buttons
for (butn of btns) {
  butn.addEventListener("click", btnPress);
}


//To show instruction and remove the content after clicking
let removeBtn = document.querySelector(".remove");
removeBtn.addEventListener("click", function () {
  let removeInstruction = document.querySelector(".instruction");
  removeInstruction.remove();
});

