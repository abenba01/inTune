
	var myLat = 0;
	var myLng = 0;
	var address_info = "";
	var data;
	var results;
	var openWeatherMapKey = '4ec6865ce305a9b9db6f2f8de2296691'; 
	var sunset_time_string;
	var sunrise_time_string;
	var my_time_string;
	var my_month;
	var today;
	var next = false;
	var myInfo = new Object();
	var moodMeter = new Object();
	var theWeather = new Object();
		theWeather['sunny'] = false;
		theWeather['sunny_winter'] = false;
		theWeather['sunny_fall'] = false;
		theWeather['sunny_summer'] = false;
		theWeather['cloudy'] = false;
		theWeather['fog'] = false;
		theWeather['thunder'] = false;
		theWeather['snow'] = false;
		theWeather['rain'] = false;
		theWeather['night'] = false;

 		
	var amsterdam = new Object();
		amsterdam['rain'] = 'http://i.imgur.com/9vBBFuF.jpg';
		amsterdam['cloudy'] = 'http://i.imgur.com/9LwtY0h.jpg';
		amsterdam['sunny'] = 'http://i.imgur.com/WYwtOIp.jpg';
		amsterdam['night'] = 'http://i.imgur.com/C3pNmbd.jpg';
		amsterdam['snow'] = 'http://i.imgur.com/H6rf4nZ.jpg';

	var paris = new Object();
		paris['snow'] = 'http://i.imgur.com/se0ZPzE.jpg';
		paris['cloudy'] = 'http://i.imgur.com/9Faukej.jpg';
		paris['night'] = 'http://i.imgur.com/dpTCqFW.jpg';
		paris['sunny'] = 'http://i.imgur.com/GF8oPu1.jpg';
		paris['rain'] = 'http://i.imgur.com/vUEXphf.jpg';
	
	var madrid = new Object();
		madrid['cloudy'] = 'http://i.imgur.com/yiiU0Fz.jpg';
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
		losangeles['snow'] = 'http://imgur.com/REP3kfs.jpg';

	var boston = new Object();
		boston['night'] = 'http://i.imgur.com/OEryYmJ.jpg';
		boston['cloudy'] = 'http://i.imgur.com/G3BykUw.jpg';
		boston['snow'] = 'http://i.imgur.com/LISyPGY.jpg';
		boston['sunny'] = 'http://i.imgur.com/urvfsvA.jpg';
		boston['rain'] = 'http://imgur.com/CfiGZ85.jpg';

	var tufts = new Object();
		tufts['sunny'] = 'http://i.imgur.com/CnyPHGt.jpg';
		tufts['cloudy'] = 'http://i.imgur.com/yyGX2mf.jpg';
		tufts['snow'] = 'http://i.imgur.com/adODgxw.jpg';
		tufts['night'] = 'http://i.imgur.com/EtzGldK.jpg';
		tufts['rain'] = 'http://i.imgur.com/yyGX2mf.jpg';

	var NYC = new Object();
		NYC['rain'] = 'http://imgur.com/OcGORMl.jpg';
		NYC['sunny'] = 'http://imgur.com/rVme7A9.jpg';
		NYC['snow'] = 'http://imgur.com/A3bBHUU.jpg';
		NYC['cloudy'] = 'http://imgur.com/3Y0tbbO.jpg';
		NYC['night'] = 'http://imgur.com/EiGCyVq.jpg';

	var weather = new Object();
		weather['sunny_winter'] = 'http://i.imgur.com/4GJPfen.jpg';
		weather['sunny_fall'] = 'http://i.imgur.com/NZmrFo6.jpg';
		weather['sunny_summer'] = 'http://i.imgur.com/GHpgWsa.jpg';
		weather['cloudy'] = 'http://i.imgur.com/ej1rNWu.jpg';
		weather['rain'] = 'http://i.imgur.com/reHMzYe.jpg';
		weather['snow'] = 'http://i.imgur.com/M7BkXwP.jpg';
		weather['night'] = 'http://imgur.com/CjuSNnP.jpg';

	function getMyLocation() {
		if (navigator.geolocation) { 
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
 		var request = new XMLHttpRequest();
 		var requestString = "http://api.openweathermap.org/data/2.5/weather?lat=" + myLat + "&&lon=" + myLng + "&&cluster=yes&&format=json" + "&&APPID=" + openWeatherMapKey;
   		request.open("GET", requestString, true);
    	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	request.send(null);
    	request.onreadystatechange = function(){
			if(request.readyState === 4 && request.status === 200){
				data = request.responseText;
				results = JSON.parse(data);
				myInfo['conditionCode'] = results['weather'][0].id;
				myInfo['country'] = results['sys'].country;
				myInfo['state'] = results['sys'].state;
				myInfo['localName'] = results['name'];
				myInfo['sunrise'] = results['sys'].sunrise;
				myInfo['sunset'] = results['sys'].sunset;
				convertTimes();
			}else if(request.readyState === 4 && request.status !== 200){
				alert("Whoops, something is wrong with the weather data!");
			}
		}
	}

	function convertTimes(){
		today = new Date(),	// Convert the passed timestamp to milliseconds
		my_month = ('0' + (today.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		my_hr = ('0' + today.getHours()).slice(-2),
		my_min = ('0' + today.getMinutes()).slice(-2),
		my_time_string = my_hr + my_min;

		sunrise_time = new Date(myInfo['sunrise'] * 1000)
		rise_hr = ('0' + sunrise_time.getHours()).slice(-2),
		rise_min = ('0' + sunrise_time.getMinutes()).slice(-2),
		sunrise_time_string = rise_hr + rise_min;

		sunset_time = new Date(myInfo['sunset'] * 1000)
		set_hr = ('0' + sunset_time.getHours()).slice(-2),
		set_min = ('0' + sunset_time.getMinutes()).slice(-2),
		sunset_time_string = set_hr + set_min;
		console.log(sunset_time_string);
		next = true; 
		if(next){
			setCondition();
		}
	}

	function setCondition(){
		if(my_time_string > sunset_time_string || my_time_string < sunrise_time_string){
			setNight();
		}
		//cloudy
		else if(myInfo['conditionCode'] > '801' && myInfo['conditionCode'] < '805'){
			setCloudy();
		}
		//rain
		else if(myInfo['conditionCode'] >= '500' && myInfo['conditionCode'] < '532'){
			setRain();
		}
		//thunder
		else if(myInfo['conditionCode'] >= '200' && myInfo['conditionCode'] <= '232'){
			setRain();
		}
		//snow
	 	else if(myInfo['conditionCode'] >= '600' && myInfo['conditionCode'] <= '622'){
		   	setSnow();
		}
		else{
			setSunny(); 
		}
		determineLocation();
	}	

	function setSunny(){
		theWeather['sunny'] = true;
		moodMeter['target_acousticness'] = '0'; 
		moodMeter['target_energy'] = '.8';
		moodMeter['target_danceability'] = '.5';
		moodMeter['song_type'] = '';
	}

	function setSnow(){
		theWeather['snow'] = true;
		moodMeter['target_acousticness'] = '.6'; 
		moodMeter['target_energy'] = '.4';
		moodMeter['target_danceability'] = '.6';
		moodMeter['song_type'] = '';
	}
	function setRain(){
		theWeather['rain'] = true;
		moodMeter['target_acousticness'] = '.6'; 
		moodMeter['target_energy'] = '.4';
		moodMeter['target_danceability'] = '.4';
		moodMeter['song_type'] = '';
	}
	function setCloudy(){
		theWeather['cloudy'] = true;
		moodMeter['target_acousticness'] = '.6'; 
		moodMeter['target_energy'] = '.2';
		moodMeter['target_danceability'] = '.3';
		moodMeter['song_type'] = '';
	}
	function setSunny(){
		theWeather['sunny'] = true;
		if(my_month > 8 && my_month < 12){
			theWeather['sunny_fall'] = true;
			moodMeter['target_acousticness'] = '.5'; 
			moodMeter['target_energy'] = '.4';
			moodMeter['target_danceability'] = '.4';
			moodMeter['song_type'] = '';
		}
		if(my_month > 11 || my_month < 4){
			theWeather['sunny_winter'] = true;
			moodMeter['target_acousticness'] = '.5'; 
			moodMeter['target_energy'] = '.5';
			moodMeter['target_danceability'] = '.4';
			moodMeter['song_type'] = 'christmas';
		}
		if(my_month > 3 && my_month <= 8){
			theWeather['sunny_summer'] = true;
			moodMeter['target_acousticness'] = '0'; 
			moodMeter['target_energy'] = '.8';
			moodMeter['target_danceability'] = '.5';
			moodMeter['song_type'] = '';
		}
	}
	function setNight(){
		theWeather['night'] = true;
		moodMeter['target_acousticness'] = '0'; 
		moodMeter['target_energy'] = '.9';
		moodMeter['target_danceability'] = '.9';
		moodMeter['song_type'] = '';
	}


	function determineLocation(){
		if(myInfo['localName'] == 'Medford' || myInfo['localName'] == 'Somerville'){
			setMoodTufts();
		}
		else if(myInfo['localName'] == 'Boston' || myInfo['state'] == 'MA'){
			setMoodBOS();
		}
		else if(myInfo['localName'] == 'Los Angeles' || myInfo['state'] == 'CA'){
			setMoodLA();
		}
		else if(myInfo['localName'] == 'New York' || myInfo['state'] == 'NY'){
			setMoodNYC();
		}
		else if(myInfo['country'] == 'FR'){
			setMoodFR();
		}
		else if(myInfo['country'] == 'IT'){
			setMoodIT();
		}
		else if(myInfo['country'] == 'ES'){
			setMoodES();
		}
		else if(myInfo['country'] == 'NL'){
			setMoodNL();
		}
		else{
			setMoodWeather();
		}
	}
		function resetWeather(){
		theWeather['sunny'] = false;
		theWeather['sunny_winter'] = false;
		theWeather['sunny_fall'] = false;
		theWeather['sunny_summer'] = false;
		theWeather['cloudy'] = false;
		theWeather['snow'] = false;
		theWeather['rain'] = false;
		theWeather['night'] = false;
	}

	function setMoodWeather(){
		if(theWeather['sunny_winter']){
			document.body.style.backgroundImage = "url('" + weather['sunny_winter'] + "')";
		}
		else if(theWeather['sunny_fall']){
			document.body.style.backgroundImage = "url('" + weather['sunny_fall'] + "')";
		}
		else if(theWeather['cloudy']){
			document.body.style.backgroundImage = "url('" + weather['cloudy'] + "')";
		}
		else if(theWeather['snow']){
			document.body.style.backgroundImage = "url('" + weather['snow'] + "')";
		}
		else if(theWeather['rain']){
			document.body.style.backgroundImage = "url('" + weather['rain'] + "')";
		}
		else{
			document.body.style.backgroundImage = "url('" + weather['sunny_summer'] + "')";
		}
	}

	function setMoodTufts(){
		if(theWeather['night']){
			document.body.style.backgroundImage = "url('" + tufts['night'] + "')";
		}
		else if(theWeather['rain']){
			document.body.style.backgroundImage = "url('" + tufts['rain'] + "')";
		}
		else if(theWeather['cloudy']){
			document.body.style.backgroundImage = "url('" + tufts['cloudy'] + "')";
		}
		else if(theWeather['snow']){
			document.body.style.backgroundImage = "url('" + tufts['snow'] + "')";
		}
		else{
			document.body.style.backgroundImage = "url('" + tufts['sunny'] + "')";
		}
	}

	function setMoodFR(){	
		//spotify action here!!!!!!!!!	
		if(theWeather['night']){
			document.body.style.backgroundImage = "url('" + paris['night'] + "')";
		}
		else if(theWeather['snow']){
				document.body.style.backgroundImage = "url('" + paris['snow'] + "')";
		}
		else if(theWeather['rain']){
			document.body.style.backgroundImage = "url('" + paris['rain'] + "')";
		}
		else if(theWeather['cloudy']){
			document.body.style.backgroundImage = "url('" + paris['cloudy'] + "')";
		}
		else{
			document.body.style.backgroundImage = "url('" + paris['sunny'] + "')";
		}
	}

	function setMoodBOS(){		
		if(theWeather['night']){
			document.body.style.backgroundImage = "url('" + boston['night'] + "')";
		}
		else if(theWeather['rain']){
				document.body.style.backgroundImage = "url('" + boston['rain'] + "')";
		}
		else if(theWeather['snow']){
			document.body.style.backgroundImage = "url('" + boston['snow'] + "')";
		}
		else if(theWeather['cloudy']){
			document.body.style.backgroundImage = "url('" + boston['cloudy'] + "')";
		}
		else{
			document.body.style.backgroundImage = "url('" + boston['sunny'] + "')";
		}
	}

	function setMoodLA(){		
		if(theWeather['night']){
			document.body.style.backgroundImage = "url('" + losangeles['night'] + "')";
		}
		else if(theWeather['rain']){
			document.body.style.backgroundImage = "url('" + losangeles['rain'] + "')";
		}
		else if(theWeather['cloudy']){
			document.body.style.backgroundImage = "url('" + losangeles['cloudy'] + "')";
		}
		else if(theWeather['snow']){
			document.body.style.backgroundImage = "url('" + losangeles['snow'] + "')";
		}
		else{
			document.body.style.backgroundImage = "url('" + losangeles['sunny'] + "')";
		}
	}

	function setMoodNYC(){		
		if(theWeather['night']){
			document.body.style.backgroundImage = "url('" + NYC['night'] + "')";
			console.log("1");
		}
		else if(theWeather['rain']){
			document.body.style.backgroundImage = "url('" + NYC['rain'] + "')";
						console.log("2");
		}
		else if(theWeather['cloudy']){
			document.body.style.backgroundImage = "url('" + NYC['cloudy'] + "')";
						console.log("3");
		}
		else if(theWeather['snow']){
			document.body.style.backgroundImage = "url('" + NYC['snow'] + "')";
		}
		else{
			document.body.style.backgroundImage = "url('" + NYC['sunny'] + "')";
						console.log("4");
		}
	}

	function setMoodIT(){		
		if(theWeather['night']){
			document.body.style.backgroundImage = "url('" + rome['night'] + "')";
		}
		else if(theWeather['rain']){
			document.body.style.backgroundImage = "url('" + rome['rain'] + "')";
		}
		else if(theWeather['cloudy']){
			document.body.style.backgroundImage = "url('" + rome['cloudy'] + "')";
		}
		else if(theWeather['snow']){
			document.body.style.backgroundImage = "url('" + rome['snow'] + "')";
		}
		else{
			document.body.style.backgroundImage = "url('" + rome['sunny'] + "')";
		}
	}

	function setMoodES(){		
		if(theWeather['night']){
			document.body.style.backgroundImage = "url('" + madrid['night'] + "')";
		}
		else if(theWeather['rain']){
			document.body.style.backgroundImage = "url('" + madrid['rain'] + "')";
		}
		else if(theWeather['cloudy']){
			document.body.style.backgroundImage = "url('" + madrid['cloudy'] + "')";
		}
		else if(theWeather['snow']){
			document.body.style.backgroundImage = "url('" + madrid['snow'] + "')";
		}
		else{
			document.body.style.backgroundImage = "url('" + madrid['sunny'] + "')";
		}
	}

	function setMoodNL(){		
		if(theWeather['night']){
			document.body.style.backgroundImage = "url('" + amsterdam['night'] + "')";
		}
		else if(theWeather['rain']){
			document.body.style.backgroundImage = "url('" + amsterdam['rain'] + "')";
		}
		else if(theWeather['cloudy']){
			document.body.style.backgroundImage = "url('" + amsterdam['cloudy'] + "')";
		}
		else if(theWeather['snow']){
			document.body.style.backgroundImage = "url('" + amsterdam['snow'] + "')";
		}
		else{
			document.body.style.backgroundImage = "url('" + amsterdam['sunny'] + "')";
		}
	}

	$(document).ready(function () {
		//Location
		$('#USA').on('click', function () {
			setMoodWeather();
		})
		$('#ES').on('click', function () {
			setMoodES();
		})
		$('#FR').on('click', function () {
			setMoodFR();
		})
		$('#IT').on('click', function () {
			setMoodIT();
		})
		$('#AMS').on('click', function () {
			setMoodNL();
		})
		$('#NYC').on('click', function () {
			setMoodNYC();
		})
		$('#LA').on('click', function () {
			setMoodLA();
		})
		$('#BOS').on('click', function () {
			setMoodBOS();
		})
		$('#MyLoc').on('click', function () {
			determineLocation();

		})
		
		//Weather
		$('#SUN').on('click', function () {
			resetWeather();
			setSunny();
			document.body.style.backgroundImage = "url('" + weather['sunny_fall'] + "')";
		})
		$('#CLOUD').on('click', function () {
			resetWeather();
			setCloudy();
			document.body.style.backgroundImage = "url('" + weather['cloudy'] + "')";
		})
		$('#RAIN').on('click', function () {
			resetWeather();
			setRain();
			document.body.style.backgroundImage = "url('" + weather['rain'] + "')";
		})
		$('#SNOW').on('click', function () {
			resetWeather();
			setSnow();
			document.body.style.backgroundImage = "url('" + weather['snow'] + "')";
		})	
		$('#NIGHT').on('click', function () {
			resetWeather();
			setNight();
			document.body.style.backgroundImage = "url('" + weather['night'] + "')";
		})
		
		//myTunes
		$('#LP').on('click', function () {
			loadPlaylist();
		})
		
	});

function fetchArtistsByLocation(locale) {
    var endpoint = 'http://developer.echonest.com/api/v4/'
    var url = endpoint + 'artist/search';
    var apiKey = 'NO_API_KEY';

    $("#results").empty();
    $.getJSON(url, 
        { 
            'api_key' : apiKey,
            'artist_location': locale, 
            'results' : 5,
            'bucket': [ 'artist_location'],  
            'sort': 'hotttnesss-desc'
        },
        function(data) {
            if (data.response.status.code == 0) {
                var artists = data.response.artists;
                if (artists.length > 0) {
                    for (var i = 0; i < artists.length; i++) {
                        var artist = artists[i];
                        var li = $("<li>");
                        if ('artist_location' in artist) {
                            li.text(artist.name + " from " + artist.artist_location.location);
                            $("#results").append(li);
                        } else {
                            console.log(artist);
                        }
                    }
                } else {
                        $("#results").text("No results");
                }
            } else {
                alert("Trouble getting artists: " + data.response.status.message);
            }
        })
        .error( 
            function(data) {
                alert("query syntax error. Use 'city:', 'region:' and 'country:' qualifiers only");
            }
        );
}


getMyLocation();

