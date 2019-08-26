let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesAmount = 300;
let maxDistance = 150;

context.fillStyle = "#f39c12";
context.strokeStyle = "rgba(241, 196, 15, 1)";
context.lineWidth = 0.5;

let particles = [];

function Particle(posX, posY, radius) {
  // Public props
  this.posX = posX;
  this.posY = posY;
  this.radius = radius;

  // Private props
  let stepX = Math.random() - 0.5;
  let stepY = Math.random() - 0.5;

  // Private methods
  let checkBorders = () => {
    if (this.posX >= canvas.width || this.posX <= 0)
      stepX *= -1;

    if (this.posY <= 0 || this.posY >= canvas.height)
      stepY *= -1;
  };

  // Public methods
  this.refreshCoords = () => {
    checkBorders();

    this.posX += stepX;
    this.posY += stepY;
  }
}

function getDistance(particle_1, particle_2) {
  return Math.sqrt(
    Math.pow(particle_1.posX - particle_2.posX, 2) +
    Math.pow(particle_1.posY - particle_2.posY, 2)
  );
}

function initParticles() {
  for (let i = 0; i < particlesAmount; i++) {
    let dotX = Math.random() * canvas.width;
    let dotY = Math.random() * canvas.height;
    let radius = (Math.random() * 3 + 3);

    particles.push(new Particle(dotX, dotY, radius));
  }
}

function drawParticles() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.refreshCoords();

    context.beginPath();
    context.arc(particle.posX, particle.posY, particle.radius, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  });

  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      let distance = getDistance(particles[i], particles[j]);

      if (distance < maxDistance) {
        let opacity = 1 - distance / maxDistance;

        if (opacity > 0) {
          context.strokeStyle = `rgba(241, 196, 15, ${opacity})`;

          context.beginPath();
          context.moveTo(particles[i].posX, particles[i].posY);
          context.lineTo(particles[j].posX, particles[j].posY);
          context.closePath();
          context.stroke();
        }
      }
    }
  }

  requestAnimationFrame(drawParticles);
}


initParticles();
//
drawParticles();
