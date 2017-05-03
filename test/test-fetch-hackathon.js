var request = require('request');


let hackathonId = 212;

request.get(`http://localhost:3000/hackathons/fetch?hackathonId=${hackathonId}`, function (err, res, body) {
    if (err) {
        console.log(err)
    } else {
        console.log(body);
    }
});