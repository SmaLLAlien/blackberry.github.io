let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, 300 / 300, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( 300, 300 );

let container = document.getElementById("container");
container.appendChild( renderer.domElement );


// Object controls, turn on object rotation
let controls = new THREE.OrbitControls(camera, renderer.domElement);

 controls.enableDamping = true;
 controls.dampingFactor = 0.25;
 controls.enableZoom = false;

// LIGHTS
let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

let backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);



camera.position.z = 200;

// LOADING MODEL

let mtlLoader = new THREE.MTLLoader();
//mtlLoader.setTexturePath();
mtlLoader.setPath('assets/models/');
mtlLoader.load('evaWithHands.mtl', function (materials) {

  materials.preload();

  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('assets/models/');
  objLoader.load('evaWithHands.obj', function (object) {

    scene.add(object);
    object.position.y -= 60;
  });

});

let mouseX = 0, mouseY = 0;

let windowHalfX = 300 / 2;
let windowHalfY = 300 / 2;

function animate() {
  requestAnimationFrame( animate );
  render();
  renderer.render( scene, camera );
}
animate();



container.addEventListener( 'mousemove', onDocumentMouseMove, false );
function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) / 2;
  mouseY = ( event.clientY - windowHalfY ) / 2;

}

function render() {
  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY - camera.position.y ) * .05;

  camera.lookAt( scene.position );

  renderer.render( scene, camera );
}