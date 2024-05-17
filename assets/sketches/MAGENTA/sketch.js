let slider;

function setup() {
  createCanvas(500, 500);
  noStroke();
  
  // Crea lo slider
  slider = createSlider(5, 300, 100); // Valore minimo, valore massimo, valore iniziale
  slider.position(10,10);
  slider.style('width', '200px');
}

function draw() {
  background(255);

  // Ottieni il valore dello slider
  let gridDensity = slider.value();
  let squareSize = width / gridDensity;

  for (let i = 0; i < gridDensity; i++) {
      for (let j = 0; j < gridDensity; j++) {
          let x = i * squareSize;
          let y = j * squareSize;

          // Alterna i colori tra rosso e blu
          if ((i + j) % 2 == 0) {
              fill(0, 0, 255); // Blu
          } else {
              fill(255, 0, 0); // Rosso
          }

          rect(x, y, squareSize, squareSize);
      }
  }
}
