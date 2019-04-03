/**
 * Created by Alien on 03.04.2019.
 */
let loaderDiv = document.getElementsByClassName("loader")[0];
let loaderLeaves = document.getElementsByClassName("loader__leaves")[0];



setInterval(function(){
  loaderLeaves.classList.toggle("shadowLeaves");
}, 1000);