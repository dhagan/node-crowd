var CrowdClient = require('atlassian-crowd-client');
var Group = require('atlassian-crowd-client/lib/models/group');
var async = require("async");
var settings = require('./settings');
var _ = require('lodash');

// Initialize the Crowd client:
var crowd = new CrowdClient(settings.crowd);

var groups =  [
    {"name":"Everyone"},
    {"name":"RTOP11Admin"},
    {"name":"RTOP12Admin"}
    ];

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
        function done () {

            // Find all active groups (using Crowd Query Language):
            crowd.search.group('active=true').then(function (groups) {
                console.log('Found groups: ' + groups);
            });
        });