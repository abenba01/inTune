jQuery.ajaxSettings.traditional = true; 
var config = getConfig();
var songs;


function fetchArtistPlaylist(artists,  wandering, variety) {
    var url = config.echoNestHost + 'api/v4/playlist/static';
    $("#all_results").empty();
    info("Creating the playlist ...");
    console.log(artists);
    //var artists = ['Vampire Weekend', 'Drake'];
    var tracks = "";
    var params = {
    	 
            'api_key': config.apiKey,
            'bucket': [ 'id:' + config.spotifySpace, 'tracks'], 
            'limit' : true,
            'variety' : 1, 'results': 20, 'type':'artist-radio',  
        };
        if (tracks != "") {
        	params.track_id = tracks;
        } if (artists != "") {
        	params.artist = artists;
        }


    //var tracks = ['TRTLKZV12E5AC92E11'];
    $.getJSON(url, params) 
        .done(function(data) {
        	console.log(data.response);
            info("");
            if (! ('songs' in data.response)) {
                info("Can't find that artist");
            } else {
                songs = data.response.songs;
                var title = "inTune Radio ";
                var spotifyPlayButton = getSpotifyPlayButtonForPlaylist(title, data.response.songs);
                $("#all_results").append(spotifyPlayButton);
            }
        })
        .error( function() {
            info("Whoops, had some trouble getting that playlist");
        }) ;
}
/*
function getSongId(songname) {
	var url = config.echoNestHost + 'api/v4/playlist/static';
    $.getJSON(url, { 
            'api_key': config.apiKey,
            'title': songname
        .done(function(data) {
        	console.log(data);
        })
        .error( function() {
            console.log("whoops");
        }) ;

}*/
function save_playlist() {
    //var url = '/savePlaylist';
    console.log("saving");
    //var params = JSON.stringify(songs);
    //params = encodeURIComponent(params);
    var params = songs;
    console.log(params);
    var http = new XMLHttpRequest();
    var url = 'http://quiet-reaches-3588.herokuapp.com/savePlaylist';
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(params);
     http.onreadystatechange = function(){
        console.log("change");
        console.log(http.readyState, http.status);
        if(http.readyState === 4 && http.status === 200){
            //var id = http.responseText;
            //console.log(id);
            //localStorage['playlist'] = id;
            alert("Successfully saved!");
        }else if(http.readyState === 4 && http.status !== 200){
            alert("Whoops, something is wrong with your data!");
        }
    }
}
function info(txt) {
    $("#info").text(txt);
}

$(document).ready(function() {
    var data = JSON.parse(localStorage['seed_artists']);
    console.log(data);
    var counter = 0;
    var artists = [];
    
    for (var key in data) {
    	console.log(key);
    	console.log(counter);
    	artists[counter] = key;
    	counter++;
    } 
    console.log(artists);
    fetchArtistPlaylist(artists, false, 1);
});