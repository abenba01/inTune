	
	
	var myLat = 0;
	var myLng = 0;
	var address_info = "";
	function getMyLocation() {
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						myLat = position.coords.latitude;
						myLng = position.coords.longitude;
						geocodeLatLng();
						getWeather();
					});
				}
				else {
					alert("Geolocation is not supported by your web browser. Time to upgrade!");
				}
	}
				
	//returns addresses based on coords, might not need if get weather JSON has address info
	function geocodeLatLng(geocoder) {
  		var geocoder = new google.maps.Geocoder;
  		var Lat = parseFloat(myLat);
		var Lng = parseFloat(myLng);
 		var latlng = {lat: Lat, lng: Lng};
  		geocoder.geocode({'location': latlng}, function(results, status) {
    		if (status === google.maps.GeocoderStatus.OK) {
     			if (results[0]) {
 					console.log(results[1].address_components[0].long_name);
      			}else{
      				alert('No results found');
     			}
    		}else{
				alert('Geocoder failed due to: ' + status);
    		}
  		});
	}

	function getWeather(){
		
    	openWeatherMapKey = '4ec6865ce305a9b9db6f2f8de2296691'; 
   		var requestString = "api.openweathermap.org/data/2.5/weather?lat=" + myLat + "&lon=" + myLng + "&cluster=yes&format=json" + "&APPID=" + openWeatherMapKey;
   		$.ajax({type: "GET",
   			crossDomain:true,
   			url: requestString,
   			contentType: "application/json",
   			success: function(data){
   				
   				//var results = JSON.parse(data);
   				console.log(data); 
   			}
   		});
	};

	getMyLocation();

/*
	//this should work but seems to break the same origin policy
	function getWeather(){
		
    	openWeatherMapKey = '4ec6865ce305a9b9db6f2f8de2296691'; 
   		var requestString = "api.openweathermap.org/data/2.5/weather?lat=" + myLat + "&lon=" + myLng + "&cluster=yes&format=json" + "&APPID=" + openWeatherMapKey;
    	request = new XMLHttpRequest();
   	 	request.open("GET", requestString, true);
    	request.send(null);
    	var results = JSON.parse(request.responseText);
    	console.log(results);
	};

	getMyLocation();
*/

//https://github.com/google/maps-for-work-samples/blob/master/samples/OpenWeatherMapLayer/index.html
//http://home.openweathermap.org/
//https://developers.google.com/maps/documentation/javascript/geocoding


