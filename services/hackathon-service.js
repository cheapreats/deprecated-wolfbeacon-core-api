import Hackathon from '../models/hackathon-model';
import User from '../models/user-model';

const HackathonService = {

    /**
     * Creating a Hackathon Service
     */

    createHackathon(hackathonId, hackathonUuid, hackathonData) {
        return new Hackathon({
            hackathonId: hackathonId,
            uuid: hackathonUuid,
            data: hackathonData
        }).save();
    },

    /**
     * Adding Users to Hackathons in different roles
     */


    addUserToHackathonOrganisers(userId, hackathonId) {
        return Hackathon.findOneAndUpdate(
            {hackathonId: hackathonId},
            {$addToSet: {organisers: userId.toString()}},
            {new: true},
        ).exec();
    },

    addUserToHackathonVolunteers(userId, hackathonId) {
        return Hackathon.findOneAndUpdate(
            {hackathonId: hackathonId},
            {$addToSet: {volunteers: userId.toString()}},
            {new: true},
        ).exec();
    },

    addUserToHackathonParticipants(userId, hackathonId) {
        return Hackathon.findOneAndUpdate(
            {hackathonId: hackathonId},
            {$addToSet: {participants: userId.toString()}},
            {new: true},
        ).exec();
    },


    addUserToHackathonMentors(userId, hackathonId) {
        return Hackathon.findOneAndUpdate(
            {hackathonId: hackathonId},
            {$addToSet: {mentors: userId.toString()}},
            {new: true},
        ).exec();
    },

    /**
     * Fetch Hackathon Details
     */

    fetchHackathonDetails(hackathonId) {
        return Hackathon.findOne(
            {hackathonId : hackathonId}
        ).exec();
    },


};


export default HackathonService;