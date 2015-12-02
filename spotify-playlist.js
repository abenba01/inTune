//js to make playlist

var user_id;
var spotify_url = "https://api.spotify.com/v1/users/" + user_id + "/playlists";

function make_playlist (access_token, playlist_name, song_id_list) 
{
		var playlist_id;
		//create playlist and sets playlist id
		$.ajax({
			method: "POST",
            headers: {
            	'Authorization' : 'Bearer ' + access_token,
            	'Content-Type'  : 'application/json'
            },
            data: {},
            url: spotify_url,
            json: true,
            success: function (data) {
				playlist_id = data.id;
			},
			
    	});
		//add tracks to playlist
		$.ajax({
			method: "POST",
			url: spotify_url + '/' + playlist_id + '/' + song_id_list,
			headers: {
				'Authorization' : 'Bearer ' + access_token
				'Accept'		: 'application/json'
			}
		});

		return playlist_id;
}

}