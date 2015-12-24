var CrowdClient = require('atlassian-crowd-client');
var Group = require('atlassian-crowd-client/lib/models/group');
var async = require("async");
var settings = require('./settings');


// Initialize the Crowd client:
var crowd = new CrowdClient(settings.crowd);

var users = require('./data/everyone.json');
var groups = require('./data/groups.json');


async.series([
    function(callback) {
        deleteUsers(callback);
    },
    function(callback) {
        deleteGroups(callback);
    },
    function(callback) {
        addUsersToGroup(callback);
    }
]);

function deleteUsers(theCallBack) {
    async.eachSeries(users, function iterator(item, callback) {
            // delete  user:
            crowd.user.remove(item.name).then(function (group) {
                console.log('success');
                callback(null);
            }, function (error) {
                console.log(error);
                callback(null);
            });
        },
        function done () {
            // Find all active groups (using Crowd Query Language):
            crowd.search.user('active=true').then(function (users) {
                console.log('Found users: ' + users);
            });
            theCallBack();
        });
}

function deleteGroups(theCallBack) {
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
                theCallBack();
            });
        });
}
