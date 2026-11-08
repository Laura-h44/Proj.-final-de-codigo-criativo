let starsX = [];
let starsY = [];
let starColors = [];
let oscs = [];

let chords = [
  [261.63, 329.63, 392.00], 
  [293.66, 349.23, 440.00], 
  [329.63, 392.00, 493.88], 
  [349.23, 440.00, 523.25], 
  [392.00, 493.88, 587.33], 
  [440.00, 523.25, 659.25], 
  [493.88, 587.33, 698.46]  
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 10, 25);
  
  for (let i = 0; i < 3; i++) {
    oscs[i] = new p5.Oscillator('sine');
    oscs[i].start();
    oscs[i].amp(0);
  }
}

function draw() {
  background(10, 10, 25);
  
  for (let i = 0; i < starsX.length; i++) {
    for (let j = i + 1; j < starsX.length; j++) {
      let distance = dist(starsX[i], starsY[i], starsX[j], starsY[j]);
      
      if (distance < 150) {
        stroke(173, 216, 230, 100);
        strokeWeight(1);
        line(starsX[i], starsY[i], starsX[j], starsY[j]);
      }
    }
  }
  
  for (let i = 0; i < starsX.length; i++) {
    fill(starColors[i]);
    noStroke();
    ellipse(starsX[i], starsY[i], 10, 10);
  }
}

function mousePressed() {
  userStartAudio();

  for (let i = 0; i < 3; i++) {
    oscs[i].amp(0, 0.05);
    
  }

  starsX.push(mouseX);
  starsY.push(mouseY);

  let randomColor = color(random(150, 255), random(150, 255), random(150, 255));
  starColors.push(randomColor);
  
  let chordIndex = floor(map(mouseX, 0, width, 0, chords.length));
  chordIndex = constrain(chordIndex, 0, chords.length - 1);
  let selectedChord = chords[chordIndex];
  
  let octave;
  if (mouseY < height / 3) {
    octave = 1.0;  
  } else if (mouseY > (height / 3) * 2) {
    octave = 1.0;  
  } else {
    octave = 1.0;  
  }
  
  for (let i = 0; i < 3; i++) {
    let finalFrequency = selectedChord[i] * octave;
    oscs[i].freq(finalFrequency);
    oscs[i].amp(0.15, 0.1); 
  }
}
  

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}