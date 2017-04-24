var Hackathon = require('../models/user-model');
var User = require('../models/user-model');

/**
 * Creating
 */


function createHackathon(hackathonId, hackathonUuid, hackathonData) {
    var hackathon = new Hackathon({
        _id: hackathonId,
        uuid: hackathonUuid,
        data: JSON.parse(hackathonData)
    });
    hackathon.save();
}

/**
 * Adding Users to Hackathons in different roles
 */


function addUserToHackathonOrganisers(userId, hackathonId) {
    Hackathon.findByIdAndUpdate(
        hackathonId,
        {$push: {organisers: userId}},
        {safe: true, upsert: true}
    );
}

function addUserToHackathonVolunteers(userId, hackathonId) {
    Hackathon.findByIdAndUpdate(
        hackathonId,
        {$push: {volunteers: userId}},
        {safe: true, upsert: true}
    );
}


function addUserToHackathonParticipants(userId, hackathonId) {
    Hackathon.findByIdAndUpdate(
        hackathonId,
        {$push: {participants: userId}},
        {safe: true, upsert: true}
    );
}


function addUserToHackathonMentors(userId, hackathonId) {
    Hackathon.findByIdAndUpdate(
        hackathonId,
        {$push: {mentors: userId}},
        {safe: true, upsert: true}
    );
}

/**
 * Reading Hackathons from DB
 */

function getHackathonDataAsOrganiser(userId, hackathonId) {
    return JSON.parse(Hackathon.findOne({'_id': hackathonId}));
}


module.exports = {
    createHackathon: createHackathon,
    addUserToHackathonOrganisers: addUserToHackathonOrganisers,
    addUserToHackathonVolunteers: addUserToHackathonVolunteers,
    addUserToHackathonParticipants: addUserToHackathonParticipants,
    addUserToHackathonMentors: addUserToHackathonMentors
};