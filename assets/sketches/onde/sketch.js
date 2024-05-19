function setup() {
  createCanvas(800, 210);
  noLoop();
}

function draw() {
  background(23,23,23);
  let startX = 50;
  let endX = width - 50;
  let spectrumLength = endX - startX;

  for (let x = startX; x <= endX; x++) {
      let wavelength = map(x, startX, endX, 380, 700);
      stroke(wavelengthToColor(wavelength));
      
      line(x, height / 2 - 50, x, height / 2 + 50);
      noStroke();
  }

  fill(160,205,213);
  textAlign(CENTER);
  textSize(16);
  //text("Spettro Visibile: Lunghezze d'Onda in nm", width / 2, height - 20);

  // Indicatori di lunghezza d'onda con offset verticale
  let wavelengths = [380, 450, 495, 570, 590, 620, 700];
  let yOffset = 85; // Offset verticale per evitare sovrapposizioni

  for (let i = 0; i < wavelengths.length; i++) {
      let x = map(wavelengths[i], 380, 700, startX, endX);
      stroke(255);
      line(x, height / 2 + 60, x, height / 2 + 70);
      noStroke();
      text(wavelengths[i] + " nm", x, height / 2 + yOffset + (i % 2) * 15); // Alterna le etichette
  }
}

function wavelengthToColor(wavelength) {
  let R, G, B;
  if (wavelength >= 380 && wavelength <= 440) {
      R = -1 * (wavelength - 440) / (440 - 380);
      G = 0;
      B = 1;
  } else if (wavelength >= 440 && wavelength <= 490) {
      R = 0;
      G = (wavelength - 440) / (490 - 440);
      B = 1;
  } else if (wavelength >= 490 && wavelength <= 510) {
      R = 0;
      G = 1;
      B = -1 * (wavelength - 510) / (510 - 490);
  } else if (wavelength >= 510 && wavelength <= 580) {
      R = (wavelength - 510) / (580 - 510);
      G = 1;
      B = 0;
  } else if (wavelength >= 580 && wavelength <= 645) {
      R = 1;
      G = -1 * (wavelength - 645) / (645 - 580);
      B = 0;
  } else if (wavelength >= 645 && wavelength <= 700) {
      R = 1;
      G = 0;
      B = 0;
  } else {
      R = 0;
      G = 0;
      B = 0;
  }

  // Let the intensity fall off near the vision limits
  let factor = 1.0;
  if (wavelength > 700) {
      factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);
  } else if (wavelength < 380) {
      factor = 0.3 + 0.7 * (wavelength - 320) / (380 - 320);
  }

  let r = Math.round(R * 255 * factor);
  let g = Math.round(G * 255 * factor);
  let b = Math.round(B * 255 * factor);
  return color(r, g, b);
}
