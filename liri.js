
//At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys");

//Add 'request' NPM
var request = require("request");

//Add 'fs' NPM
var fs = require("fs");

//Add 'node-spotify-api' NPM
var NodeSpotifyAPI = require("node-spotify-api");

//Add 'moment' NPM
var moment = require("moment");

//You should then be able to access your keys information like so
//var spotify = new Spotify(keys.spotify);


// Create the LIRI constructor
var LIRI = function () {
    // divider will be used as a spacer between the LIRI data we print in log.txt
    var divider =
        "\n------------------------------------------------------------\n\n";

    //============================================Bands in Town===========
    //=======Bands in Town================================================
    // `node liri.js concert-this <artist/band name here>`

    //    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

    this.findArtist = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        //If the user doesn't type an artist in, the program will output data for the artist 'Vince Gill.'
        if (!artist) {
            artist = 'Vince Gill';
        }

        request(URL, function (err, response, body) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            // parse the response body (string) to a JSON object
            var jsonData = JSON.parse(body)[0];

            // showData ends up being the string containing the show data we will print to the console
            var showData = [
                divider,
                //      * Name of the venue
                "Name of the venue: " + jsonData.venue.name,

                //      * Venue location
                "Venue location: " + jsonData.venue.city + ", " + jsonData.venue.region,

                //      * Date of the Event (use moment to format this as "MM/DD/YYYY")
                "Date of the Event: " + moment(jsonData.datetime).format('MMMM Do YYYY, h:mm:ss a'),
                divider
            ].join("\n\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw err;
                console.log(showData);
            });

        });
    };


    //=================Spotify=================Spotify====================
    //=======Spotify===============Spotify=====================Spotify====
    // `node liri.js spotify-this-song '<song name here>'`

    //    * This will show the following information about the song in your terminal/bash window
    this.spotify = function (song) {

        var spotify = new NodeSpotifyAPI(keys.spotify);
        //If no song is provided then your program will default to "The Sign" by Ace of Base.
        if (!song) {
            song = 'The Sign';
        }
        spotify.search({ type: 'track', query: song }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            var songInfo = data.tracks.items;

            // showData ends up being the string containing the show data we will print to the console
            var showData = [

                divider,

                //      * Artist(s)
                "Artist(s): " + songInfo[0].artists[0].name,

                //      * The song's name
                "Song Name: " + songInfo[0].name,

                //      * A preview link of the song from Spotify
                "Preview Link: " + songInfo[0].preview_url,

                //      * The album that the song is from
                "Album: " + songInfo[0].album.name,

                divider
            ].join("\n\n");
            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw err;
                console.log(showData);

            });
        })
    }


    //==================Movie=================Movie=================Movie=
    //=======Movie=================Movie=================Movie============
    // `node liri.js movie-this '<movie name here>'`
    this.findMovie = function (movie) {
        var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        if (!movie) {
            movie = 'Mr. Nobody';
        }

        request(URL, function (err, response, body) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            // parse the response body (string) to a JSON object
            var jsonData = JSON.parse(body);

            // showData ends up being the string containing the show data we will print to the console
            var showData = [
                //    * This will output the following information to your terminal/bash window:
                divider,
                //        * Title of the movie.
                "Title of the movie: " + jsonData.Title,

                //        * Year the movie came out.
                "Year the movie came out: " + jsonData.Released,

                //        * IMDB Rating of the movie.
                "IMDB Rating of the movie: " + jsonData.imdbRating,

                //        * Rotten Tomatoes Rating of the movie.
                "Rotten Tomatoes Rating of the movie: " + jsonData.Ratings[1].Value,

                //        * Country where the movie was produced.
                "Country where the movie was produced: " + jsonData.Country,

                //        * Language of the movie.
                "Language of the movie: " + jsonData.Language,

                //        * Plot of the movie.
                "Plot of the movie: " + jsonData.Plot,

                //        * Actors in the movie.
                "Actors in the movie: " + jsonData.Actors,
                divider
            ].join("\n\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", showData + divider, function (err) {
                if (err) throw err;
                console.log(showData);
            });
        });
    };


    //===========================================.fs.random.txt===========
    //=======.fs.random.txt===============================================

    // `node liri.js do-what-it-says`
    this.doThis = function () {
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) throw err;
            //console.log(data);

            var dataArr = data.split(",");

            // Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
            if (dataArr[0] === "spotify-this-song") {
                var songcheck = dataArr[1].slice(1, -1);
                //console.log(songcheck);
                spotify(songcheck);

            }

        })

        //    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

        //      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

        //      * Edit the text in random.txt to test out the feature for movie-this and concert-this.

    }

}; //<=============!!!IMPORTANT!!!! LIRI(); ENDS HERE====XXXXXXXXXXXXX

//=======================================Keyword Commands=============
//=======Keyword Commands=============================================

// Create a new liri object
var liri = new LIRI();

var divider =
    "\n------------------------------------------------------------\n\n";

// Grab search command line argument
var search = process.argv[2];
// Joining the remaining arguments since an actor or liri show name may contain spaces
var term = process.argv.slice(3).join("+");


//=====* `concert-this`==========
if (!search) {
    search = "concert-this";
}

//=====* `spotify-this-song`=====
if (!term) {
    term = "Blake Shelton";
}


//=====* `movie-this`============
if (!term) {
    term = "The GodFather";
}

//=====* `do-what-it-says`=======
if (!term) {
    term = "Tom Hanks";
}

// Print whether searching for a concert, song, or movie, print the term as well
//=====* `concert-this`==========
if (search === "concert-this") {
    console.log(divider);
    console.log("Searching for the earliest concert......");
    liri.findArtist(term);
}
//=====* `spotify-this-song`=====
else if (search === "spotify-this-song") {
    liri.spotify(term);
    console.log(divider);
    console.log("Searching for Song......");
}
//=====* `movie-this`============
else if (search === "movie-this") {
    liri.findMovie(term);
    console.log(divider);
    console.log("Searching for Movie......");
}
//=====* `do-what-it-says`=======  
else {
    liri.doThis(term);
    console.log(divider);
    console.log("Doing what I'm programmed to do now......");
};
