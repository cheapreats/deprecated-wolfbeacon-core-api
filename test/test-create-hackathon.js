var request = require('request');
request({
        method: 'POST',
        url: "http://localhost:3000/api/hackathons/",
        body: {
            id: 712,
            uuid: "ed0acef0-6078-4348-8a91-27fa51fb6851",
            data: {
                "exampleHackathonData": {
                    "Name": "Hack The Valley"
                }
            },
            userId: "151262315"
        },
        json: true,
        headers: {authorization: 'Bearer access-token-here'}
    }
    , function (error, response, body) {
        console.log(body);
    });