var request = require('request');

let hackathonId = 712;

request.get(`http://localhost:3000/api/hackathons/${hackathonId}/roles`, function (err, res, body) {
    console.log((body))
});