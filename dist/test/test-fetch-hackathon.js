'use strict';

var request = require('request');

var hackathonId = 212;

request.get('http://localhost:3000/hackathons/fetch?hackathonId=' + hackathonId, function (err, res, body) {
    if (err) {
        console.log(err);
    } else {
        console.log(body);
    }
});
//# sourceMappingURL=test-fetch-hackathon.js.map