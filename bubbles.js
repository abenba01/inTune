
function addBubble(name, x_start, y_start) {
var canvas = document.getElementById('bubble_cvs');
var ctx = canvas.getContext('2d');
var raf;


canvas.width = window.innerWidth; 

var ball = {
  text: name,
  x: x_start,
  y: y_start,
  vx: 5,
  vy: 2,
  radius: 50,
  color: "#71D1EA",
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    var textSize = (this.radius*2 / this.text.length) *2;
    ctx.fillStyle = "#FDFEFF";
    ctx.font =  textSize + "px Arial";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x, this.y + textSize/4);
  }
};

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  raf = window.requestAnimationFrame(draw);
  ball.vy *= .99;
ball.vy += .25;
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
  ball.vy = -ball.vy;
}
if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
  ball.vx = -ball.vx;
}
}

canvas.addEventListener('mouseover', function(e){
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout",function(e){
  window.cancelAnimationFrame(raf);
});

ball.draw(); 
}

addBubble("hello", 100, 100);