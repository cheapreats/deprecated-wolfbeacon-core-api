import HackathonService from '../services/hackathon-service';
import UserService from '../services/user-service';


function createHackathon(req, res) {
    const hackathonId = req.body.id;
    const hackathonUuid = req.body.uuid;
    const hackathonBody = req.body.data;
    const userId = req.body.userId;

    HackathonService.createHackathon(hackathonId, hackathonUuid, hackathonBody)
        .then(UserService.createOrUpsertUser(userId))
        .then(UserService.makeUserHackathonOrganiser(userId, hackathonId))
        .then(HackathonService.addUserToHackathonOrganisers(userId, hackathonId))
        .then(res.json({
            status: 'SUCCESS',
            message: `Successfully created Hackathon ${hackathonId} linked to user ${userId}`
        }))
        .catch((e) => {
            res.json({status: 'ERROR', message: 'Unable to create hackathon'});
            console.error(e);
        })
}

function getHackathonDataAsOrganiser (req, res) {

}

export default {createHackathon}