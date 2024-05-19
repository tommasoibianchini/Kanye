let confetti = [];
let colors = ['#FF0A0A', '#FF800A', '#FFFF0A', '#0AFF0A', '#0AFFFF', '#0A0AFF', '#FF0AFF'];
let buttonX, buttonY, buttonWidth, buttonHeight;
let rectX, rectY, rectWidth, rectHeight;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    buttonWidth = 200;
    buttonHeight = 100;
    buttonX = windowWidth / 2 - buttonWidth / 2;
    buttonY = windowHeight / 2 - buttonHeight / 2;

    rectWidth = buttonWidth + 40;
    rectHeight = buttonHeight / 2;
    rectX = buttonX - 20;
    rectY = buttonY + buttonHeight + 20;

    noLoop();
}

function draw() {
    clear();
    drawBlackRect(); // Disegna prima il rettangolo nero
    drawButton(); // Poi il rettangolo giallo
    confetti.forEach((c, index) => {
        c.update();
        c.display();
        if (c.y > height) {
            confetti.splice(index, 1);
        }
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    buttonX = windowWidth / 2 - buttonWidth / 2;
    buttonY = windowHeight / 2 - buttonHeight / 2;
    rectX = buttonX - 20;
    rectY = buttonY + buttonHeight + 20;
    redraw();
}

function drawBlackRect() {
    fill('#000');
    rect(buttonX-10, buttonY+10, buttonWidth, buttonHeight, 10);
}

function drawButton() {
    fill('#bde2bb');
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);
    fill('#000');
    textSize(32);
    textAlign(CENTER, CENTER);
    text('GRAZIE!', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}

class Confetto {
    constructor() {
        this.x = random(width);
        this.y = random(-height, 0);
        this.size = random(5, 10);
        this.color = random(colors);
        this.shape = random(['circle', 'square']);
        this.velocity = random(2, 5);
        this.angle = random(TWO_PI);
        this.angleSpeed = random(-0.05, 0.05);
    }

    update() {
        this.y += this.velocity;
        this.angle += this.angleSpeed;
    }

    display() {
        fill(this.color);
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        if (this.shape === 'circle') {
            ellipse(0, 0, this.size, this.size);
        } else if (this.shape === 'square') {
            rectMode(CENTER);
            rect(0, 0, this.size, this.size);
        }
        pop();
    }
}

function mousePressed() {
    if (mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
        addConfetti();
    }
}

function addConfetti() {
    for (let i = 0; i < 100; i++) {
        confetti.push(new Confetto());
    }
    loop();
}
