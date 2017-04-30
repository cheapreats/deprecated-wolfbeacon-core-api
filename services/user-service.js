import User from '../models/user-model';

const UserService = {

    /**
     * Create or Upsert
     */

    createOrUpsertUser(userId) {
        const user = new User({
            _id: userId
        });
        User.findOneAndUpdate(
            {_id: userId},
            user,
            {upsert: true, new: true},
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    },

    /**
     * Add Users to Hackathons in different roles
     */

    makeUserHackathonOrganiser(userId, hackathonId) {
        User.findByIdAndUpdate(
            userId,
            {$addToSet: {organising: hackathonId}},
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
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