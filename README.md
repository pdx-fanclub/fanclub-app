# fanclub-app

### Heroku Startup:

Our Heroku startup is uses a branch 'working' instead of master. The installation method is thusly:

``` bash

student@codeFellows$ mkdir fanclub-app
student@codeFellows$ cd fanclub-app/
student@codeFellows$ git clone https://github.com/pdx-fanclub/fanclub-app.git
student@codeFellows$ heroku create your_project_name_for_heroku
student@codeFellows$ git push heroku working:master
student@codeFellows$ heroku ps:scale web=1

```

By using working:master we tell get to push our working branch into the heroku master branch. Branches other than master are not deployed by heroku, so this is only required if you are using a non-master head.
``` bash
student@codeFellows$ heroku ps:scale web=1

```
### OAuth 2.0

Our implementation of OAuth is based on the flow as described in RFC-6749.


### Server ENV variables:

Variables can either be set in the Heroku web site, cli, or included in the .bashrc file on the server. The following script we populate the .bashrc file with the required exported vars, after you include your information.

```bash
echo 'export CLIENT_ID="**YOUR CLIENT ID HERE ****' >> ~/.bashrc
echo 'export CLIENT_SECRET="**YOUR CLIENT SECRET HERE ****' >> ~/.bashrc
echo 'export REDIRECT_URL="**YOUR REDIRECT ADDRESS HERE ****' >> ~/.bashrc
. .bashrc
```
=======
## authors
