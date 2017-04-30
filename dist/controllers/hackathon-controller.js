'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hackathonService = require('../services/hackathon-service');

var _hackathonService2 = _interopRequireDefault(_hackathonService);

var _userService = require('../services/user-service');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createHackathon(req, res, next) {
    try {
        var hackathonId = parseInt(req.body.id);
        var hackathonUuid = req.body.uuid;
        var hackathonBody = req.body.data;
        var userId = req.body.userId;

        //Not consistent if one of these operations fails. Stupid MongoDB and Mongoose
        _hackathonService2.default.createHackathon(hackathonId, hackathonUuid, hackathonBody);
        _userService2.default.createOrUpsertUser(userId);
        _userService2.default.makeUserHackathonOrganiser(userId, hackathonId);
        _hackathonService2.default.addUserToHackathonOrganisers(userId, hackathonId);

        res.json({
            status: 'SUCCESS',
            message: 'Successfully created Hackathon ' + hackathonId + ' linked to user ' + userId
        });
    } catch (e) {
        console.error(e);
        res.json({ status: 'ERROR', message: 'Unable to create hackathon' });
    }
}

function getHackathonDataAsOrganiser(req, res) {}

exports.default = { createHackathon: createHackathon, getHackathonDataAsOrganiser: getHackathonDataAsOrganiser };
//# sourceMappingURL=hackathon-controller.js.map