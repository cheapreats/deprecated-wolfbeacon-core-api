import User from '../models/user-model';

const UserService = {

    /**
     * Update or Create user
     */

    upsertUser(userId) {
        User.findOne(
            {userId: userId}, function (err, res) {
                if (res === null) {
                    return new User({
                        userId: userId
                    }).save()
                }
            }
        )
    },

    /**
     * Add Users to Hackathons in different roles
     */

    addHackathonRoleToUser(userId, hackathonId, role) {
        return User.findOneAndUpdate(
            {userId: userId},
            {$addToSet: {[role]: hackathonId}},
        ).exec();
    },
};


export default UserService;