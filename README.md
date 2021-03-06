#inTune: Music for your Mood 

Problem 
------

Why do we listen to what we listen to? Because of how we're feeling. Oftentimes we spend countless minutes searching for a playlist, or searching through playlists to find songs, that fit your mood. We all know how frustrating it is when it’s hard to find what you really want to listen to. The issue is that there is no way to customize my music library for my mood. 

Solution
------

Many music platforms are aimed at addressing what music you should listen to and how you listen to it. inTune goes to the root of the problem: *why* are you feeling the way you're feeling? Oftentimes we don't recognize the many factors that affect our mood such as weather, location and time of day. inTune takes into account these external variables and makes you a customized mix based on your personal music preferences. inTune translates how you feel to what you listen to without explicitly having to search for a particular “mood” of music.

List of Features
------

- **Geolocation:** determines user's location to adjust music to fit the time of day, time of year, season, and weather of the given location.

- **Client-side data persistence:** uses name of playlist and originaly selected artists in localstorage

- **Push notifications:** notifies user if s/he has a saved playlist upon return to the site

- **Front-end framework:** enables user to intuitively interact with the web app

- **Server-side data persistence:** enables users to save a playlist via MongoDB

- **Streaming music:** uses Spotify to play music

- **Music recommendations:** creates playlist with artists similar to those selected by the user. Takes into account acousticness, danceability, and energy scores based on weather

Scope
------

- This app only plays music if the user signs in to Spotify.
- This app only considers the first five artists that the user selects during playlist creation (i.e., any artist selected after the fifth one will be disregarded).
- Ths app does not enable users to search for artists, genres, albums, etc. to fit their preferences.
- This app should not be used to get accurate weather forecasts of locations.
- This app enables users to save only one playlist.
- This app does not include certain weather conditions (e.g., foggy).
- This app does not allow users to choose a location not listed in the predetermined list of locations. However, the app will still work if the user is in a location that is not in the list.
- This app's mobile functionality is different than its computer functionality (i.e., it does not send push notifications or consider the user's location).


Known Limitations
------

- Users might click on two bubbles at once if they overlap.
- The index.html page and its contents are not responsive to changes in window size without a refresh.
- Users cannot remove artists added to the list of bubbles (unless they refresh the page).

Data Collection
------

inTune collects music preferences specified by user input. The app uses geolocation, weather data, and time of day to determine the user's mood and provide music based off of this calculated mood. The app also collects the users saved playlists. 

Algorithms
------

inTune uses a custom made state of the art music filtering algorithm. The algorithm uses affective information such as geolocation, weather, and time data to determine the levels of acousticness, danceability, and energy of the songs suggested songs. This information is then combined with the users input of prefered artists and a customized mix is generated.

Users can also change the location and weather if they desire an experience different from that provided by their current location and weather.

Comments by Ming (from original project proposal)
------
* I like this
* You fell into the trap that I didn't want you to fall into.  You listed "Geolocation" and "Data/screen scraping".  But for _what_?  What will you be data scraping?  I see that you mentioned in algorithms "We will be using geolocation, weather data and time of day for our service" --what you should have wrote for features: "Determine your modd by geolocation, weather data, and time of day for server".  Now that would be fantastic!
