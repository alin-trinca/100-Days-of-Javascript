const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const paddleWidth = 20,
  paddleHeight = 150,
  paddleSpeed = 9,
  ballRadius = 12,
  initialBallSpeed = 9,
  maxBallSpeed = 50,
  netWidth = 5,
  netColor = "#b9e0f2";

const particlesArray = [];

function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(canvas.width / 2 - netWidth / 2, i, netWidth, 10, netColor);
  }
}

function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}

function drawText(
  text,
  x,
  y,
  color,
  fontSize = 50,
  fontWeight = "700",
  font = "Mulish"
) {
  context.fillStyle = color;
  context.font = `${fontWeight} ${fontSize}px ${font}`;
  context.textAlign = "center";
  context.fillText(text, x, y);
}

function createPaddle(x, y, width, height, color) {
  return { x, y, width, height, color, score: 0 };
}

function createBall(x, y, radius, velocityX, velocityY, color) {
  return { x, y, radius, velocityX, velocityY, color, speed: initialBallSpeed };
}

const user = createPaddle(
  0,
  canvas.height / 2 - paddleHeight / 2,
  paddleWidth,
  paddleHeight,
  "#b9e0f2"
);

const com = createPaddle(
  canvas.width - paddleWidth,
  canvas.height / 2 - paddleHeight / 2,
  paddleWidth,
  paddleHeight,
  "#b9e0f2"
);

const ball = createBall(
  canvas.width / 2,
  canvas.height / 2,
  ballRadius,
  initialBallSpeed,
  initialBallSpeed,
  "#b9e0f2"
);

canvas.addEventListener("mousemove", movePaddle);

function movePaddle(event) {
  const rect = canvas.getBoundingClientRect();
  user.y = event.clientY - rect.top - user.height / 2;
}

function createParticles(x, y, color) {
  const particles = [];

  for (let i = 0; i < 10; i++) {
    particles.push({
      x,
      y,
      color,
      radius: Math.random() * 3 + 2,
      velocityX: Math.random() * 2 - 1,
      velocityY: Math.random() * 2 - 1,
      alpha: 1
    });
  }

  return particles;
}

function collision(b, p) {
  if (
    b.x + b.radius > p.x &&
    b.x - b.radius < p.x + p.width &&
    b.y + b.radius > p.y &&
    b.y - b.radius < p.y + p.height
  ) {
    const particles = createParticles(b.x, b.y, p.color);
    particlesArray.push(...particles);

    const collidePoint = b.y - (p.y + p.height / 2);
    const collisionAngle = (Math.PI / 4) * (collidePoint / (p.height / 2));
    const direction = b.x + b.radius < canvas.width / 2 ? 1 : -1;
    b.velocityX = direction * b.speed * Math.cos(collisionAngle);
    b.velocityY = b.speed * Math.sin(collisionAngle);

    b.speed += 0.2;
    if (b.speed > maxBallSpeed) {
      b.speed = maxBallSpeed;
    }
  }
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = Math.random() * (canvas.height - ball.radius * 2) + ball.radius;
  ball.velocityX = -ball.velocityX;
  ball.speed = initialBallSpeed;
}

function update() {
  if (ball.x - ball.radius < 0) {
    com.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    resetBall();
  }

  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.velocityY = -ball.velocityY;
  }

  let player = ball.x + ball.radius < canvas.width / 2 ? user : com;
  if (collision(ball, player)) {
    const particles = createParticles(ball.x, ball.y, player.color);
    particlesArray.push(...particles);

    const collidePoint = ball.y - (player.y + player.height / 2);
    const collisionAngle = (Math.PI / 4) * (collidePoint / (player.height / 2));
    const direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(collisionAngle);
    ball.velocityY = ball.speed * Math.sin(collisionAngle);

    ball.speed += 0.2;
    if (ball.speed > maxBallSpeed) {
      ball.speed = maxBallSpeed;
    }
  }

  particlesArray.forEach((particle, index) => {
    particle.x += particle.velocityX;
    particle.y += particle.velocityY;
    particle.alpha -= 0.02;

    if (particle.alpha <= 0) {
      particlesArray.splice(index, 1);
    }
  });
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "#0f172a");
  drawNet();

  drawText(
    user.score,
    canvas.width / 4,
    canvas.height / 2,
    "#0ea5ea",
    100,
    "700"
  );
  drawText(
    com.score,
    (3 * canvas.width) / 4,
    canvas.height / 2,
    "#0ea5ea",
    100,
    "700"
  );

  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(com.x, com.y, com.width, com.height, com.color);

  drawCircle(ball.x, ball.y, ball.radius, ball.color);

  particlesArray.forEach((particle) => {
    context.save();
    context.globalAlpha = particle.alpha;
    drawCircle(particle.x, particle.y, particle.radius, particle.color);
    context.restore();
  });
}

function gameLoop() {
  update();
  render();
}

const framePerSec = 60;
setInterval(gameLoop, 1000 / framePerSec);