# node-crowd

install nodejs from the tar.gz
apt-get install npm
optional - install webstorm

npm install

set credentials

var crowd = new CrowdClient({
   baseUrl: 'http://localhost:8095/crowd/',
   application: {
       name: 'curl-client',
       password: '1qazxsw2'
   }
   //debug: true
});


node create-users.js