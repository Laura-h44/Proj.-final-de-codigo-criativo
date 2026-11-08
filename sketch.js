let starsX = [];
let starsY = [];
let audioCtx;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10, 10, 25);
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
    fill(255);
    noStroke();
    ellipse(starsX[i], starsY[i], 10, 10); 
  }
}

function mousePressed() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  } 

  starsX.push(mouseX);
  starsY.push(mouseY);

  let frequency = map(mouseY, height, 0, 200, 700); 
  playStarSound(frequency);
}


function playStarSound(freq) {
  if (!audioCtx) return;

  let osc = audioCtx.createOscillator();
  let gainNode = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.4);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}