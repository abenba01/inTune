//js to make playlist

var user_id;
var spotify_url = "https://api.spotify.com/v1/users/" + user_id + "/playlists";

/*
 * PURPOSE: Creates new playlist for client given access_token and name of playlist.
 *    ARGS: Access-token: token of client used for authentication, playlist-name - the
 *          the for the new playlist
 *  RETURN: The id of the newly created playlist
 */
function make_playlist (access_token, playlist_name) 
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
			}
			
    	});

		return playlist_id;
}

/*
 * PURPOSE: Adds tracks to a specified playlist.
 *    ARGS: Access-token: token of client used for authentication; playlist-id - the
 *          id of the playlist to be edited; song_id_list - a list of songs to be added
 *  RETURN: The id of the edited playlist
 */
function add_tracks (access_token, playlist_id, song_id_list)
{
		$.ajax({
			method: "POST",
			url: spotify_url + '/' + playlist_id + '/' + song_id_list,
			headers: {
				'Authorization' : 'Bearer ' + access_token,
				'Accept'		: 'application/json'
			}
		});
		return playlist_id;
}

