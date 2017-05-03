import User from '../models/user-model';

const UserService = {

    /**
     * Create or Upsert
     */

    createOrUpsertUser(userId) {
        let user = new User({
            userId: userId
        });
        return User.findOneAndUpdate(
            {userId: userId},
            user,
            {upsert: true, new: true},
        ).exec();
    },

    /**
     * Add Users to Hackathons in different roles
     */

    makeUserHackathonOrganiser(userId, hackathonId) {
        return User.findOneAndUpdate(
            {userId: userId},
            {$addToSet: {organising: hackathonId}},
        ).exec();
    },


    makeUserHackathonVolunteer(userId, hackathonId) {
        User.findByIdAndUpdate(
            userId,
            {$push: {volunteering: hackathonId}},
            {safe: true, upsert: true}
        );
    },

    makeUserHackathonParticipant(userId, hackathonId) {
        User.findByIdAndUpdate(
            userId,
            {$push: {participating: hackathonId}},
            {safe: true, upsert: true}
        );
    },

    makeUserHackathonMentor(userId, hackathonId) {
        User.findByIdAndUpdate(
            userId,
            {$push: {mentoring: hackathonId}},
            {safe: true, upsert: true}
        );
    }
};


export default UserService;