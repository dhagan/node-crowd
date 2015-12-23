# node-crowd

install nodejs
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get install npm
optional - install webstorm

npm install

set credentials in settings.js

var crowd = new CrowdClient({
   baseUrl: 'http://localhost:8095/crowd/',
   application: {
       name: 'curl-client',
       password: '1qazxsw2'
   }
   //debug: true
});


node create-users.js