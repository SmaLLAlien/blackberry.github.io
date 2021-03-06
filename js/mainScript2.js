/*
 * Created by Alien on 18.03.2019.
 */


document.addEventListener("DOMContentLoaded", setTimeout(init, 5000));


function init() {

  let scene = new THREE.Scene();


//scene.background = new THREE.Color( 0xffffff );
  let camera = new THREE.PerspectiveCamera( 75, 300 / 300, 0.1, 1000 );

  let renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize( 300, 300 );

  let container = document.getElementById("container");
  container.appendChild( renderer.domElement );


let scene2 = new THREE.Scene();                                   //________________________________
let renderer2 = new THREE.WebGLRenderer({ alpha: true });             //________________________________
renderer2.setSize( 600, 400 );                                         //________________________________
let spaceship = document.getElementById("spaceship");                 //________________________________
spaceship.appendChild( renderer2.domElement );                        //________________________________
let camera2 = new THREE.PerspectiveCamera( 75, 600 / 400, 0.1, 3000 ); //________________________________
let controls2 = new THREE.OrbitControls(camera2, renderer2.domElement);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls.enableZoom = true;
  controls.autoRotate = false;
  let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
  keyLight.position.set(-300, 0, 300);

  let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
  fillLight.position.set(300, 0, 300);

  let backLight = new THREE.DirectionalLight(0xffffff, 1.0);
  backLight.position.set(300, 0, -300).normalize();



let keyLight2 = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0); //________________________________
keyLight2.position.set(-300, 0, 300); //________________________________

let fillLight2 = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75); //________________________________
fillLight2.position.set(300, 0, 300); //________________________________

let backLight2 = new THREE.DirectionalLight(0xffffff, 1.0); //________________________________
backLight2.position.set(300, 0, -300).normalize(); //________________________________
scene2.add(keyLight2); //________________________________
scene2.add(fillLight2); //________________________________
scene2.add(backLight2); //________________________________

camera2.position.z = 2000;
  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(backLight);



  camera.position.z = 425;

  let mesh;

  const loader = new THREE.GLTF2Loader();
  loader.load( 'assets/models/scene.gltf', function ( gltf ) {
    mesh = gltf.scene;


    scene.add( mesh);



    mesh.position.set(10, -50, 1);
    mesh.rotation.set(0.2, 0, 0);
  } );

let mesh2;
let mtlLoader = new THREE.MTLLoader();
//mtlLoader.setTexturePath();
mtlLoader.setPath('assets/models/');
mtlLoader.load('3d-model.mtl', function (materials) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('assets/models/');
  objLoader.load('3d-model.obj', function (object) {
    mesh2 = object;
    scene2.add(mesh2);
    mesh2.position.y = 80;
    mesh2.rotation.x = 0.2;
  });

});



function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );

    renderer2.render( scene2, camera2 );
    //render();
    //container.addEventListener("click", rotor, false);

  }
  animate();


// ***************************************************************************************************************
// WORKING WITH DOM

container.classList.toggle("container__animate");
spaceship.classList.toggle("spaceship__appearance");
let main = document.getElementsByClassName("main")[0];
main.style.width = 0;

let buttonback = document.getElementsByClassName("buttonback")[0];
let profile = main.getElementsByClassName("profile")[0];
let portfolio = main.getElementsByClassName("portfolio")[0];
let contacts = main.getElementsByClassName("contacts")[0];
//let shoutbox = main.getElementsByClassName("shoutbox")[0];
let menuProfile = document.getElementsByClassName("menu__link")[0];
let menuPortfolio = document.getElementsByClassName("menu__link")[1];
let menuContacts = document.getElementsByClassName("menu__link")[2];
//let menuShoutbox = document.getElementsByClassName("menu__link")[3];

// get menu block
  let menu = document.getElementsByClassName("menu")[0];
  let menuChildren = [];
  if(menu.children) {
    for(let i = 0; i < menu.children.length; i++) {
      menuChildren[i] = menu.children[i];
      menuChildren[i].style.opacity = 0;
    }
  }

