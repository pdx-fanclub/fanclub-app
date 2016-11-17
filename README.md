# Function Of Sound

## Description

This web-app connects music lovers with playlists and genre suggestions using the Spotify API. It primarily allows users to trade playlists and song suggestions.

### Live Site

[The live site is www.FunctionOfSound.com ](HTTPS://www.FunctionOfSound.com/)


### Heroku deployment:

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

### HTTPS / SSL in heroku:

SSL/https are becoming the prevalent standard for securing web development. Additionally we wanted to have an HTTPS endpoint to secure the token exchange with spotify. While signing creating and signing our own certificate is certainly possible, we chose the letsEncrypt.com a 503(c) which lowers the cost of entry for developers looking for a certificate authority. Lets encrypt is relatively new however it has support from Mozilla, Google, Cisco, Facebook, et al;

 1. [Register a domain name and add it to Heroku:](https://devcenter.heroku.com/articles/custom-domains) google.domains for our team
 2. Redirect the registar DNS to the certificate agent: DNSimple for our team
 3. Apply for certificates from LetsEncrypt using the DNSimple web gui
 4. Wait... certificate authority needs to verify your control of the domain and issue certificates
 5. Download the signed SSL certificates
 6. [Use the heroku CLI to upload the *.key and *.pem files](https://devcenter.heroku.com/articles/ssl#add-certificate-and-intermediaries)
 7. Update your DNS entries to the new location provided by heroku
 8. Verify the certs are applied properly

``` bash
    heroku certs:info
    Fetching SSL tyrannosaurus-87601 info for exampleapp... done
    Certificate details:
    Expires At: 2012-10-31 21:53:18 GMT
    Issuer: C=US; ST=CA; L=SF; O=Heroku; CN=www.example.com
    Starts At: 2011-11-01 21:53:18 GMT
    Subject: C=US; ST=CA; L=SF; O=Heroku; CN=www.example.com
```

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

### authors

The Authors in order of proximity to the wifi hotspots:

Greg Katchmar
Will Wilkerson 
Drew Stock
Tom Schultz
Albert Reel

### Database

This project uses a Mongo database with Mongoose. The server is provided by mlab.com.

### Front to backend communication

Our client and server side JS use AJAX calls to send data between the computers.