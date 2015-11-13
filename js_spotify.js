// Javascript file for Spotify elements of inTune
// will deal with authentication of user, playing music, and creating playlists



//authorize 
//1. request authorization
//	send: get to https://accounts.spotify.com/authorize
//		  -query includes client_id for spotify; response_type: code; redirect_uri: must be
//        registered on spotify app page; state: optional, scope: optional, space serpated
//		  list of access scopes (playlist-modify-public, playlist-modify-private, user-follow-read,
//		  user-library-read, user-read-email, user-read-private @ https://developer.spotify.com/web-api/using-scopes/);
//		  show_dialog: false

//2. user authorizes access through spotify log in page if not logged in. 

//3. user redirected to specified URI (eg: https://example.com/callback)
//	response: if accepted - code (authorization code); state.
//			  if not accepted - error; state

//4. app requests refresh and access tokens
//	send: post to https://accounts.spotify.com/api/token
//	      -querey includes grant_type: "authorization_code"; code: authorization code returned;
//		  redirect_uri: uri used for validation only, not redirection. must match requets uri
//		  -header includes authorization: base 64 encoded string with client id and secret key 
//		  format: Authorization: Basic <base64 encoded client_id:client_secret> or in as request
//		  post body instead

//5. Tokens returned to app
//	`-if success status 200 
//	 -JSON: access_token (string), token_type (string) always Bearer, expires_in (int), 
//	  refresh_token (string) can be sent in place of auth code (when expires send POST to 
//    /api/token with new token to get back new access token)

function authorize () {
	$.ajax({type: "GET",
            crossDomain : true,
            url: url,
            headers: {
            	'Authorization' : 'Bearer ' + accessToken
            contentType: "application/json",
            success: function(data) {
            	console.log(data.id);

            	pullSongs(input,data.id);
            }
    	});

	
}