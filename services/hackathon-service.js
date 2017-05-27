import Hackathon from '../models/hackathon-model';

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
     * Get and Set Hackathon Details
     */

    getHackathonDetails(hackathonId) {
        return Hackathon.findOne(
            {hackathonId: hackathonId},
            'data'
        ).exec();
    },

    updateHackathonDetails(hackathonId, updatedHackathonData) {
        return Hackathon.updateOne(
            {hackathonId: hackathonId},
            {data: updatedHackathonData}
        ).exec();
    },

    /**
     * Get and Set Hackathon Published status
     */

    getHackathonPublishedStatus(hackathonId) {
        return Hackathon.findOne(
            {hackathonId: hackathonId},
            'isPublished'
        ).exec();
    },

    updateHackathonPublishedStatus(hackathonId, updatedPublishedStatus) {
        return Hackathon.updateOne(
            {hackathonId: hackathonId},
            {isPublished: updatedPublishedStatus}
        ).exec();
    }

};


export default HackathonService;