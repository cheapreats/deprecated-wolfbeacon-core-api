import User from '../models/user-model';

const UserService = {
    /**
     * Create or Upsert
     */

    createOrUpsertUser(userId) {
        const user = new User({
            user_id: userId
        });
        User.findOneAndUpdate(
            {user_id: userId},
            user,
            {upsert: true, new: true}
        );
    },

    /**
     * Add Users to Hackathons in different roles
     */

    makeUserHackathonOrganiser(userId, hackathonId) {
        User.findByIdAndUpdate(
            userId,
            {$push: {hackathon_organiser: hackathonId}},
            {safe: true, upsert: true}
        );
    },


    makeUserHackathonVolunteer(userId, hackathonId) {
        User.findByIdAndUpdate(
            userId,
            {$push: {hackathon_volunteer: hackathonId}},
            {safe: true, upsert: true}
        );
    },

    makeUserHackathonParticipant(userId, hackathonId) {
        User.findByIdAndUpdate(
            userId,
            {$push: {hackathon_participant: hackathonId}},
            {safe: true, upsert: true}
        );
    },

    makeUserHackathonMentor(userId, hackathonId) {
        User.findByIdAndUpdate(
            userId,
            {$push: {hackathon_mentor: hackathonId}},
            {safe: true, upsert: true}
        );
    }
};


export default UserService;