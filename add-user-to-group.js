var CrowdClient = require('atlassian-crowd-client');
var async = require("async");
var settings = require('./settings');
var users = require('./data/everyone.json');

// Initialize the Crowd client:
var crowd = new CrowdClient(settings.crowd);

var groupName = 'Everyone';

async.eachSeries(users, function iterator(item, callback) {
        // add user to group:
        crowd.group.users.add(groupName, item.name).then(function (user) {
            console.log('success');
            callback(null);
        }, function (error) {
            console.log(error);
            callback(null);
        });
    },
    function done () {
        // Find all active groups (using Crowd Query Language):
        crowd.group.users.list(groupName).then(function (members) {
            console.log('Found ' + groupName + ' membership: ' + members);
        });
    });