// check opacity of menu blocks and change it
  function checkOpacity(elem){
    if(elem.style.opacity == 0) {
      return  elem.style.opacity = 1;
    }
    //else {
      return  elem.style.opacity = 0;
    //}
  }

// call change opacity with interval
  function blink(elem) {
    let t = setInterval(checkOpacity, 50, elem);
    setTimeout(function(){clearInterval(t)}, 1000);
    setTimeout(function(){elem.style.opacity = 1},1050);
  }

  // CHECK IF USER CHANGE POSITION OBJECT AND RESET IT TO DEFOULT
  let stopReset;
  //blink(menuChildren[0]);
  function resetControls() {
    stopReset =  requestAnimationFrame( resetControls );
    if(controls.object.position.z > 425) {
      controls.object.position.z -= 1;
      if(controls.object.position.x > 0){
        controls.object.position.x -= 1;
        if(controls.object.position.y > 2.45) {
          controls.object.position.y -= 2.45
        }
        else {
          controls.object.position.y += 2.45
        }
      }
      else {
        controls.object.position.x += 1;
        if(controls.object.position.y < 2.45) {
          controls.object.position.y += 1
        }
        else {
          controls.object.position.y -= 1
        }
      }

    }
    else  {
      controls.object.position.z += 1;
      if(controls.object.position.x > 0){
        controls.object.position.x -= 1;
        if(controls.object.position.y > 2.45) {
          controls.object.position.y -= 1
        }
        else {
          controls.object.position.y += 1
        }
      }
      else {
        controls.object.position.x += 1;
        if(controls.object.position.y < 2.45) {
          controls.object.position.y += 1
        }
        else {
          controls.object.position.y -= 1
        }
      }
    }
    if( (controls.object.position.z <= 427 && controls.object.position.z >= 424) && (controls.object.position.y <= 4 && controls.object.position.y >= 1) && (controls.object.position.x <=2 && controls.object.position.x >=-1 ) ) {
      //console.log("1");
      window.cancelAnimationFrame(stopReset);

    }

  }

// ROTATE OBJECT TO MENU BLOCKS
//ROTATE RIGHT
  let stopLookRight;
  function lookingRight(eva) {
    resetControls();
    //window.cancelAnimationFrame(resetControls);
    stopLookRight = requestAnimationFrame( function() {lookingRight(mesh)} );
    eva.rotation.y += .03;
    if(eva.rotation.y > 0.6){
      eva.rotation.y = 0.6;
      blink(menuChildren[1]);
      window.cancelAnimationFrame(stopLookRight);
    }
  }


//ROTATE LEFT
  let stopLookLeft;
  function lookingLeft(eva) {
    resetControls();
    stopLookLeft = requestAnimationFrame( function() {lookingLeft(mesh)} );
    eva.rotation.y -= .03;
    if(eva.rotation.y < -0.6){
      eva.rotation.y = -0.6;
      blink(menuChildren[0]);
      window.cancelAnimationFrame(stopLookLeft);
    }

  }

//ROTATE TO CENTER
  let stopLookCenter;
  function lookingCenter(eva) {
    resetControls();
    stopLookCenter = requestAnimationFrame( function() {lookingCenter(mesh)} );
    eva.rotation.y += .03;
    if(eva.rotation.y < 0.2 && eva.rotation.y > -0.2){
      eva.rotation.y = 0;
      window.cancelAnimationFrame(stopLookCenter);
    }

  }

  setTimeout(function() {lookingRight(mesh)},3000 ); //4000
  setTimeout(function() {lookingLeft(mesh)}, 4500); //6000
  setTimeout(function() {lookingCenter(mesh)}, 6500); //10500



// CHANGE WIDTH OF THE MAIN MENU
let stopWidth;
function changeWidth(div) {
  //resetControls();
  //window.cancelAnimationFrame(resetControls);
  stopWidth = requestAnimationFrame( function() {changeWidth(main)} );
  div.style.width = parseInt(div.style.width) + 18 + 'px';
  if(parseInt(main.style.width) > 600){
    div.style.width = 600 + 'px';
    window.cancelAnimationFrame(stopWidth);
  }
}

