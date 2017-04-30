'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userModel = require('../models/user-model');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserService = {

    /**
     * Create or Upsert
     */

    createOrUpsertUser: function createOrUpsertUser(userId) {
        var user = new _userModel2.default({
            _id: userId
        });
        _userModel2.default.findOneAndUpdate({ _id: userId }, user, { upsert: true, new: true }, function (err) {
            if (err) {
                console.log(err);
            }
        });
    },


    /**
     * Add Users to Hackathons in different roles
     */

    makeUserHackathonOrganiser: function makeUserHackathonOrganiser(userId, hackathonId) {
        _userModel2.default.findByIdAndUpdate(userId, { $addToSet: { organising: hackathonId } }, function (err) {
            if (err) {
                console.log(err);
            }
        });
    },
    makeUserHackathonVolunteer: function makeUserHackathonVolunteer(userId, hackathonId) {
        _userModel2.default.findByIdAndUpdate(userId, { $push: { volunteering: hackathonId } }, { safe: true, upsert: true });
    },
    makeUserHackathonParticipant: function makeUserHackathonParticipant(userId, hackathonId) {
        _userModel2.default.findByIdAndUpdate(userId, { $push: { participating: hackathonId } }, { safe: true, upsert: true });
    },
    makeUserHackathonMentor: function makeUserHackathonMentor(userId, hackathonId) {
        _userModel2.default.findByIdAndUpdate(userId, { $push: { mentoring: hackathonId } }, { safe: true, upsert: true });
    }
};

exports.default = UserService;
//# sourceMappingURL=user-service.js.map