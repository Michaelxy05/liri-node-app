# LIRI-Node-App

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

You can view a glimpse of my project here:
https://drive.google.com/file/d/1JMMtD9C9XRy5inGEfQvhEVbzQAutv2oV/view?usp=sharing

To retrieve the data that will power this app, you'll need to send requests to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.

## NPM packages used

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

   * [Request](https://www.npmjs.com/package/request)

   * [Moment](https://www.npmjs.com/package/moment)

   * [DotEnv](https://www.npmjs.com/package/dotenv)
   
## Request to grab data(API) from:
   
   * [OMDB API](http://www.omdbapi.com)
   
   * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
   
   To use this project, using Bash, Powershell, etc... first type in 'node liri.js' followed by the following commands:
   
   --Keep in mind you can only make one of the following commands at a time--

   * `concert-this` -- then followed by a band or single artist
          
          * Name of the venue

          * Venue location

          * Date of the Event (use moment to format this as "MM/DD/YYYY")

   * `spotify-this-song` -- then followed by a title of a song
          
           * Artist(s)

           * The song's name

           * A preview link of the song from Spotify

           * The album that the song is from

   * `movie-this` -- then followed by a title of a movie
   
           * Title of the movie.
           * Year the movie came out.
           * IMDB Rating of the movie.
           * Rotten Tomatoes Rating of the movie.
           * Country where the movie was produced.
           * Language of the movie.
           * Plot of the movie.
           * Actors in the movie.

   * `do-what-it-says` -- then followed by pressing enter
   
           * It should run `spotify-this-song` for "I Want it That Way"
