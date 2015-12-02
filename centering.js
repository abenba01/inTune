function center(){

	var width = window.innerWidth;
	var height = window.innerHeight;

	var rect = document.getElementById("song_panel").getBoundingClientRect();
	console.log("rect width is: " + rect.width);
	console.log("divided by 2 is: " + rect.width/2);
	console.log("rect height is: " + rect.height);

	var left_center = width/2 - rect.width;
	var top_center = height/2 - rect.height;



	console.log("in center function");
	console.log("width: " + width);
	console.log("height: " + height);
	console.log("left_center: " + left_center);
	console.log("top_center: " + top_center);
	document.getElementById("song_panel").style.left = left_center + "px";
	document.getElementById("song_panel").style.top = top_center + "px";
}