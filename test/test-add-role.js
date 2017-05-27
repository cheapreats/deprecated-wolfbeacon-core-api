var request = require('request');
request({
        method: 'POST',
        url: "http://localhost:3000/api/hackathons/712/roles",
        body: {
            userId: "91312",
            role: 'organiser'
        },
        json: true,
        headers: {authorization: 'Bearer access-token-here'}
    }
    , function (error, response, body) {
        console.log(body);
    });