import HackathonService from '../services/hackathon-service';
import UserService from '../services/user-service'

function createHackathon(req, res, next) {
    try {
        const hackathonId = parseInt(req.body.id);
        const hackathonUuid = req.body.uuid;
        const hackathonBody = req.body.data;
        const userId = req.body.userId;

        //Not consistent if one of these operations fails. Stupid MongoDB and Mongoose
        HackathonService.createHackathon(hackathonId, hackathonUuid, hackathonBody);
        UserService.createOrUpsertUser(userId);
        UserService.makeUserHackathonOrganiser(userId, hackathonId);
        HackathonService.addUserToHackathonOrganisers(userId, hackathonId);

        res.json({
            status: 'SUCCESS',
            message: `Successfully created Hackathon ${hackathonId} linked to user ${userId}`
        })
    } catch (e) {
        console.error(e);
        res.json({status: 'ERROR', message: 'Unable to create hackathon'});
    }
}

function getHackathonDataAsOrganiser(req, res) {

}

export default {createHackathon, getHackathonDataAsOrganiser}