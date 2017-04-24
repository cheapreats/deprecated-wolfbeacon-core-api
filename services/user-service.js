var User = require('../models/user-model');

/**
 * Create or Upsert
 */

function createOrUpsertUser(userId) {
    var user = new User({
        user_id: userId
    });
    User.findOneAndUpdate(
        {user_id: userId},
        user,
        {upsert: true, new: true}
    );
}

/**
 * Add Users to Hackathons in different roles
 */

function makeUserHackathonOrganiser(userId, hackathonId) {
    User.findByIdAndUpdate(
        userId,
        {$push: {hackathon_organiser: hackathonId}},
        {safe: true, upsert: true}
    );
}


function makeUserHackathonVolunteer(userId, hackathonId) {
    User.findByIdAndUpdate(
        userId,
        {$push: {hackathon_volunteer: hackathonId}},
        {safe: true, upsert: true}
    );
}

function makeUserHackathonParticipant(userId, hackathonId) {
    User.findByIdAndUpdate(
        userId,
        {$push: {hackathon_participant: hackathonId}},
        {safe: true, upsert: true}
    );
}

function makeUserHackathonMentor(userId, hackathonId) {
    User.findByIdAndUpdate(
        userId,
        {$push: {hackathon_mentor: hackathonId}},
        {safe: true, upsert: true}
    );
}

module.exports = {
    createOrUpsertUser: createOrUpsertUser,
    makeUserHackathonOrganiser: makeUserHackathonOrganiser,
    makeUserHackathonVolunteer: makeUserHackathonVolunteer,
    makeUserHackathonParticipant: makeUserHackathonParticipant,
    makeUserHackathonMentor: makeUserHackathonMentor
};