/**
 * Created by Alien on 03.04.2019.
 */
let loaderDiv = document.getElementsByClassName("loader")[0];
let loaderLeaves = document.getElementsByClassName("loader__leaves")[0];



let leavesLoop = setInterval(function(){
  loaderLeaves.classList.toggle("shadowLeaves");
  console.log("1")
}, 1000);

document.addEventListener("DOMContentLoaded", function(event) {
  setTimeout(function() {
    loaderDiv.style.display = "none";
    clearInterval(leavesLoop);
    loaderDiv.remove();
  }, 1000);

});