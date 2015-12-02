
	var today = new Date();
    var time = today.getTime();
    var month = today.getMonth();
	var myLat = 0;
	var myLng = 0;
	var address_info = "";
	var data;
	var results;
	var openWeatherMapKey = '4ec6865ce305a9b9db6f2f8de2296691'; 
 		
	var amsterdam = new Object();
		amsterdam['rain'] = 'http://i.imgur.com/9vBBFuF.jpg';
		amsterdam['cloudy_fall'] = 'http://i.imgur.com/9LwtY0h.jpg';
		amsterdam['summer'] = 'http://i.imgur.com/WYwtOIp.jpg';
		amsterdam['night'] = 'http://i.imgur.com/C3pNmbd.jpg';
		amsterdam['sunny_fall'] = 'http://i.imgur.com/b3KXPlU.jpg';
		amsterdam['snow'] = 'http://i.imgur.com/H6rf4nZ.jpg';

	var paris = new Object();
		paris['snow'] = 'http://i.imgur.com/se0ZPzE.jpg';
		paris['cloudy'] = 'http://i.imgur.com/9Faukej.jpg';
		paris['night'] = 'http://i.imgur.com/dpTCqFW.jpg';
		paris['sunny'] = 'http://i.imgur.com/GF8oPu1.jpg';
		paris['night_rainy'] = 'http://i.imgur.com/vem6MUp.jpg';
		paris['rain'] = 'http://i.imgur.com/vUEXphf.jpg';
	
	var madrid = new Object();
		madrid['cloudy_summer'] = 'http://i.imgur.com/tUjujf2.jpg';
		madrid['cloudy_winter'] = 'http://i.imgur.com/yiiU0Fz.jpg';
		madrid['night'] = 'http://i.imgur.com/CbeAWwn.jpg';
		madrid['rain'] = 'http://i.imgur.com/RrFjFk3.jpg';
		madrid['snow'] = 'http://i.imgur.com/YQesmMs.jpg';
		madrid['sunny'] = 'http://i.imgur.com/vR08yud.jpg';

	var rome = new Object();
		rome['sunny'] = 'http://i.imgur.com/3UdtAMn.jpg';
		rome['snow'] = 'http://i.imgur.com/VLA2nJV.jpg';
		rome['cloudy'] = 'http://i.imgur.com/zsO0Nsg.jpg';
		rome['night'] = 'http://i.imgur.com/XMEOXvK.jpg';
		rome['rain'] = 'http://i.imgur.com/BWcdfB0.jpg';

	var losangeles = new Object();
		losangeles['sunny'] = 'http://i.imgur.com/KD15J5H.jpg';
		losangeles['cloudy'] = 'http://i.imgur.com/xGhFSYj.jpg';
		losangeles['rain'] = 'http://i.imgur.com/xGhFSYj.jpg';
		losangeles['night'] = 'http://i.imgur.com/82VQOMV.jpg';

	var boston = new Object();
		boston['night'] = 'http://i.imgur.com/OEryYmJ.jpg';
		boston['cloudy'] = 'http://i.imgur.com/G3BykUw.jpg';
		boston['snow'] = 'http://i.imgur.com/LISyPGY.jpg';
		boston['sunny'] = 'http://i.imgur.com/urvfsvA.jpg';
		boston['night_rainy'] = 'http://i.imgur.com/5cSmoq5.jpg';

	var tufts = new Object();
		tufts['sunny_fall'] = 'http://i.imgur.com/CnyPHGt.jpg';
		tufts['cloudy'] = 'http://i.imgur.com/yyGX2mf.jpg';
		tufts['sunny_fall'] ='http://i.imgur.com/MI5ejHs.png';
		tufts['sunny'] = 'http://i.imgur.com/L7Y8lMi.jpg';
		tufts['snow'] = 'http://i.imgur.com/adODgxw.jpg';
		tufts['night'] = 'http://i.imgur.com/EtzGldK.jpg';

	var weather = new Object();
		weather['sunny_winter'] = 'http://i.imgur.com/4GJPfen.jpg';
		weather['sunny_fall'] = 'http://i.imgur.com/NZmrFo6.jpg';
		weather['sunny_summer'] = 'http://i.imgur.com/GHpgWsa.jpg';
		weather['cloudy'] = 'http://i.imgur.com/ej1rNWu.jpg';
		weather['partly_cloudy'] = 'http://i.imgur.com/rSBnpjS.jpg'
		weather['overcast'] = 'http://i.imgur.com/JCUCRn3.jpg';
		weather['sunset_clear'] = 'http://i.imgur.com/EgNhNve.jpg';
		weather['fog'] = "http://i.imgur.com/R2m1Fmg.jpg";
		weather['rain'] = 'http://i.imgur.com/reHMzYe.jpg';
		weather['rain_spring'] = 'http://i.imgur.com/TUXs0db.jpg';
		weather['snow'] = 'http://i.imgur.com/M7BkXwP.jpg';
		weather['thunder'] = 'http://i.imgur.com/cCGWH1n.jpg';

	function getMyLocation() {
				if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
					navigator.geolocation.getCurrentPosition(function(position) {
						myLat = position.coords.latitude;
						myLng = position.coords.longitude;
						getWeather();
					});
				}
				else {
					alert("Geolocation is not supported by your web browser. Time to upgrade!");
				}
	}
				
	function getWeather(){
 		request = new XMLHttpRequest();
 		var requestString = "http://api.openweathermap.org/data/2.5/weather?lat=" + myLat + "&lon=" + myLng + "&cluster=yes&format=json" + "&APPID=" + openWeatherMapKey;
   		request.open("GET", requestString, true);
    	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	request.send(null);
    	request.onreadystatechange = function(){
					if(request.readyState === 4 & request.status === 200){
						data = request.responseText;
						results = JSON.parse(data);
						console.log(results);
						console.log(today.format("H:MM"));
						console.log(results['sys'].sunrise + " - " + time);
						function setMood(){
							if(results['name'] == 'Medford' && results['weather'][0].main == 'Mist' && time > 0){
									document.body.style.backgroundImage = "url('" + weather['fog'] + "')";
							}
						}
						setMood();
					}else if(request.readyState === 4 & request.status !== 200){
						alert("Whoops, something is wrong with your data!");
					}
		}
	}

	

	


//https://github.com/google/maps-for-work-samples/blob/master/samples/OpenWeatherMapLayer/index.html
//http://home.openweathermap.org/
//https://developers.google.com/maps/documentation/javascript/geocoding

