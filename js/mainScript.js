let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, 300 / 300, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( 300, 310 );

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



camera.position.z = 150;

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
    object.position.y -= 0;
  });

});



function animate() {
  requestAnimationFrame( animate );

  renderer.render( scene, camera );
}
animate();


