var CrowdClient = require('atlassian-crowd-client');
var User = require('atlassian-crowd-client/lib/models/user');
var async = require("async");

// Initialize the Crowd client:
var crowd = new CrowdClient({
    baseUrl: 'http://localhost:8095/crowd/',
    application: {
        name: 'curl-client',
        password: '1qazxsw2'
    }
    //debug: true
});

async.waterfall(
    [
        function (next) {
            // Create a new user:
            crowd.user.create(new User('John', 'Doe', 'John Doe', 'johndoe@example.com', 'johndoe', 'secret')).then(function (user) {
                console.log(user);
                next(null);
            }, function (error) {
                console.log(error);
                next(null);
            });
        }, function (next) {

            // Find all active groups (using Crowd Query Language):
            crowd.search.group('active=true').then(function (groups) {
                console.log('Found groups: ' + groups.length);
            });
        }
    ]);