// ROTATE OBJECT TO STRAIGHT POSITION
let stopStandUp;

function standUp(eva) {
  let counter = 0;
  resetControls();
  stopStandUp = window.requestAnimationFrame(function() {standUp(mesh)});
  if(eva.rotation.z > 0) {
    eva.rotation.z = 0;
    counter++;
  }
  if(eva.rotation.x < 0.2) {
    eva.rotation.x = 0.2;
    counter++;
  }
  if( eva.rotation.y < 0) {
    eva.rotation.y = 0;
    counter++;
  }
  eva.rotation.z += 0.05;
  eva.rotation.x -= 0.05;
  eva.rotation.y -= 0.05;

  if( counter >= 3){
    window.cancelAnimationFrame(stopStandUp);
  }
  /*
  eva.rotation.z += 0.05;
  if(eva.rotation.z > 0) {
    eva.rotation.z = 0;
    eva.rotation.x -= 0.05;
    if(eva.rotation.x < 0.2) {
      eva.rotation.x = 0.2;
      eva.rotation.y -= 0.05;
      if( eva.rotation.y < 0) {
        eva.rotation.y = 0;
        window.cancelAnimationFrame(stopRotateYX);
      }

    }

  } */
}

// CHANGE OBJECT POSITION AND ROTATION AFTER CLICKING MENU BLOCKS, SHOW MAIN  BLOCK
function showMainSection(target) {

  //changeWidth(main);
  //container.style.left = "75%";
  let buttonback;
  //let target = event.target;
  console.log(target.parentNode, "parent");
  if(target.parentNode == menuProfile) {
    profile.style.display = "flex";
    portfolio.style.display = "none";
    contacts.style.display = "none";
    //shoutbox.style.display = "none";
    buttonback = document.getElementsByClassName("buttonback")[0];
  }
  if(target.parentNode == menuPortfolio) {
    profile.style.display = "none";
    portfolio.style.display = "flex";
    contacts.style.display = "none";
    //shoutbox.style.display = "none";
    buttonback = document.getElementsByClassName("buttonback")[1];
  }
  if(target.parentNode == menuContacts) {
    profile.style.display = "none";
    portfolio.style.display = "none";
    contacts.style.display = "flex";
    //shoutbox.style.display = "none";
    buttonback = document.getElementsByClassName("buttonback")[2];
  }
/*
  if(event.target == shoutbox) {
    profile.style.display = "none";
    portfolio.style.display = "none";
    contacts.style.display = "none";
    //shoutbox.style.display = "flex";
    console.log(4);
  }
  */
  changeWidth(main);

// BACK CONTAINER AND SPACESHIP POSITION, SHOW MENU NAVIGATION, CLOSE MAIN MENU
  function back() {
    main.style.width = 0;
    spaceship.classList.remove("spaceship__right");
    spaceship.classList.add("spaceship__down");

    container.classList.remove("container__left");
    container.classList.add("container__previous");
    toLookStraight(mesh);
    setTimeout(function(){
      menu.style.display = "flex";
      blink(menuChildren[1]);
      blink(menuChildren[0]);
    }, 1000)
  }
  buttonback.addEventListener("click", back);
}

// SHOW MAIN MENU, CHANHE CONTAINER AND SPACESHIP POSITION, HIDE MENU NAVIGATION
function openMainMenu(event) {
  let target = event.target;
  console.log(target.parentNode, "parent");
  menu.style.display = "none";
  setTimeout(function() {
    spaceship.classList.remove("spaceship__appearance");
    spaceship.classList.remove("spaceship__down");
    spaceship.classList.add("spaceship__right");
    container.style.left = "44%";
    layDown(mesh);

  }, 500);
  /*
  setTimeout(function () {
    container.style.left = "40%";
    layDown(mesh);
  }, 1000);
  */

  setTimeout(function() {

    container.classList.remove("container__animate");
    container.classList.remove("container__previous");
    container.classList.add("container__left");
    container.style.left = "50%";
    showMainSection(target);
    setTimeout(standUp, 500, mesh);
  }, 1500);
}

