var CrowdClient = require('atlassian-crowd-client');
var Group = require('atlassian-crowd-client/lib/models/group');
var async = require("async");
var settings = require('./settings');

// Initialize the Crowd client:
var crowd = new CrowdClient(settings.crowd);

var groups = require('./data/groups.json');

async.eachSeries(groups, function iterator(item, callback) {
        // delete new group by name:
        crowd.group.remove(item.name).then(function (group) {
            console.log('success');
            callback(null);
        }, function (error) {
            console.log(error);
            callback(null);
        });
    },
    function done () {
        // Find all active groups (using Crowd Query Language):
        crowd.search.group('active=true').then(function (groups) {
            console.log('Found groups: ' + groups);
        });
    });