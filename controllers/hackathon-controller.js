import HackathonService from '../services/hackathon-service';
import UserService from '../services/user-service'

/**
 * Creating a Hackathon Controller
 */

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
        res.status(200).json({
            message: `Successfully created Hackathon ${hackathonId} linked to user ${userId}`
        })

    } catch (err) {
        console.error(err);
        next(err);
    }
}

/**
 * Getting Hackathon Details Controller
 */
function getHackathonDetailsController(req, res, next) {
    const hackathonId = parseInt(req.params.id);
    HackathonService.getHackathonDetails(hackathonId).then((data) => {
        res.status(200).json(data.data);
    }).catch((err) => {
        console.log(err);
        next(err);
    });
}

/**
 * Update Hackathon Details Controller
 */
function updateHackathonDetailsController(req, res, next) {
    const hackathonId = parseInt(req.body.id);
    const updatedHackathonData = req.body.data;
    HackathonService.updateHackathonDetails(hackathonId, updatedHackathonData).then((data) => {
        console.log(data);
        console.log(`Hackathon ${hackathonId} updated in system`);
        res.status(200).json({
            message: `Successfully updated data for Hackathon ${hackathonId}`
        })
    }).catch((err) => {
        console.error(error);
        next(err);
    });
}

/**
 * Get Hackathon Published Status Controller
 */
function getHackathonPublishedStatusController(req, res, next) {
    const hackathonId = parseInt(req.params.id);
    HackathonService.getHackathonPublishedStatus(hackathonId).then((data) => {
        res.status(200).json({
            isPublished: `${data.isPublished}`
        })
    }).catch((err) => {
        console.error(error);
        next(err);
    });
}

/**
 * Update Hackathon Published Status Controller
 */
function updateHackathonPublishedStatusController(req, res, next) {
    const hackathonId = parseInt(req.body.id);
    const hackathonPublishedStatus = JSON.parse(req.body.isPublished);
    console.log(hackathonPublishedStatus);
    HackathonService.updateHackathonPublishedStatus(hackathonId, hackathonPublishedStatus).then((data) => {
        console.log(`Hackathon ${hackathonId} published status updated in system to ${hackathonPublishedStatus}`);
        res.status(200).json({
            message: `Successfully updated Hackathon ${hackathonId}, published status updated to ${hackathonPublishedStatus}`
        })
    }).catch((err) => {
        console.error(err);
        next(err);
    });
}

export default {
    createHackathonController,
    getHackathonDetailsController,
    updateHackathonDetailsController,
    getHackathonPublishedStatusController,
    updateHackathonPublishedStatusController
}