
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const response_type = token;
const redirect_uri = 'http://song-club.herokuapp.com/';
const popWidth = 600, popHeight = 800, 
    left = (screen.width / 2) - (width /2),
    top = (screen.width / 2) - (width /2);

var scopes = 'user-read-email playlist-read-private playlist-read-public playlist-read-collaborative user-follow-modify user-follow-read user-library-read user-read-birthdate';
scopes = scopes.join(' ');

function makeURL() {
        return 'https://accounts.spotify.com/authorize?client_id=' + process.env.CLIENT_ID +
               '&redirect_uri=' + encodeURIComponent(redirect_uri) +
               '&scope=' + encodeURIComponent(scopes) +
               '&response_type=' + encodeURIComponent(response_type)
};

function loginToSpotify() {

    // Listens for the token
    window.addEventListener("message", event => {
        var spotifyToken = JSON.parse(event.data);
        if (spotifyToken.type == "access_token") {
            console.log('Token recieved from spotify: ', spotifyToken);
            // Attach the token to the user accout

        } else {
            console.log('Error no token recieved.')
        }
    }, false);

    // Pop up window for user to sign into
    var x = window.open(
                makeURL(),
                'Spotify',
                'menubar=no,location=no,resizable=no,scrollbars=no,status=no,popWidth=' + width + 'popHeight=' + height + 'top=' + top + 'left=' + left);
};

module.exports = makeURL;
module.exports = loginToSpotify;
