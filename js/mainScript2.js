/**
 * Created by Alien on 18.03.2019.
 */
//document.addEventListener("DOMContentLoaded", init);


//function init() {

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



  camera.position.z = 400;

  let mesh;

  const loader = new THREE.GLTF2Loader();
  loader.load( 'assets/models/scene.gltf', function ( gltf ) {
    mesh = gltf.scene;


    scene.add( mesh);



    mesh.position.set(10, -30, 1);
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
    mesh2.position.y -= 150;
    mesh2.rotation.x = 0.1;
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
    if(controls.object.position.z > 400) {
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
    if( (controls.object.position.z <= 401 && controls.object.position.z >= 398) && (controls.object.position.y <= 4 && controls.object.position.y >= 1) && (controls.object.position.x <=2 && controls.object.position.x >=-1 ) ) {
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
    eva.rotation.y += .01;
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
    eva.rotation.y -= .01;
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
    eva.rotation.y += .01;
    if(eva.rotation.y < 0.2 && eva.rotation.y > -0.2){
      eva.rotation.y = 0;
      window.cancelAnimationFrame(stopLookCenter);
    }

  }

  setTimeout(function() {lookingRight(mesh)},4000 );
  setTimeout(function() {lookingLeft(mesh)}, 6500);
  setTimeout(function() {lookingCenter(mesh)}, 10500);



// CHANGE WIDTH OF THE MAIN MENU
let stopWidth;
function changeWidth(div) {
  //resetControls();
  //window.cancelAnimationFrame(resetControls);
  stopWidth = requestAnimationFrame( function() {changeWidth(main)} );
  div.style.width = parseInt(div.style.width) + 20 + 'px';
  if(parseInt(main.style.width) > 600){
    div.style.width = 600 + 'px';
    window.cancelAnimationFrame(stopWidth);
  }
}

// ROTATE OBJECT TO STRAIGHT POSITION
let stopRotateYX;
function rotateYX(eva) {
  resetControls();
  stopRotateYX = window.requestAnimationFrame(function() {rotateYX(mesh)});
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

  }
}

// CHANGE OBJECT POSITION AND ROTATION AFTER CLICKING MENU BLOCKS, SHOW MAIN  BLOCK
function showMainSection(target) {

  changeWidth(main);
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
  function back() {
    main.style.width = 0;
  }
  buttonback.addEventListener("click", back);
}



menuProfile.addEventListener("click", function (event) {
  let target = event.target;
  console.log(target.parentNode, "parent");
  menu.style.display = "none";
  setTimeout(function() {
    spaceship.classList.toggle("spaceship__animate");
    container.style.left = "40%";
    rotor();

  }, 500);
  setTimeout(function() {
    container.classList.toggle("container__left");
    showMainSection(target);
    setTimeout(rotateYX, 500, mesh);
  }, 2000);
  //showMainSection();

});
menuPortfolio.addEventListener("click", showMainSection);
menuContacts.addEventListener("click", showMainSection);

/*

let stopRotateY;
function rotateY(object) {
  resetControls();
  stopRotateY = window.requestAnimationFrame(function() {rotateY(mesh2)});
  if(object.rotation.z > -  1.5) {
    object.rotation.z -= .05;
    object.rotation.y -= 0.01;
    spaceship.style.height = 600 + "px";
    renderer2.setSize( 600, 600 );
  }



  //window.cancelAnimationFrame(stopRotateY);
}

*/
//rotateY(mesh2);

//spaceship.addEventListener("click", function() {container.classList.toggle("container__left")});
//menu.addEventListener("click", function(){container.style.left = "80%"});
  let id;
  function rotor() {
    resetControls();
    id = requestAnimationFrame( rotor );
    mesh.rotation.z += -.05 ;
    if( mesh.rotation.z <= -1.55) {
      mesh.rotation.z = -1.55;
      mesh.rotation.x += .05 ;
      if( mesh.rotation.x >= 1.3) {
        mesh.rotation.x = 1.3 ;
        mesh.rotation.y += .05;
        if(mesh.rotation.y >= 0.15) {
          mesh.rotation.y = 0.15;
          //mesh.position.y = 1;
          //container.classList.toggle('rotated');
          window.cancelAnimationFrame(id);
          //container.style.position = "relative";
          //container.style.transition = "transform 3s";
          //container.transform = "translate(25, 25)"
        }
      }
    }


    //console.log(mesh.rotation.z, "mesh.rotation.z");



  }
//}


/*
 container.addEventListener("click", rotor);
 var id;
 function rotor(target) {



 mesh.rotation.z += -.05 ;
 mesh.rotation.x += .05 ;
 mesh.rotation.y += .05;
 id = requestAnimationFrame( rotor );
 //console.log(mesh.rotation.z, "mesh.rotation.z");

 if( mesh.rotation.z < -1.55 || mesh.rotation.x > 1.3 && mesh.rotation.y > 0.05) {
 console.log(mesh.rotation.x, "mesh.rotation.x");
 console.log(mesh.rotation.z, "mesh.rotation.z");
 window.cancelAnimationFrame(id);
 temp = 1;
 }

 }


*/