menuProfile.addEventListener("click", openMainMenu);
menuPortfolio.addEventListener("click", openMainMenu);
menuContacts.addEventListener("click", openMainMenu);

// ROTATE OBJECT TO LAY DOWN POSITION
  let stopLayDown;
  function layDown(eva) {
    let counter = 0;

    resetControls();
    stopLayDown = requestAnimationFrame( function() {layDown(mesh)} );
    if( eva.rotation.z <= -1.55) {
      eva.rotation.z = -1.55;
      counter++;
    }
    if( eva.rotation.x >= 1.2) {
      eva.rotation.x = 1.2;
      counter++;
    }
    if(eva.rotation.y >= 0.15) {
      eva.rotation.y = 0.15;
      counter++;
    }
    if(counter >= 3) {
      window.cancelAnimationFrame(stopLayDown);
    }
    eva.rotation.z += -.05 ;
    eva.rotation.y += .05;
    eva.rotation.x += .05 ;
    /*
    eva.rotation.z += -.05 ;
    if( eva.rotation.z <= -1.55) {
      eva.rotation.z = -1.55;
      eva.rotation.x += .05 ;
      if( eva.rotation.x >= 1.3) {
        eva.rotation.x = 1.3 ;
        eva.rotation.y += .05;
        if(eva.rotation.y >= 0.15) {
          eva.rotation.y = 0.15;
          //mesh.position.y = 1;
          //container.classList.toggle('rotated');
          window.cancelAnimationFrame(stopLayDown);
          //container.style.position = "relative";
          //container.style.transition = "transform 3s";
          //container.transform = "translate(25, 25)"
        }
      }
    } */


    //console.log(mesh.rotation.z, "mesh.rotation.z");



  }
  function toLookStraight(eva) {
    resetControls();
    eva.rotation.set(0.2, 0, 0);
  }
  const imageContainer = document.querySelector(".portfolio__info .info");
  imageContainer.addEventListener('click', increaseImg);
  function increaseImg(event) {
    const container = document.getElementById("container");
    container.style.visibility = 'hidden';
    const cover = document.querySelector(".cover");
    cover.style.visibility = 'hidden';
    const div = document.createElement("div");
    div.style.position = "absolute";
    // div.style.width = '0px';
    const img = document.createElement("img");
    // div.style.transition = 'all 1s ease-out';
    div.style.width = '800px';
    img.style.width = '0%';
    img.style.height = 'auto';


    img.setAttribute('src', `${event.target.getAttribute("src")}`) ;
    div.appendChild(img);
    div.style.zIndex = "10000";

    const wrapper = document.querySelector(".wrapper");
    wrapper.appendChild(div);
    // img.style.transition = 'all 1s ease-out';
    // img.classList.add('cg');
    // img.style.transform = 'scale(0.5)';
    const bodyBack = document.querySelector(".background");
    bodyBack.style.filter = 'blur(10px)';
    showImg(img);
    // const body = document.getElementsByTagName("body")[0];
    div.addEventListener('click', reduceImg);

  }

  function reduceImg (event) {
    const bodyBack = document.querySelector(".background");
    bodyBack.style.filter = 'blur(0px)';
    const container = document.getElementById("container");
    container.style.visibility = 'visible';
    const cover = document.querySelector(".cover");
    cover.style.visibility = 'visible';
    event.target.parentElement.remove();
    event.target.parentElement.removeEventListener('click', reduceImg)
  }

  function showImg(img) {
    let stopGrow = requestAnimationFrame( function () {
      showImg(img);
    } );
    img.style.width = parseInt(img.style.width) + 2 + '%';
    if(parseInt(img.style.width) >= 100) {
      window.cancelAnimationFrame(stopGrow);
    }
  }
} // init


