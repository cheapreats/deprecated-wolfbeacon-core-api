var express = require('express');
var router = express.Router();
var validate = require('express-validator');

var Hackathon = require("../models/hackathon-model");
var hackathonValidation = require('../validations/hackathon-validation');

router.post('/create', validate(hackathonValidation.createHackathon), function (req, res) {
    var hackathon = new Hackathon({
        id: req.body.id,
        uuid: req.body.uuid,
        data: JSON.parse(req.body.data)
    });
    hackathon.save(function (err, data) {
        if (err) {
            var error = {status: 'error', message: 'Unable to store hackathon'};
            return res.json(error);
        }
        console.log('Added a new hackathon');
        console.log(data);
        var jsonData = {
            status: 'success',
            animal: data
        };
        return res.json(jsonData);
    });
});

module.exports = router;