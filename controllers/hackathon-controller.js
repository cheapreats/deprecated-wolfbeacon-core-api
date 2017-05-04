import HackathonService from '../services/hackathon-service';
import UserService from '../services/user-service'

function createHackathonController(req, res, next) {
    const hackathonId = parseInt(req.body.id);
    const hackathonUuid = req.body.uuid;
    const hackathonData = req.body.data;
    const userId = req.body.userId;

    //Not consistent if one of these operations fails. MongoDB and Mongoose smh...
    //Tried enforcing promises to make flow better and ensure forward consistency atleast
    //Kept the closure going, I could avoid promise nesting but wouldn't be able to log
    HackathonService.createHackathon(hackathonId, hackathonUuid, hackathonData)
        .then((addedHackathon) => {
            console.log(`Hackathon added: \n ${addedHackathon}`);
            UserService.createOrUpsertUser(userId)
                .then((addedUser) => {
                    console.log(`User upserted: \n ${addedUser}`);
                    HackathonService.addUserToHackathonOrganisers(userId, hackathonId)
                        .then((upsertedUser) => {
                            console.log(`User ${upsertedUser} added as organisers to Hackathon ${addedHackathon}`);
                            UserService.makeUserHackathonOrganiser(userId, hackathonId)
                                .then((user) => {
                                    console.log(`User ${upsertedUser} is organising of Hackathon ${addedHackathon}`);
                                    res.json({
                                        status: 'SUCCESS',
                                        message: `Successfully created Hackathon ${hackathonId} linked to user ${userId}`
                                    })
                                });
                        });
                })
        }).catch((err) => {
        console.error(err);
        next(err);
    });
}

function fetchHackathonDetailsController(req, res, next) {
    const hackathonId = parseInt(req.query.hackathonId);
    HackathonService.fetchHackathonDetails(hackathonId).then((data) => {
        res.json(data.data);
    }).catch((err) => {
        next(err);
    });

}

export default {createHackathonController, fetchHackathonDetailsController}