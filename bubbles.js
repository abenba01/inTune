
var canvas = document.getElementById('bubble_cvs');
canvas.width = window.innerWidth; 
var ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
var raf;
var bubbles = new Object;

var band_names = [
"Nickleback", "The Strokes", "The Killers", "Father John Misty", "Future", 
"Drake", "Fetty Wap", "Sun Kil Moon", "MGMT", "One Direction", "Miley Cyrus", 
"The Weeknd", "Adele"
];

var num_of_bubbles = band_names.length;


function addBubble(name, x_start, y_start) {
	var ball = {
	text: name,
	x: x_start,
	y: y_start,
	vx: getRand(-7,7),
	vy: getRand(-7,7),
	ay: getRand(-0.5,0.5),
	radius: 50,
	color: "#71D1EA",
	pop: false,
	draw: function() {
		  ctx.beginPath();
		  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		  ctx.closePath();
		  ctx.fillStyle = this.color;
		  ctx.fill();
		  var textSize;
		  if (this.text.length >= 5) {
		  	textSize = (this.radius / (this.text.length*0.30) );

		  } else {
		  	textSize = (this.radius / (this.text.length*.55) );

		  }
		  ctx.fillStyle = "#FDFEFF";
		  ctx.font =  textSize + "px Arial";
		  ctx.textAlign = "center";
		  ctx.fillText(this.text, this.x, this.y + textSize/3);
		  
	}
	};
	return ball;
}
function draw() {
	ctx.clearRect(0,0, canvas.width, canvas.height);
	for (var key in bubbles) {
		bubbles[key].draw();
		var bubble = bubbles[key];
		if(bubble.pop == true) {
			if (bubble.radius <= 3){
				delete bubbles[key];
				continue;
			} else {
				bubble.radius *= 0.5;
			}
		}
		bubble.x += bubble.vx;
		bubble.y += bubble.vy;
		/*bubble.vy *= 0.99;
		bubble.vy += bubble.ay;*/
		if (bubble.y + bubble.vy + bubble.radius > canvas.height || bubble.y - bubble.radius + bubble.vy < 0) {
			bubble.vy = -bubble.vy;
		}
		if (bubble.x + bubble.vx + bubble.radius > rect.right || bubble.x - bubble.radius + bubble.vx < 0) {
			bubble.vx = -bubble.vx;
		}	
	}
	raf = window.requestAnimationFrame(draw);
}








function rand_x_in_cvs () {
	var min = rect.left +100;
	var max = rect.right - 100;
	return Math.floor( Math.random() * (max-min) ) + min;
}

function rand_y_in_cvs () {
	var min = rect.top +100;
	var max = rect.bottom - 100;
	return Math.floor( Math.random() * (max-min) ) + min;
}

function rand_velocity_modifier () {
	return Math.floor(Math.random()*5) +1;
}

function getRand (max, min) {
	return Math.random() * (max - min) + min;
}

for (var i = 0; i < num_of_bubbles; i ++) {
	var name = band_names[i];
	bubbles[name] =  addBubble(name, rand_x_in_cvs(), rand_y_in_cvs());
	bubbles[name].draw();
	console.log(bubbles[name].x, bubbles[name].y);
}

canvas.addEventListener('mouseover', function(e){
	raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout",function(e){
	window.cancelAnimationFrame(raf);
});

canvas.addEventListener("click", function(e) {
	var click_x = e.clientX - rect.left;
	var click_y = e.clientY - rect.top;
	console.log("click processed with x,y :");
	console.log(click_x, click_y);
	for (var key in bubbles) {
		var bubble = bubbles[key];
		if (

			click_x <= (bubble.x + bubble.radius) && 
			click_x >= (bubble.x -bubble.radius) && 
			click_y <= (bubble.y +bubble.radius) && 
			click_y >= (bubble.y -bubble.radius) ) {
			console.log(bubble.text);
			console.log("clicked");
			bubble.pop = true;
		}
	}
});
/*
function pop_bubble(key) {
	var bubble = bubbles[key];
	if(bubble.radius > 3) {
		bubble.radius *= .5;
		pop_bubble(key);
	} else {
		delete bubbles[key];
	}
}*/
//create array of balls

//animate balls
	//clear rect
	//process each ball in array




//onclick
	//check if click is on a bubble
		//if it is { 
			//delete that bubble
			//create a new div element that looks identical to bubble in bottom bar 




