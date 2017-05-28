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
     * Get and Add Users in roles (participants/mentors/volunteers/organisers) for a Hackathon
     */

    getUsersForAllHackathonRoles(hackathonId) {
        return Hackathon.findOne(
            {hackathonId: hackathonId},
            `organisers volunteers participants mentors -_id`
        ).exec();
    },

    addUserToHackathonRole(userId, hackathonId, role) {
        return Hackathon.findOneAndUpdate(
            {hackathonId: hackathonId},
            {$addToSet: {[role]: userId}},
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
    },

    /**
     * Get Hackathons
     */
    // Current Algorithm if to get if count of all people is > 500
    async getFeaturedHackathons() {
        let allHackathonIds = [];
        await Hackathon.aggregate([
            {
                "$redact": {
                    "$cond": {
                        "if": {
                            "$gt": [
                                {
                                    "$size": {
                                        "$concatArrays": [
                                            "$organisers",
                                            "$volunteers",
                                            "$participants",
                                            "$mentors"
                                        ]
                                    }
                                },
                                500
                            ]
                        },
                        "then": "$$KEEP",
                        "else": "$$PRUNE"
                    }
                }
            },
            {"$project": {_id: 0, "id": "$hackathonId"}}
        ]).then((data) => {
            data.forEach(function(curr) {
                allHackathonIds.push(curr['hackathonId']);
            });
        });
        return allHackathonIds;
    },

    async getAllHackathons() {
        let featuredHackathonIds = [];
        await Hackathon.find({}, '-_id hackathonId').then((data) => {
            data.forEach(function(curr) {
                featuredHackathonIds.push(curr['hackathonId']);
            });
        });
        return featuredHackathonIds;
    }


};


export default HackathonService;