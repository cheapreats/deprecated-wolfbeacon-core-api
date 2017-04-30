import Hackathon from '../models/hackathon-model';


const HackathonService = {

    /**
     * Creating a Hackathon Service
     */

    createHackathon(hackathonId, hackathonUuid, hackathonData) {
        let hackathon = new Hackathon({
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


    addUserToHackathonOrganisers(userId, hackathonId) {
        Hackathon.findByIdAndUpdate(
            hackathonId,
            {$addToSet: {organisers: userId}},
            {safe: true, upsert: true},
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
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
    //
    // getHackathonDataAsOrganiser(userId, hackathonId) {
    //     Hackathon.find(hackathonId, {organisers: {"$in": [userId]}}, function (err, docs) {
    //         if ()
    //     });
    // }
};


export default HackathonService;