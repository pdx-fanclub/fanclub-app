# fanclub-app

## Description

This web-app connects music lovers with playlists and genre suggestions using the Spotify API. It primarily allows users to trade playlists and song suggestions.

### Live Site 

[The live site is located at:](http://song-club.herokuapp.com/)


### Heroku Startup: 

Our Heroku startup uses a branch 'working' instead of master. The installation method is thusly:

``` bash

student@codeFellows$ mkdir fanclub-app
student@codeFellows$ cd fanclub-app/
student@codeFellows$ git clone https://github.com/pdx-fanclub/fanclub-app.git
student@codeFellows$ heroku create your_project_name_for_heroku
student@codeFellows$ git push heroku working:master
student@codeFellows$ heroku ps:scale web=1

```

By using working:master we tell git to push our working branch into the Heroku master branch. Branches other than master are not deployed by heroku, so this is only required if you are using a non-master head.

### OAuth 2.0

Our implementation of OAuth is based on the flow as described in RFC-6749. Currently we are using the implicit non-renewable token route as outlined in the Spotify API docs. 

* loginToSpotify()
This creates a pup-up window to a secure Spotify server which allows our users to sign into their accounts. After signning in, a temporary token is generated to allow the user and our server access to Spotify's full features. 

* makeURL()
creates the request url given the params set as const, only scopes is a var which is planning for future scope escalation integration.

### Server ENV variables:

Variables can either be set in the Heroku web site, cli, or included in the .bashrc file on the server. The following script will populate the .bashrc file with the required exported vars, after you include your information.

```bash
echo 'export CLIENT_ID="**YOUR CLIENT ID HERE ****"' >> ~/.bashrc 
echo 'export CLIENT_SECRET="**YOUR CLIENT SECRET HERE ****"' >> ~/.bashrc
echo 'export REDIRECT_URL="**YOUR REDIRECT ADDRESS HERE ****"' >> ~/.bashrc 
. .bashrc 
```

### Database

This project uses a Mongo database with Mongoose. The server is provided by mlab.com.