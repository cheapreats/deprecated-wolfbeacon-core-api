'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hackathonService = require('../services/hackathon-service');

var _hackathonService2 = _interopRequireDefault(_hackathonService);

var _userService = require('../services/user-service');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createHackathonController(req, res, next) {
    var hackathonId = parseInt(req.body.id);
    var hackathonUuid = req.body.uuid;
    var hackathonData = req.body.data;
    var userId = req.body.userId;

    //Not consistent if one of these operations fails. MongoDB and Mongoose smh...
    //Tried enforcing promises to make flow better and ensure forward consistency atleast
    //Kept the closure going, I could avoid promise nesting but wouldn't be able to log
    _hackathonService2.default.createHackathon(hackathonId, hackathonUuid, hackathonData).then(function (addedHackathon) {
        console.log('Hackathon added: \n ' + addedHackathon);
        _userService2.default.createOrUpsertUser(userId).then(function (addedUser) {
            console.log('User upserted: \n ' + addedUser);
            _hackathonService2.default.addUserToHackathonOrganisers(userId, hackathonId).then(function (upsertedUser) {
                console.log('User ' + upsertedUser + ' added as organisers to Hackathon ' + addedHackathon);
                _userService2.default.makeUserHackathonOrganiser(userId, hackathonId).then(function (user) {
                    console.log('User ' + upsertedUser + ' is organising of Hackathon ' + addedHackathon);
                    res.json({
                        status: 'SUCCESS',
                        message: 'Successfully created Hackathon ' + hackathonId + ' linked to user ' + userId
                    });
                });
            });
        });
    }).catch(function (err) {
        console.error(err);
        res.json({ status: 'ERROR', message: 'Unable to create hackathon' });
    });
}

function fetchHackathonDetailsController(req, res) {
    var hackathonId = parseInt(req.query.hackathonId);
    _hackathonService2.default.fetchHackathonDetails(hackathonId).then(function (data) {
        res.json(data.data);
    }).catch(function (err) {
        console.log(err);
    });
}

exports.default = { createHackathonController: createHackathonController, fetchHackathonDetailsController: fetchHackathonDetailsController };
//# sourceMappingURL=hackathon-controller.js.map