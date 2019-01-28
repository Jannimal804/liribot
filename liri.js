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