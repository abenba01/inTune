jQuery.ajaxSettings.traditional = true; 
var config = getConfig();
var songs;

       
function fetchArtistsByLocation(locale) {
    console.log("fetching artists");
   var endpoint = 'http://developer.echonest.com/api/v4/'
    var url = endpoint + 'artist/search';
    var apiKey = 'NO_API_KEY';

    $("#results").empty();
    $.getJSON(url, 
        { 
            'api_key' : config.apiKey,
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
               s         } else {
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
            'variety' : 1, 'results': 50, 'type':'artist-radio',  
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
                songs = data.response;
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
    //songs = JSON.stringify(songs);
    $.post('/savePlaylist', songs)
        .done( function (data) {
            alert(data.response)
        })
        .fail ( function(data) {
            alert("failed");
        }
        );
        
        console.log(songs);
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

        $('#USA').on('click', function () {
            fetchArtistsByLocation("United States of America");
            console.log("USA");
        })
        $('#ES').on('click', function () {
            fetchArtistsByLocation("spain");
        })
        $('#FR').on('click', function () {
            fetchArtistsByLocation("france");
        })
        $('#IT').on('click', function () {
            fetchArtistsByLocation("italy");
        })
        $('#AMS').on('click', function () {
            fetchArtistsByLocation("amsterdam");
        })
        $('#NYC').on('click', function () {
            fetchArtistsByLocation("new york city");
        })
        $('#LA').on('click', function () {
            fetchArtistsByLocation("los Angeles");
        })
        $('#BOS').on('click', function () {
            fetchArtistsByLocation("boston");
        })
        $('#MyLoc').on('click', function () {
            //determineLocation();

        })
});