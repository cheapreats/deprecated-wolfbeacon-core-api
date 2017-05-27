var request = require('request');

let hackathonId = 712;

request.get(`http://localhost:3000/api/hackathons/${hackathonId}/organisers`, function (err, res, body) {
    console.log((err?err:body))
});

request.get(`http://localhost:3000/api/hackathons/${hackathonId}/participants`, function (err, res, body) {
    console.log((err?err:body))
});

request.get(`http://localhost:3000/api/hackathons/${hackathonId}/volunteers`, function (err, res, body) {
    console.log((err?err:body))
});

request.get(`http://localhost:3000/api/hackathons/${hackathonId}/mentors`, function (err, res, body) {
    console.log((err?err:body))
});