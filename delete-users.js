var CrowdClient = require('atlassian-crowd-client');
var async = require("async");
var settings = require('./settings');
var users = require('./data/everyone.json');

// Initialize the Crowd client:
var crowd = new CrowdClient(settings.crowd);

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
    });

/*
async.waterfall(
    [
        function (next) {
            // Find all active groups (using Crowd Query Language):
            crowd.search.user('active=true').then(function (users) {
                console.log('Found users: ' + users);
                next(null, users);
            }, function (error) {
                console.log(error);
                next(null);
            });
        }, function (users, next) {
            var index = users.indexOf('admin');
            if (index > -1) {
                users.splice(index, 1);
            }
            console.log('Found users: ' + users);
            // Find all active users (using Crowd Query Language):
            crowd.search.user('active=true').then(function (users) {
                console.log('Found users: ' + users);
                next(null);
            }, function (error) {
                console.log(error);
                next(null);
            });
        }
    ]);

   */