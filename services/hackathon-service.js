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
     * Get in these roles [participants/mentors/volunteers/organisers] for a Hackathon
     */

    getUsersForHackathonRole(hackathonId, role) {
        return Hackathon.findOne(
            {hackathonId: hackathonId},
            `${role} -_id`
        ).exec();
    },

    getUsersForAllHackathonRole(hackathonId) {
        return Hackathon.findOne(
            {hackathonId: hackathonId},
            `organisers volunteers participants mentors -_id`
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