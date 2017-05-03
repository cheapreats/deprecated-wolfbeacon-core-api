'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hackathonModel = require('../models/hackathon-model');

var _hackathonModel2 = _interopRequireDefault(_hackathonModel);

var _userModel = require('../models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HackathonService = {

    /**
     * Creating a Hackathon Service
     */

    createHackathon: function createHackathon(hackathonId, hackathonUuid, hackathonData) {
        return new _hackathonModel2.default({
            hackathonId: hackathonId,
            uuid: hackathonUuid,
            data: hackathonData
        }).save();
    },


    /**
     * Adding Users to Hackathons in different roles
     */

    addUserToHackathonOrganisers: function addUserToHackathonOrganisers(userId, hackathonId) {
        return _hackathonModel2.default.findOneAndUpdate({ hackathonId: hackathonId }, { $addToSet: { organisers: userId.toString() } }, { new: true }).exec();
    },
    addUserToHackathonVolunteers: function addUserToHackathonVolunteers(userId, hackathonId) {
        return _hackathonModel2.default.findOneAndUpdate({ hackathonId: hackathonId }, { $addToSet: { volunteers: userId.toString() } }, { new: true }).exec();
    },
    addUserToHackathonParticipants: function addUserToHackathonParticipants(userId, hackathonId) {
        return _hackathonModel2.default.findOneAndUpdate({ hackathonId: hackathonId }, { $addToSet: { participants: userId.toString() } }, { new: true }).exec();
    },
    addUserToHackathonMentors: function addUserToHackathonMentors(userId, hackathonId) {
        return _hackathonModel2.default.findOneAndUpdate({ hackathonId: hackathonId }, { $addToSet: { mentors: userId.toString() } }, { new: true }).exec();
    },


    /**
     * Fetch Hackathon Details
     */

    fetchHackathonDetails: function fetchHackathonDetails(hackathonId) {
        return _hackathonModel2.default.findOne({ hackathonId: hackathonId }).exec();
    }
};

exports.default = HackathonService;
//# sourceMappingURL=hackathon-service.js.map