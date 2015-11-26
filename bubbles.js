
var canvas = document.getElementById('bubble_cvs');
var ctx = canvas.getContext('2d');
var raf;
var bubbles = new Object;

var band_names = [
"Nickleback", "The Strokes", "The Killers", "Father John Misty", "Future", 
"Drake", "Fetty Wap", "Sun Kil Moon", "MGMT", "One Direction", "Miley Cyrus", 
"The Weeknd", "Adele"
];
var num_of_bubbles = band_names.length;

canvas.width = window.innerWidth; 
function addBubble(name, x_start, y_start) {
	var ball = {
	text: name,
	x: x_start,
	y: y_start,
	vx: getRand(-2,9),
	vy: getRand(-2,9),
	ay: getRand(0.99, 1),
	radius: 50,
	color: "#71D1EA",
	pop: false,
	draw: function() {
		  ctx.beginPath();
		  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		  ctx.closePath();
		  ctx.fillStyle = this.color;
		  ctx.fill();
		  var textSize = (this.radius*2 / this.text.length);
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
		bubble.vy *= bubble.ay;
		bubble.vy += getRand(0, 0.5);
		if (bubble.y + bubble.vy > canvas.height || bubble.y + bubble.vy < 0) {
			bubble.vy = -bubble.vy;
		}
		if (bubble.x + bubble.vx > canvas.width || bubble.x + bubble.vx < 0) {
			bubble.vx = -bubble.vx;
		}	
	}
	raf = window.requestAnimationFrame(draw);
}








function rand_num_within_window () {
	var num = Math.floor((Math.random() * (window.innerWidth/100))*100 + 1);
	return num;
}

function rand_velocity_modifier () {
	return Math.floor(Math.random()*5) +1;
}

function getRand (max, min) {
	return Math.random() * (max - min) + min;
}

console.log(rand_num_within_window());
console.log(rand_num_within_window());
console.log(rand_num_within_window());

for (var i = 0; i < num_of_bubbles; i ++) {
	var name = band_names[i];
	bubbles[name] =  addBubble(name, rand_num_within_window(), 100);
	bubbles[name].draw();
}

canvas.addEventListener('mouseover', function(e){
	raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout",function(e){
	window.cancelAnimationFrame(raf);
});

canvas.addEventListener("click", function(e) {
	var click_x = e.clientX;
	var click_y = e.clientY;
	console.log("click processed with x,y :");
	console.log(click_x, click_y);
	for (var key in bubbles) {
		var bubble = bubbles[key];
		if (click_x <= (bubble.x + bubble.radius) && 
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




