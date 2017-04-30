'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hackathonModel = require('../models/hackathon-model');

var _hackathonModel2 = _interopRequireDefault(_hackathonModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HackathonService = {

    /**
     * Creating a Hackathon Service
     */

    createHackathon: function createHackathon(hackathonId, hackathonUuid, hackathonData) {
        var hackathon = new _hackathonModel2.default({
            _id: hackathonId,
            uuid: hackathonUuid,
            data: hackathonData
        });
        hackathon.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
    },


    /**
     * Adding Users to Hackathons in different roles
     */

    addUserToHackathonOrganisers: function addUserToHackathonOrganisers(userId, hackathonId) {
        _hackathonModel2.default.findByIdAndUpdate(hackathonId, { $addToSet: { organisers: userId } }, { safe: true, upsert: true }, function (err) {
            if (err) {
                console.log(err);
            }
        });
    },
    addUserToHackathonVolunteers: function addUserToHackathonVolunteers(userId, hackathonId) {
        _hackathonModel2.default.findByIdAndUpdate(hackathonId, { $push: { volunteers: userId } }, { safe: true, upsert: true });
    },
    addUserToHackathonParticipants: function addUserToHackathonParticipants(userId, hackathonId) {
        _hackathonModel2.default.findByIdAndUpdate(hackathonId, { $push: { participants: userId } }, { safe: true, upsert: true });
    },
    addUserToHackathonMentors: function addUserToHackathonMentors(userId, hackathonId) {
        _hackathonModel2.default.findByIdAndUpdate(hackathonId, { $push: { mentors: userId } }, { safe: true, upsert: true });
    }
};

exports.default = HackathonService;
//# sourceMappingURL=hackathon-service.js.map