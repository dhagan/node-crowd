var CrowdClient = require('atlassian-crowd-client');
var User = require('atlassian-crowd-client/lib/models/user');

// Initialize the Crowd client:
var crowd = new CrowdClient({
    baseUrl: 'http://localhost:8095/crowd/',
    application: {
        name: 'curl-client',
        password: '1qazxsw2'
    }
    //debug: true
});

// Create a new user:
crowd.user.create(new User('John', 'Doe', 'John Doe', 'johndoe@example.com', 'johndoe', 'secret')).then(function (user) {
    console.log(user);
}, function(error) {
    console.log(error);
});

// Authenticate to Crowd:
crowd.session.create('johndoe', 'secret').then(function (session) {
    // Fetch the user profile:
    crowd.session.getUser(session.token).then(function (user) {
        console.log('Hello, ' + user.displayname);
    });
});

// Find all active groups (using Crowd Query Language):
crowd.search.group('active=true').then(function (groups) {
    console.log('Found groups: ' + groups.length);
});