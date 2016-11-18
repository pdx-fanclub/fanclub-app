
const client_id = process.env.CLIENT_ID; // eslint-disable-line
const client_secret = process.env.CLIENT_SECRET; // eslint-disable-line
const response_type = 'token';
const redirect_uri = 'http://www.functionofsound.com/callback';
const popWidth = 600, popHeight = 800, 
  popLeft = (screen.width / 2) - (popWidth /2), // eslint-disable-line
  popTop = (screen.width / 2) - (popWidth /2); // eslint-disable-line

var scopes = 'user-read-emailplaylist-read-privateplaylist-read-publicplaylist-read-collaborativeuser-follow-modifyuser-follow-readuser-library-readuser-read-birthdate';

function makeURL() {
  return 'https://accounts.spotify.com/authorize?client_id=' + process.env.CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent(redirect_uri) +
            '&scope=' + encodeURIComponent(scopes) +
            '&response_type=' + encodeURIComponent(response_type);
}

function loginToSpotify() {
  window.addEventListener('message', event => { // eslint-disable-line
    var spotifyToken = JSON.parse(event.data);
    if (spotifyToken.type == 'access_token') {
      console.log('Token recieved from spotify: ', spotifyToken);
        // Attach the token to the user accout
    } else {
      console.log('Error no token recieved.');
    }
  }, false);

    // Pop up window for user to sign into
  var x = window.open(makeURL(),'Spotify', 'menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=' + popWidth + 'popHeight=' + popHeight + 'top=' + popTop + 'left=' + left); // eslint-disable-line
}

    // click handler for 'Login with Spotify' button to call loginToSpotify()
$('#spotify-login-button').on('click', function(e){ // eslint-disable-line
  e.preventDefault();
  loginToSpotify();
});

// Listens for the token


module.exports = makeURL;
module.exports = loginToSpotify;
