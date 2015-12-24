var CrowdClient = require('atlassian-crowd-client');
var User = require('atlassian-crowd-client/lib/models/user');
var async = require("async");
var settings = require('./settings');
var users = require('./data/everyone.json');

// Initialize the Crowd client:
var crowd = new CrowdClient(settings.crowd);

async.eachSeries(users, function iterator(item, callback) {
            // Create a new user:
            crowd.user.create(new User(item.firstname, item.lastname, item.displayname, item.email, item.name, item.password.value)).then(function (user) {
                console.log(user);
                callback(null);
            }, function (error) {
                console.log(error);
                callback(null);
            });
        },
        function done () {

            // Find all active groups (using Crowd Query Language):
            crowd.search.user('active=true').then(function (users) {
                console.log('Found user: ' + users);
            });
        });