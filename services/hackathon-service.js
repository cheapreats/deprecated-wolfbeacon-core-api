import Hackathon from '../models/user-model';
import User from '../models/user-model';

/**
 * Creating
 */


const HackathonService = {

    createHackathon(hackathonId, hackathonUuid, hackathonData) {
        let hackathon = new Hackathon({
            _id: hackathonId,
            uuid: hackathonUuid,
            data: JSON.parse(hackathonData)
        });
        hackathon.save();
    },

    /**
     * Adding Users to Hackathons in different roles
     */


    addUserToHackathonOrganisers(userId, hackathonId) {
        Hackathon.findByIdAndUpdate(
            hackathonId,
            {$push: {organisers: userId}},
            {safe: true, upsert: true}
        );
    },

    addUserToHackathonVolunteers(userId, hackathonId) {
        Hackathon.findByIdAndUpdate(
            hackathonId,
            {$push: {volunteers: userId}},
            {safe: true, upsert: true}
        );
    },

    addUserToHackathonParticipants(userId, hackathonId) {
        Hackathon.findByIdAndUpdate(
            hackathonId,
            {$push: {participants: userId}},
            {safe: true, upsert: true}
        );
    },


    addUserToHackathonMentors(userId, hackathonId) {
        Hackathon.findByIdAndUpdate(
            hackathonId,
            {$push: {mentors: userId}},
            {safe: true, upsert: true}
        );
    },

    /**
     * Reading Hackathons from DB
     */

    getHackathonDataAsOrganiser(userId, hackathonId) {
        return JSON.parse(Hackathon.findOne({'_id': hackathonId}));
    }
};


export default HackathonService;