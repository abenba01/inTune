//Establish canvas and context for main and footer
var canvas = document.getElementById('bubble_cvs');
var footer_canvas = document.getElementById('footer_cvs');
var footer = footer_canvas.getContext('2d');
//apply proper height and width to all canvases so resoultion is accurate
var footer_height = document.getElementById("bubble_footer").getBoundingClientRect().height;
var header_height = document.getElementById("header").getBoundingClientRect().height;
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight - footer_height - header_height;
var footer_rect = footer_canvas.getBoundingClientRect();
footer_canvas.height = footer_rect.height;
footer_canvas.width = footer_rect.width;
var main_ctx = canvas.getContext('2d');
var rect = canvas.getBoundingClientRect();
var raf;

//establish key value pair objects for main and footer
var bubbles = new Object;
var footer_bubbles = new Object;

//variable to store all band names 
var band_names = [
"Nickleback", "The Strokes", "The Killers", "Father John Misty", "Future", 
"Drake", "Fetty Wap", "Sun Kil Moon", "MGMT", "One Direction", "Miley Cyrus", 
"The Weeknd", "Adele"
];

var num_of_bubbles = band_names.length;

/*function adds a bubble with the parameters given and random velocities, 
accellerations, and a radius of 50. All bubbles start "unpopped" and not in 
the footer. the bubble object also contains a member function that draws the 
bubble on the canvas based on whether or not in_footer is true */
function addBubble(name, x_start, y_start) {
	var bubble = {
	text: name,
	x: x_start,
	y: y_start,
	vx: getRand(-7,7),
	vy: getRand(-7,7),
	ay: getRand(-0.5,0.5),
	radius: 50,
	color: "#71D1EA",
	pop: false,
	in_footer: false,
	//draws bubble on canvas 
	draw: function() {
		//gets proper canvas
		var ctx;
		if (!this.in_footer) {
			ctx = main_ctx;
		} else {
			ctx = footer;
		}
		//draws the outline of bubble and fills it in
		  ctx.beginPath();
		  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		  ctx.closePath();
		  ctx.fillStyle = this.color;
		  ctx.fill();
	 	 //calculates correct size for text based on leng the of text and 
	 	 //radius of bubble
		  var textSize;
		  if (this.text.length >= 5) {
		  	textSize = (this.radius / (this.text.length*0.30) );

		  } else {
		  	textSize = (this.radius / (this.text.length*.55) );

		  }
		  //fills in text in center of bubble
		  ctx.fillStyle = "#FDFEFF";
		  ctx.font =  textSize + "px Arial";
		  ctx.textAlign = "center";
		  ctx.fillText(this.text, this.x, this.y + textSize/3);
		  
		}
	};
	//returns the object
	return bubble;
}

//main function that controls animation 
function draw() {
	//clears both canvases before each redraw
	main_ctx.clearRect(0,0, canvas.width, canvas.height);
	footer.clearRect(0,0, footer_canvas.width, footer_canvas.height);

	//draws all bubble in main canvas using member function and then updates their attributes based on velocities
	for (var key in bubbles) {
		bubbles[key].draw();
		var bubble = bubbles[key];
		//if bubbles are popped they shrink by half on each frame until they 
		//are very small and then are pushed to footer and deleted.
		if(bubble.pop == true) {
			if (bubble.radius <= 3){
				push_to_footer(key);
				delete bubbles[key];
				continue;
			} else {
				bubble.radius *= 0.5;
			}
		}
		//update bubble position based on velocity
		bubble.x += bubble.vx;
		bubble.y += bubble.vy;

		//if uncommeted this code give bubbles gravity
		/*bubble.vy *= 0.99;
		bubble.vy += bubble.ay;*/

		//bubbles bounce back with equal momentum if they hit a wall 
		if (bubble.y + bubble.vy + bubble.radius > canvas.height || bubble.y - bubble.radius + bubble.vy < 0) {
			bubble.vy = -bubble.vy;
		}
		if (bubble.x + bubble.vx + bubble.radius > rect.right || bubble.x - bubble.radius + bubble.vx < 0) {
			bubble.vx = -bubble.vx;
		}	
	}

	//draws bubbles in footer and then udpates attributes based on required 
	//animation
	for (var key in footer_bubbles) {
		var bubble = footer_bubbles[key];
		bubble.draw();

		//if bubbles are small and not poped they double in size each frame 
		//until they are the proper size
		if(bubble.radius < 50 && bubble.pop) {
			bubble.radius *= 2;
		//otherwise theres some fancy stuff here to make the bubles bounce and 
		//settle in the right place but it doesnt work yet :(
		} else {
			if (bubble.vx < 1 && bubble.vx > -1 && bubble.x > (canvas.width *.80) - (100 * Object.keys(footer_bubbles).length) ){ 
				bubble.vx = 0;
				bubble.x = footer_canvas.width - (100 * Object.keys(footer_bubbles).length - 50);
			}
			bubble.x += bubble.vx;
			bubble.vx *= 0.9;
			bubble.vx += 0.9;
			if(bubble.x + bubble.vx + bubble.radius > footer_canvas.width) {
				bubble.vx = -bubble.vx;
			}
		}
	}
	//requests animation frame (but only once current fram is done drawying)
	//reference to request is stored so it can be canceled on command 
	raf = window.requestAnimationFrame(draw);
}

//bubble is added to footer with default overidden to footer defaults 
function push_to_footer(key) {
	footer_bubbles[key] = addBubble(key, 100 + 100*Object.keys(footer_bubbles).length, footer_rect.height/2);
	footer_bubbles[key].in_footer = true;
	footer_bubbles[key].pop = true;
	footer_bubbles[key].radius = 3.125;
	footer_bubbles[key].vx = 7;
	footer_bubbles[key].draw();

}


//gets a random x value within main canvas
function rand_x_in_cvs () {
	var min = rect.left +100;
	var max = rect.right - 100;
	return Math.floor( Math.random() * (max-min) ) + min;
}

//gets a random y value withihn main canvas
function rand_y_in_cvs () {
	var min = rect.top +100;
	var max = rect.bottom - 100;
	return Math.floor( Math.random() * (max-min) ) + min;
}

//gets random velocity modifier (outdated)
function rand_velocity_modifier () {
	return Math.floor(Math.random()*5) +1;
}

//gets random number within bounds
function getRand (max, min) {
	return Math.random() * (max - min) + min;
}

//adds bubbles from band names
for (var i = 0; i < num_of_bubbles; i ++) {
	var name = band_names[i];
	bubbles[name] =  addBubble(name, rand_x_in_cvs(), rand_y_in_cvs());
	bubbles[name].draw();
}

//requests animation frame from draw while mouseover
canvas.addEventListener('mouseover', function(e){
	raf = window.requestAnimationFrame(draw);
});

//cancels animation while mouseover
canvas.addEventListener("mouseout",function(e){
	window.cancelAnimationFrame(raf);
});

//checks for click on canvas and if it's on a bubble "pops" the bubble
canvas.addEventListener("click", function(e) {
	var click_x = e.clientX - rect.left;
	var click_y = e.clientY - rect.top;
	for (var key in bubbles) {
		var bubble = bubbles[key];
		if (

			click_x <= (bubble.x + bubble.radius) && 
			click_x >= (bubble.x -bubble.radius) && 
			click_y <= (bubble.y +bubble.radius) && 
			click_y >= (bubble.y -bubble.radius) ) {
			bubble.pop = true;
		}
	}
});
	


