var express = require('express');
var router = express.Router();
var validate = require('express-validator');

var hackathonValidation = require('../validations/hackathon-validation');
var hackathonService = require('../services/hackathon-service');
var userService = require('../services/user-service');

router.post('/create', validate(hackathonValidation.createHackathon), function (req, res) {
    var hackathonId = req.body.id;
    var hackathonUuid = req.body.uuid;
    var hackathonBody = req.body.data;
    var userId = req.body.userId;

    hackathonService.createHackathon(hackathonId, hackathonUuid, hackathonBody)
        .then(userService.createOrUpsertUser)
        .then(userService.makeUserHackathonOrganiser(userId, hackathonId))
        .then(hackathonService.addUserToHackathonOrganisers(userId, hackathonId)).catch(function (error) {
        console.error(error);
        var errorResponse = {status: 'ERROR', message: 'Unable to store hackathon'};
        return res.json(errorResponse);
    });

    var successResponse = {
        status: 'SUCCESS',
        insertedHackathonId: hackathonId
    };
    return res.json(successResponse);

});

module.exports = router;