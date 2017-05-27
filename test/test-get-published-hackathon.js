var request = require('request');

let hackathonId = 712;

request.get(`http://localhost:3000/api/hackathons/${hackathonId}/is-published`, function (err, res, body) {
    if (err) {
        console.error(err)
    } else {
        console.log(body);
    }
});