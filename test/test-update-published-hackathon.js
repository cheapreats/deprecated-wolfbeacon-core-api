var request = require('request');

let hackathonId = 712;

request({
        method: 'POST',
        url: `http://localhost:3000/api/hackathons/${hackathonId}/is-published`,
        body: {
            id: 712,
            isPublished: false
        },
        json: true,
        headers: {authorization: 'Bearer access-token-here'}
    }
    , function (error, response, body) {
        console.log(body);
    });