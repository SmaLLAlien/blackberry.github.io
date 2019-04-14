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

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls.enableZoom = true;
  controls.autoRotate = false;
  let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
  keyLight.position.set(-300, 0, 300);

  let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
  fillLight.position.set(300, 0, 300);

  let backLight = new THREE.DirectionalLight(0xffffff, 1.0);
  backLight.position.set(300, 0, -300).normalize();

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
    console.log(mesh.rotation);
  } );



  function animate() {
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );


    //render();
    //container.addEventListener("click", rotor, false);

  }
  animate();


// ***************************************************************************************************************
// WORKING WITH DOM

container.classList.toggle("container__animate");


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
    else {
      return  elem.style.opacity = 0;
    }
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
  div.style.width = parseInt(div.style.width) + 50 + 'px';
  if(parseInt(main.style.width) > 600){
    div.style.width = 600 + 'px';
    window.cancelAnimationFrame(stopWidth);
  }
}


let main = document.getElementsByClassName("main")[0];
main.style.width = 0;

let profile = main.getElementsByClassName("profile")[0];
let menuProfile = document.getElementsByClassName("menu__link")[0];


menuProfile.addEventListener("click",function () {
  changeWidth(main);
  container.style.left = "80%";
});
//menu.addEventListener("click", rotor);
//menu.addEventListener("click", function(){container.style.left = "80%"});
  let id;
  function rotor(e) {
    controls.object.position.z = 400;
    controls.object.position.x = 0;
    controls.object.position.y = 2.45;
    //mesh.rotation.set(0.2, 0, 0);
    mesh.rotation.z += -.05 ;
    if( mesh.rotation.z <= -1.55) {
      mesh.rotation.z = -1.55;
      mesh.rotation.x += .05 ;
      if( mesh.rotation.x >= 1.3) {
        mesh.rotation.x = 1.3 ;
        mesh.rotation.y += .05;
        if(mesh.rotation.y >= 0.15) {
          mesh.rotation.y = 0.15;
          //container.classList.toggle('rotated');
          window.cancelAnimationFrame(id);
          //container.style.position = "relative";
          //container.style.transition = "transform 3s";
          //container.transform = "translate(25, 25)"
        }
      }
    }

    id = requestAnimationFrame( rotor );
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



// написать анимацию выхода блока с обьектом на экран

// написать функцию анимации поворота на блоки меню во время первого появления

// написать анимацию вращения


// создать блок с фотками.



 /*
 container.addEventListener("click", rotor);
 function rotor(target) {
 mesh.rotation.z = -1;
 mesh.rotation.x = 1;
 //mesh.rotation.x = 180 * 180 / 3.14;
 }

 */
/*
 function render() {
 if(controls.object.position.x !==0) {
 if(controls.object.position.x > 0 ) {
 while(controls.object.position.x > 0) {
 controls.object.position.x -= 0.1;
 }
 }
 else {
 while(controls.object.position.x < 0) {
 controls.object.position.y += 0.1;
 }
 }


 }
 if(controls.object.position.y !== 2.45) {
 if(controls.object.position.y > 2.45 ) {
 while(controls.object.position.y > 2.45) {
 controls.object.position.y -= 0.1;
 }
 }
 else {
 while(controls.object.position.y < 2.45) {
 controls.object.position.y += 0.1;
 }
 }
 }
 if(controls.object.position.z !==350) {
 if(controls.object.position.z > 350 ) {
 while(controls.object.position.z > 350) {
 controls.object.position.z -= 0.1;
 }

 }
 else {
 while(controls.object.position.z < 350) {
 controls.object.position.z += 0.1;
 }
 }
 }
 }
 */











 window.addEventListener( "click", onDocumentMouseMove, false );



 var selectedObject = null;
 function onDocumentMouseMove( event ) {

 event.preventDefault();
 if ( selectedObject ) {

 selectedObject.position.set(  5, 5, 3 );
 selectedObject = null;

 }

 var intersects = getIntersects( event.layerX, event.layerY );
 if ( intersects.length > 0 ) {

 var res = intersects.filter( function ( res ) {

 return res && res.object;

 } )[ 0 ];

 if ( res && res.object ) {

 selectedObject = res.object;
 selectedObject.rotation.z += 10;

 }

 }

 }
 var raycaster = new THREE.Raycaster();
 var mouseVector = new THREE.Vector3();

 function getIntersects( x, y ) {

 x = ( x / window.innerWidth ) * 2 - 1;
 y = - ( y / window.innerHeight ) * 2 + 1;

 mouseVector.set( x, y, 0.5 );
 raycaster.setFromCamera( mouseVector, camera );

 return raycaster.intersectObject( mesh, true );

 }
 /*
 https://www.pericror.com/software/creating-3d-objects-with-click-handlers-using-three-js/
 https://github.com/mrdoob/three.js/blob/3510fdd91725f7681db845efd889c5e29e6e7446/examples/webgl_loader_obj_mtl.html

 three.js/examples/webgl_loader_obj_mtl.html IN CLONED

 http://jeromeetienne.github.io/threex.domevents/examples/demo.html    SOME DEMO

 var scene = new THREE.Scene();

 var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
 camera.position.z = 300;

 var renderer = new THREE.WebGLRenderer();
 renderer.setSize( window.innerWidth, window.innerHeight );
 document.body.appendChild( renderer.domElement );

 var controls = new THREE.OrbitControls(camera, renderer.domElement);
 controls.enableDamping = true;
 controls.dampingFactor = 0.25;
 controls.enableZoom = true;

 var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
 keyLight.position.set(-100, 0, 100);

 var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
 fillLight.position.set(100, 0, 100);

 var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
 backLight.position.set(100, 0, -100).normalize();

 scene.add(keyLight);
 scene.add(fillLight);
 scene.add(backLight);

 var mtlLoader = new THREE.MTLLoader();
 mtlLoader.setTexturePath('assets/');
 mtlLoader.setPath('assets/');
 mtlLoader.load('IronMan.mtl', function (materials) {

 materials.preload();

 var objLoader = new THREE.OBJLoader();
 objLoader.setMaterials(materials);
 objLoader.setPath('assets/');
 objLoader.load('IronMan.obj', function (object) {

 scene.add(object);
 object.position.y -= 60;

 });

 });

 var animate = function () {
 requestAnimationFrame( animate );
 controls.update();
 renderer.render(scene, camera);
 };

 animate();
 /*
 var scene = new THREE.Scene();
 var camera = new THREE.PerspectiveCamera( 75, 1920 / 1080, 0.1, 1000 );

 var renderer = new THREE.WebGLRenderer();
 renderer.setSize( 1920, 1080 );

 let container = document.getElementById("container");
 container.appendChild( renderer.domElement );

 var geometry = new THREE.BoxGeometry( 1, 1, 1 );
 var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
 var cube = new THREE.Mesh( geometry, material );
 scene.add( cube );

 camera.position.z = 25;

 var mtlLoader = new THREE.MTLLoader();
 mtlLoader.setTexturePath('/assets/');
 mtlLoader.setPath('/assets/');
 mtlLoader.load('IronMan.mtl', function (materials) {

 materials.preload();

 var objLoader = new THREE.OBJLoader();
 objLoader.setMaterials(materials);
 objLoader.setPath('/assets/');
 objLoader.load('IronMan.obj', function (object) {

 scene.add(object);
 object.position.y -= 60;

 });

 });



 function animate() {
 requestAnimationFrame( animate );
 cube.rotation.x += 0.01;
 cube.rotation.y += 0.01;
 renderer.render( scene, camera );
 }
 animate();
 /*
 addEventListener("click",disp);
 function disp() {
 let body = document.getElementsByTagName("body");
 let container = document.getElementById("container");
 if(container.style.display == "none"){
 container.style.display = "block"
 }
 else {
 container.style.display = "none"
 }

 }
 */