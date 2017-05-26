import HackathonService from '../services/hackathon-service';
import UserService from '../services/user-service'

async function createHackathonController(req, res, next) {
    try {
        const hackathonId = parseInt(req.body.id);
        const hackathonUuid = req.body.uuid;
        const hackathonData = req.body.data;
        const userId = req.body.userId;

        await HackathonService.createHackathon(hackathonId, hackathonUuid, hackathonData);
        await UserService.upsertUser(userId);
        await HackathonService.addUserToHackathonOrganisers(userId, hackathonId);
        await UserService.makeUserHackathonOrganiser(userId, hackathonId);

        console.log(`Hackathon ${hackathonId}, User ${userId} inserted and linked in DB`);
        res.json({
            message: `Successfully created Hackathon ${hackathonId} linked to user ${userId}`
        })

    } catch (err) {
        console.error(err);
        next(err);
    }
}

function fetchHackathonDetailsController(req, res, next) {
    const hackathonId = parseInt(req.params.id);
    HackathonService.fetchHackathonDetails(hackathonId).then((data) => {
        console.log(data);
        res.json(data.data);
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}

function updateHackathonDetailsController(req, res, next) {
    const hackathonId = parseInt(req.body.id);
    const updatedHackathonData = req.body.data;
    HackathonService.updateHackathonDetails(hackathonId, updatedHackathonData).then((data) => {
        console.log(data);
        console.log(`Hackathon ${hackathonId} updated in system`);
        res.json({
            message: `Successfully updated Hackathon ${hackathonId}`
        })
    }).catch((err) => {
        console.error(error);
        next(err);
    });
}

export default {createHackathonController, fetchHackathonDetailsController, updateHackathonDetailsController}