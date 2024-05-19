let r, g, b;
let rgbText;
let rSlider, gSlider, bSlider;
let rLabel, gLabel, bLabel;

function setup() {
    createCanvas(500, 500);
    generateRandomColor();
    
    // Crea gli slider
    rSlider = createSlider(0, 255, r);
    rSlider.position(20, 20);
    gSlider = createSlider(0, 255, g);
    gSlider.position(20, 50);
    bSlider = createSlider(0, 255, b);
    bSlider.position(20, 80);

    // Crea le etichette per gli slider
    rLabel = createDiv('R');
    rLabel.style('color', '#bde2bb');
    rLabel.style('font-size', '16px');
    rLabel.position(rSlider.x + rSlider.width + 10, 20);

    gLabel = createDiv('G');
    gLabel.style('color', '#bde2bb');
    gLabel.style('font-size', '16px');
    gLabel.position(gSlider.x + gSlider.width + 10, 50);

    bLabel = createDiv('B');
    bLabel.style('color', '#bde2bb');
    bLabel.style('font-size', '16px');
    bLabel.position(bSlider.x + bSlider.width + 10, 80);

    // Crea un elemento HTML per visualizzare i valori RGB
    rgbText = createDiv('');
    rgbText.style('color', '#bde2bb');
    rgbText.style('font-size', '30px');
    rgbText.position(width / 2 - 250, height / 2 + 130);  // Posizionare sotto il quadrato
}

function draw() {
    background(23,23,23);
    
    // Aggiorna i valori RGB dagli slider
    r = rSlider.value();
    g = gSlider.value();
    b = bSlider.value();
    
    // Disegna un quadrato statico
    fill(r, g, b);
    stroke(0);
    rect(0, 150, 200, 200);

    displayRGBValues();
}

function keyPressed() {
    if (key === ' ') {
        generateRandomColor();
        rSlider.value(r);
        gSlider.value(g);
        bSlider.value(b);
    }
}

function generateRandomColor() {
    r = floor(random(256));
    g = floor(random(256));
    b = floor(random(256));
}

function displayRGBValues() {
    // Aggiorna il testo con i valori RGB
    rgbText.html("RGB: (" + r + ", " + g + ", " + b + ")");
}
