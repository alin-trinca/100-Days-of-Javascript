const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;
const particleSettings = {
  count: 250
};

let nearParticles = [];
let middleParticles = [];
let farParticles = [];

// Define requestAnimationFrame for cross-browser compatibility
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

// Random number in given range
function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor(areaValue, alphaValue, vyValue) {
    this.area = areaValue;
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.alpha = alphaValue;
    this.vy = vyValue * 10;
    this.color = `rgb(255,255,255)`;
  }

  draw() {
    this.y += (Math.cos(this.area) + this.vy) * 0.3;
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.area, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.globalAlpha = this.alpha;
    context.closePath();
    context.fill();
    context.restore();
  }
}

function createsnowfall(particles, flag) {
  while (particles.length < particleSettings.count) {
    let particle;
    if (flag == "near") {
      //(area,alpha,vy)
      particle = new Particle(4, 0.9, 0.3);
    } else if (flag == "middle") {
      particle = new Particle(3, 0.5, 0.2);
    } else {
      particle = new Particle(2, 0.3, 0.1);
    }
    particles.push(particle);
  }
}

function startSnowFall() {
  context.fillStyle = "rgb(15,23,42)";
  context.fillRect(0, 0, width, height);
  createsnowfall(nearParticles, "near");
  createsnowfall(farParticles, "far");
  createsnowfall(middleParticles, "middle");
  // Combine all and sort randomly
  let particles = [...nearParticles, ...middleParticles, ...farParticles];
  particles = particles.sort(() => 0.5 - Math.random());
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    if (particles[i].y > height) {
      particles[i].y = Math.random() * height - height;
    }
  }
  window.requestAnimationFrame(startSnowFall);
}

window.onload = () => {
  canvas.width = width;
  canvas.height = height;
  nearParticles = [];
  middleParticles = [];
  farParticles = [];
  window.requestAnimationFrame(startSnowFall);
};
