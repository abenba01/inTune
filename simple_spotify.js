jQuery.ajaxSettings.traditional = true; 
var config = getConfig();
var embedcode;
var iframe;

       
function fetchArtistsByLocation(locale) {
    console.log(locale);
    var endpoint = 'http://developer.echonest.com/api/v4/'
    var url = endpoint + 'artist/search';
    //var apiKey = 'NO_API_KEY';

    $("#results").empty();
    $.getJSON(url, 
        { 
            'api_key' : "ZSB4FV0A9YETOVCG1",
            'artist_location': locale, 
            'results' : 5,
            'bucket': [ 'artist_location'],  
            'sort': 'hotttnesss-desc'
        },
        function(data) {
            console.log("DATA" + data);
            if (data.response.status.code == 0) {
                var new_artists = data.response.artists;
                console.log("new artists");
                console.log(new_artists);
                var artist_list = [];
                localStorage.removeItem('seed_artists');
                for (var i = 0; i < new_artists.length; i++) {
                         artist_list[i] = new_artists[i].name;
                    }
                console.log(artist_list);
                localStorage.setItem("seed_artists", artist_list);
                if (new_artists.length > 0) {
                    fetchArtistPlaylist(artist_list, false, 1);

                } else {
                        $("#results").text("No results");
                }
            } else {
                console.log("Trouble getting artists: " + data.response.status.message);
            }
        })
        .error( 
            function(data) {
                console.log("query syntax error. Use 'city:', 'region:' and 'country:' qualifiers only");
            }
        );  
}

var newPlaylist;


//creates a playlist based on specified artists
function fetchArtistPlaylist(artists, wandering, variety) {
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
            'variety' : 1, 
            'results': 50, 
            'type':'artist-radio',
        };
        if (tracks != "") {
        	params.track_id = tracks;
        } if (artists != "") {
        	params.artist = artists;
        } if (moodMeter["target_acousticness"] != undefined) {
            params.target_acousticness = moodMeter["target_acousticness"];
        } if (moodMeter["target_energy"] != undefined) {
            params.target_energy = moodMeter["target_energy"];
        } if (moodMeter["target_danceability"] != undefined) {
            params.target_danceability = moodMeter['target_danceability'];    
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
            console.log(id);
            var j = 0;
            var new_id = id.substring(1, id.length-1);
            /*for(var i = 1; i < id.length-1; i++){

                new_id[j] += id[i];
                j++;
            }*/
            localStorage['playlist'] = new_id;
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
            $("#all_results").empty();
            document.getElementById("all_results").innerHTML = iframe;
            console.log("success", iframe);
        }else if(http.readyState === 4 && http.status !== 200){
            alert("Whoops, something is wrong with your data!");
        }
    }
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
    localStorage.setItem("original_artists", localStorage['seed_artists']);
});
