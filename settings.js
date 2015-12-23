'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var settings =  {
  crowd: {
    baseUrl: 'http://localhost:8095/crowd/',  // The part that comes before 'rest/usermanagement/1'.
    application: {
      name: 'curl-client',                     // Crowd application name.
      password: '1qazxsw2'                   // Crowd application password.
    },
    nesting: false,                         // Does your backend support nesting? OpenLDAP doesn't.
    sessionTimeout: 600,                    // Session timeout in seconds. Can never be more than the one configured in Crowd.
    //debug: true                            // Enables verbose logging of requests and responses.
  }
};


exports['default'] = settings;
module.exports = exports['default'];