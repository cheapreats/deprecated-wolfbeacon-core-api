import HackathonService from '../services/hackathon-service';
import UserService from '../services/user-service'

async function createHackathonController(req, res, next) {
    try {
        const hackathonId = parseInt(req.body.id);
        const hackathonUuid = req.body.uuid;
        const hackathonData = req.body.data;
        const userId = req.body.userId;

        await HackathonService.createHackathon(hackathonId, hackathonUuid, hackathonData);
        await UserService.createOrUpsertUser(userId);
        await HackathonService.addUserToHackathonOrganisers(userId, hackathonId);
        await UserService.makeUserHackathonOrganiser(userId, hackathonId);

        console.log(`Hackathon ${hackathonId}, User ${userId} inserted and linked in DB`);
        res.json({
            status: 'SUCCESS',
            message: `Successfully created Hackathon ${hackathonId} linked to user ${userId}`
        })

    } catch (err) {
        console.error(err);
        next(err);
    }
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