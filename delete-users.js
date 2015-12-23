var CrowdClient = require('atlassian-crowd-client');
var User = require('atlassian-crowd-client/lib/models/user');
var async = require("async");
var settings = require('./settings');
var _ = require('lodash');

// Initialize the Crowd client:
var crowd = new CrowdClient(settings.crowd);


async.waterfall(
    [
        function (next) {
            // Find all active groups (using Crowd Query Language):
            crowd.search.group('active=true').then(function (groups) {
                    console.log('Found groups: ' + groups);
                next(null);
            }, function (error) {
                console.log(error);
                next(null);
            });
        }, function (next) {
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