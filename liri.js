require("dotenv").config();

var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

if (command === "concert-this") { 
    concertThis();
}
else if (command === "spotify-this-song"){
  spotifyThis();
}
else if (command === "movie-this"){
  movieThis();
}

//concert-this 
function concertThis() { 

var artist = process.argv[3];

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log(response.data[0].venue.name);
    console.log(response.data[0].venue.city);
    console.log(moment(response.data[0].datetime).format("L"));
  }
); 
}

//spotify-this-song
function spotifyThis(){
var song = process.argv[3];
 
spotify.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
  console.log(data.tracks.items[0].album.artists[0].name);
  console.log(data.tracks.items[0].name);
  console.log(data.tracks.items[0].preview_url);
  console.log(data.tracks.items[0].album.name);
});

}

//movie-this
function movieThis(){
 var movie = process.argv[3];

 axios.get("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
   function(response) {
     console.log(response.data.Title);
     console.log(response.data.Year);
     console.log(response.data.Ratings[1]);
     console.log(response.data.Country);
     console.log(response.data.Language);
     console.log(response.data.Plot);
     console.log(response.data.Actors);
   }
 )

}