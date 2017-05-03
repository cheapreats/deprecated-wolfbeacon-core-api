var request = require('request');

var myJSONObject = {
    id : 212,
    uuid: "qdfqwe1dg13rgagqegqweg",
    data: {
        "hello" : {
            "World" : "is dead"
        }
    },
    userId: "master"
};

request({
    url: "http://localhost:3000/hackathons/create",
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
    console.log(body);
});
