"use strict";

var request = require('request');

var myJSONObject = {
    id: 15,
    uuid: "1sd19823412342",
    data: {
        "hello": {
            "World": "is dead"
        }
    },
    userId: "d0"
};

request({
    url: "http://localhost:3000/hackathons/create",
    method: "POST",
    json: true, // <--Very important!!!
    body: myJSONObject
}, function (error, response, body) {
    console.log(body);
});
//# sourceMappingURL=test-create-hackathon.js.map