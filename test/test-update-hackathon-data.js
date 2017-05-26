var request = require('request');

let hackathonId = 712;

request({
        method: 'POST',
        url: `http://localhost:3000/api/hackathons/${hackathonId}/data`,
        body: {
            id: 712,
            data: {
                "exampleHackathonData": {
                    "Name": "Hack The Valley",
                    "Organiser": "Ralfie buoy"
                }
            }
        },
        json: true,
        headers: {authorization: 'Bearer access-token-here'}
    }
    , function (error, response, body) {
        console.log(body);
    });