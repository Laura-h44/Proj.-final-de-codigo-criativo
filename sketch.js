
let starsX = [];
let starsY = [];

let osc;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 10, 25);

  osc = new p5.Oscillator('sine');
  osc.amp(0);
  osc.start();
}

function draw() {
  background(10, 10, 25);

  for (let i = 0; i < starsX.length; i++) {
    for (let j = 0; j < starsX.length; j++) {

       let distance = dist(starsX[i], starsY[i], starsX[j], starsY[j]);

        if (distance < 150) {
        stroke(173, 216, 230, 100);
        strokeWeight(1);
        line(starsX[i], starsY[i], starsX[j], starsY[j]);
      }
    }
  }

  for (let i = 0; i < starsX.length; i++) {
    fill(255);
     noStroke();
    ellipse(starsX[i], starsY[i], 10, 10); // Draws a circle
  }

  fill(255, 150);
  textAlign(CENTER);
  text("Click to create permanent stars", width / 2, 30);
}

function mousePressed() {
   starsX.push(mouseX);
  starsY.push(mouseY);

  let frequency = map(mouseY, height, 0, 200, 800); 
  osc.freq(frequency);

   osc.amp(0.3, 0.05);
  osc.amp(0, 0.3);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
