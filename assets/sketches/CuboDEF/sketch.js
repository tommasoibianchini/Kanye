let cubes = [];
let cam;
let angleX = 0;
let angleY = 0;
let lastMouseX;
let lastMouseY;
let camSlider;
let spacingSlider;

function setup() {
  createCanvas(500, 500, WEBGL);
  cam = createCamera();
  cam.setPosition(0, 0, 800);
  cam.lookAt(0, 0, 0); 
  perspective(PI / 3.0, width / height, 0.1, 10000);

 
  camSlider = createSlider(200, 1600, 800, 10);
  camSlider.position(10, 10);
  camSlider.style('width', '200px');

 
  spacingSlider = createSlider(40, 100, 50, 1);
  spacingSlider.position(10, 40);
  spacingSlider.style('width', '200px');

  createCubes();
}

function createCubes() {
  cubes = [];
  noStroke()
  let numCubesPerRow = 10;
  let spacing = spacingSlider.value();
  let halfGridSize = (numCubesPerRow - 1) * spacing / 2;

  for (let x = 0; x < numCubesPerRow; x++) {
    for (let y = 0; y < numCubesPerRow; y++) {
      for (let z = 0; z < numCubesPerRow; z++) {
        let r = map(x, 0, numCubesPerRow - 1, 0, 255);
        let g = map(y, 0, numCubesPerRow - 1, 0, 255);
        let b = map(z, 0, numCubesPerRow - 1, 0, 255);
        let cube = new Cube(
          x * spacing - halfGridSize, 
          y * spacing - halfGridSize, 
          z * spacing - halfGridSize, 
          40, 
          color(r, g, b)
        );
        cubes.push(cube);
      }
    }
  }
}

function draw() {
  background(40,36,65);
  orbitControl();
  cam.setPosition(0, 0, camSlider.value()); 
  cam.lookAt(0, 0, 0); 

  if (spacingSlider.value() !== cubes[0].spacing) {
    createCubes();
  }

  rotateX(angleX);
  rotateY(angleY);
  for (let cube of cubes) {
    cube.display();
  }
}

class Cube {
  constructor(x, y, z, s, c) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = s;
    this.c = c;
    this.spacing = spacingSlider.value(); 
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    fill(this.c);
    box(this.s);
    pop();
  }
}

function mousePressed() {
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function mouseDragged() {
  let dx = mouseX - lastMouseX;
  let dy = mouseY - lastMouseY;
  angleX += dy * 0.01; 
  angleY += dx * 0.01;  
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}
