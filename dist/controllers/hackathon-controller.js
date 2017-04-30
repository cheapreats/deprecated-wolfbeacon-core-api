'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hackathonService = require('../services/hackathon-service');

var _hackathonService2 = _interopRequireDefault(_hackathonService);

var _userService = require('../services/user-service');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createHackathon(req, res) {
    var hackathonId = req.body.id;
    var hackathonUuid = req.body.uuid;
    var hackathonBody = req.body.data;
    var userId = req.body.userId;

    _hackathonService2.default.createHackathon(hackathonId, hackathonUuid, hackathonBody).then(_userService2.default.createOrUpsertUser(userId)).then(_userService2.default.makeUserHackathonOrganiser(userId, hackathonId)).then(_hackathonService2.default.addUserToHackathonOrganisers(userId, hackathonId)).then(res.json({
        status: 'SUCCESS',
        message: 'Successfully created Hackathon ' + hackathonId + ' linked to user ' + userId
    })).catch(function (e) {
        res.json({ status: 'ERROR', message: 'Unable to create hackathon' });
        console.error(e);
    });
}

function getHackathonDataAsOrganiser(req, res) {}

exports.default = { createHackathon: createHackathon, getHackathonDataAsOrganiser: getHackathonDataAsOrganiser };
//# sourceMappingURL=hackathon-controller.js.map