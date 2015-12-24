var CrowdClient = require('atlassian-crowd-client');
var User = require('atlassian-crowd-client/lib/models/user');
var Group = require('atlassian-crowd-client/lib/models/group');
var async = require("async");
var settings = require('./settings');


// Initialize the Crowd client:
var crowd = new CrowdClient(settings.crowd);

var users = require('./data/everyone.json');
var groups = require('./data/groups.json');
var groupName = 'Everyone';

async.series([
    function(callback) {
        createUsers(callback);
    },
    function(callback) {
        createGroups(callback);
    },
    function(callback) {
        addUsersToGroup(callback);
    }
]);

function createUsers(theCallBack) {
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
        function done() {
            // Find all active groups (using Crowd Query Language):
            crowd.search.user('active=true').then(function (users) {
                console.log('Found user: ' + users);
                theCallBack();
            });
        });
}

function createGroups(theCallBack) {
    async.eachSeries(groups, function iterator(item, callback) {
            // Create a new group:
            crowd.group.create(new Group(item.name)).then(function (group) {
                console.log(group);
                callback(null);
            }, function (error) {
                console.log(error);
                callback(null);
            });
        },
        function done() {

            // Find all active groups (using Crowd Query Language):
            crowd.search.group('active=true').then(function (groups) {
                console.log('Found groups: ' + groups);
                theCallBack();
            });
        })
}

function addUsersToGroup(theCallBack) {
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
        function done() {
            // Find all active groups (using Crowd Query Language):
            crowd.group.users.list(groupName).then(function (members) {
                console.log('Group: ' + groupName + ' - membership: ' + members);
                theCallBack();
            });
        })
}