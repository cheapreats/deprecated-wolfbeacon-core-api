var request = require('request');

let hackathonId = 712;

request.get(`http://localhost:3000/hackathon/${hackathonId}`, function (err, res, body) {
    if (err) {
        console.log(err)
    } else {
        console.log(body);
    }
});