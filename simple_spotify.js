jQuery.ajaxSettings.traditional = true; 
var config = getConfig();
var embedcode;
var iframe;


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
            info("");
            if (! ('songs' in data.response)) {
                info("Can't find that artist");
            } else {
                var title = "inTune Radio ";
                var spotifyPlayButton = getSpotifyPlayButtonForPlaylist(title, data.response.songs);
                $("#all_results").append(spotifyPlayButton);
            }
        })
        .error( function() {
            info("Whoops, had some trouble getting that playlist");
        }) ;
}

function save_playlist() {
    //var url = '/savePlaylist';
    console.log("saving");
    var params = "frame=" + encodeURIComponent(embedcode);
    console.log(params);
    var http = new XMLHttpRequest();
    var url = 'http://quiet-reaches-3588.herokuapp.com/savePlaylist';
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(params);
     http.onreadystatechange = function(){
        console.log("change");
        console.log(http.readyState, http.status);
        if(http.readyState === 4 && http.status === 200){
            var id = http.responseText;
            console.log("id from post is: " + id);
            localStorage['playlist'] = id;
            alert("Successfully saved!");
        }else if(http.readyState === 4 && http.status !== 200){
            alert("Whoops, something is wrong with your data!");
        }
    }
}


function loadPlaylist(){
    console.log("loadPlaylist called");
    var http = new XMLHttpRequest();
    var id = localStorage['playlist'];
    console.log(id);
    var url = 'http://quiet-reaches-3588.herokuapp.com/getPlaylist' + '?id=' + id;
    http.open("GET", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(null);
    http.onreadystatechange = function(){
        console.log(http.readyState, http.status);
        if(http.readyState === 4 && http.status === 200){
            iframe = http.responseText;
            console.log("success");
        }else if(http.readyState === 4 && http.status !== 200){
            alert("Whoops, something is wrong with your data!");
        }
    }

    var newPlaylist = $("<span>").html(iframe);
    $("#all_results").append(newPlaylist);
    console.log("complete");
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



