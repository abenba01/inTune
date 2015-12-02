jQuery.ajaxSettings.traditional = true; 
var config = getConfig();

function fetchArtistPlaylist(artist,  wandering, variety) {
    var url = config.echoNestHost + 'api/v4/playlist/static';
    $("#all_results").empty();
    info("Creating the playlist ...");
    $.getJSON(url, { 
            'api_key': config.apiKey,
            'track_id': "TRTLKZV12E5AC92E11", 
            //'artist': artist,
            'bucket': [ 'id:' + config.spotifySpace, 'tracks'], 
            'limit' : true,
            'variety' : 1, 'results': 12, 'type':'song-radio',  }) 
        .done(function(data) {
        	console.log(data.response);
            info("");
            if (! ('songs' in data.response)) {
                info("Can't find that artist");
            } else {
                var title = "Artist radio for " + artist;
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


function newArtist() {
    var artist = $("#artist").val();
    fetchArtistPlaylist(artist, false, .2);
}
function info(txt) {
    $("#info").text(txt);
}
function initUI() {
    $("#artist").on('keydown', function(evt) {
        if (evt.keyCode == 13) {
            newArtist();
        }
    });
    $("#go").on("click", function() {
        newArtist();
    });
}
$(document).ready(function() {
    initUI();
});