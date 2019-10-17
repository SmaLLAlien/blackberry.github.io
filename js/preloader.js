/**
 * Created by Alien on 03.04.2019.
 */
//let loaderDiv = document.getElementsByClassName("loader")[0];
//let loaderLeaves = document.getElementsByClassName("loader__leaves")[0];


/*
let leavesLoop = setInterval(function(){
  loaderLeaves.classList.toggle("shadowLeaves");
  console.log("1")
}, 1000);
/*
document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(function() {
    loaderDiv.style.display = "none";
    clearInterval(leavesLoop);
    loaderDiv.remove();
  }, 1000);

});

    */

let loader = document.getElementsByClassName("loader")[0];
let arrTyped = [];
let arrUpText = [];
// hide small text boxes
let typed = loader.getElementsByClassName("loader__typed");
for(let i = 0; i < typed.length; i++) {
  typed[i].style.display = "none";
  arrTyped.push(typed[i]);
}
// get small boxes with text;
let first = loader.getElementsByClassName("typed__first")[0];
let second = loader.getElementsByClassName("typed__second")[0];
let third = loader.getElementsByClassName("typed__third")[0];
let fourth = loader.getElementsByClassName("typed__fourth")[0];

// get array of text blocks upText
let upTextCollection = document.getElementsByClassName("upText");
for(let i = 0; i < upTextCollection.length; i++) {
  upTextCollection[i].style.top = "90%";
  arrUpText.push(upTextCollection[i]);
}


function displaying(block) {
  if(block.style.display == "none") {
    return block.style.display = "block";
  }
  else {
    return block.style.display = "none";
  }
}

let timer = setInterval(function() {
  let rand = Math.floor(Math.random() * 4);
  arrUpText[rand].style.top = "90%";
  displaying(arrTyped[rand]);


  // change position of text block to make text go up
  let stopUpText;
  function up(sometext) {
    stopUpText = requestAnimationFrame( function() {up(arrUpText[rand])} );
    sometext.style.top = parseInt(sometext.style.top) - 7 + '%';
    //console.log(sometext.style.top);
    if(parseInt(sometext.style.top) < -550){
      sometext.style.top = -550 + '%';
      displaying(arrTyped[rand]);
      window.cancelAnimationFrame(stopUpText);
    }
  }

  up(arrUpText[rand]);

}, 1500);

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(function() {
    loader.style.display = "none";
    clearInterval(timer);
    loader.remove();
  }, 5000);

});