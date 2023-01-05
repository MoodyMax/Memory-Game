const gameContainer = document.getElementById("game");
const section = document.getElementById("btn-section");
let timer = document.createElement('div');
const minute = document.createElement('span');
minute.setAttribute('id', 'minute');
const space = document.createElement('span');
space.setAttribute('id', 'space');
space.innerText = ":";
const second = document.createElement('span');
second.setAttribute('id', 'second');
let minuteValue = 0;
let secondValue = 0;
let millisecondValue = 0;
let cron;

let opened = [];
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;
// Click counter to limit after two clicks
var counter = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "yellow"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
//THREE FUNCTIONS BELOW REALTED TO TIMER
function start() {
  cron = setInterval(() => { gameTimer(); }, 10);
}
function gameTimer() {
  if ((millisecondValue += 10) == 1000) {
    millisecondValue = 0;
    secondValue++;
  }
  if (secondValue == 60) {
    secondValue = 0;
    minuteValue++;
  }
  if (minuteValue == 60) {
    minuteValue = 0;
  }
  // document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minuteValue);
  document.getElementById('second').innerText = returnData(secondValue);
  // document.getElementById('millisecond').innerText = returnData(millisecond);
}
function returnData(input) {
  return input >= 10 ? input : `0${input}`
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    // newDiv.addEventListener("click", function(event){
    //   console.log("you just clicked", event.target);
    //   if(gameStart && counter < 2){
    //   event.target.style.backgroundColor = color;
    //   counter++
    //   }
    //   if(counter === 2){
    //     // match();
    //     counter = 0;
    //   }
    // });
    gameContainer.append(newDiv);
  }
}
// let gameStart = false;
// TODO: Implement this function!
  // you can use event.target to see which element was clicked
  function handleCardClick(event) {
    // console.log("you just clicked", event.target);
    // event.target.style.backgroundColor(color);
    if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;

    if (gif1 === gif2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("game over!");
  }
  

section.addEventListener('click',function(event){
  //create timer
  //remove button
  if(event.target.tagName === "BUTTON"){
    console.log('you clicked the button');
    event.target.remove();
    timer.classList.add('timer');
    timer.appendChild(minute);
    timer.appendChild(space);
    timer.appendChild(second);
    // timer.innerText = "Hi";
    start();
    section.appendChild(timer);
    
  }
  //set gameStart to true so that the div event target can work
  gameStart = true;
})
createDivsForColors(shuffledColors);
