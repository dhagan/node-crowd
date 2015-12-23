var CrowdClient = require('atlassian-crowd-client');
var User = require('atlassian-crowd-client/lib/models/user');
var async = require("async");
var settings = require('./settings');
var _ = require('lodash');

// Initialize the Crowd client:
var crowd = new CrowdClient(settings.crowd);

var users =  [
    //{"name":"cpicklo","firstname":"John","lastname":"Doe","displayname":"John Doe","email":"johndoe@example.com","active":true,"password":{"value":"secret"}},
    {"name":"dhagan-1","firstname":"John","lastname":"Doe","displayname":"John Doe","email":"johndoe@example.com","active":true,"password":{"value":"secret"}}
    //{"name":"jjacobs","first-name":"John","last-name":"Doe","display-name":"John Doe","email":"johndoe@example.com","active":true,"password":{"value":"secret"}},
    //{"name":"csmith","first-name":"John","last-name":"Doe","display-name":"John Doe","email":"johndoe@example.com","active":true,"password":{"value":"secret"}},
    //{"name":"rbays","first-name":"John","last-name":"Doe","display-name":"John Doe","email":"johndoe@example.com","active":true,"password":{"value":"secret"}},
    //{"name":"tmoscatelli","first-name":"John","last-name":"Doe","display-name":"John Doe","email":"johndoe@example.com","active":true,"password":{"value":"secret"}},
    //{"name":"rsova","first-name":"John","last-name":"Doe","display-name":"John Doe","email":"johndoe@example.com","active":true,"password":{"value":"secret"}}
    ];


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
            crowd.search.group('active=true').then(function (groups) {
                console.log('Found groups: ' + groups.length);
            });
        });