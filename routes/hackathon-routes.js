import express from 'express';
import validate from 'express-validation';
import HackathonValidation from '../validations/hackathon-validation';
import HackathonController from '../controllers/hackathon-controller';
const router = express.Router();

/**
 * @api {post} /hackathons/create Create Hackathon
 * @apiGroup Hackathons
 * @apiVersion 0.0.1
 * @apiDescription Create a Hackathon in the System
 *
 * @apiParam {String} hackathonId   Hackathon Id
 * @apiParam {String} hackathonUuid Hackathon UUID
 * @apiParam {Object} hackathonData Hackathon Data as JSON Object
 * @apiParam {String} UserId        Auth0 User ID.
 */
router.route('/create')
    .post(validate(HackathonValidation.createHackathonValidation), HackathonController.createHackathonController);

/**
 * @api {get} /hackathons/:id Retrieve Hackathon Details
 * @apiGroup Hackathons
 * @apiVersion 0.0.1
 * @apiDescription Fetch details for a particular hackathon in the System using the Hackathon Id (hackathonId) of that particular Hackathon.
 *
 * @apiParam {Number} hackathonId Hackathon ID.
 */
router.route('/fetch?')
    .get(HackathonController.fetchHackathonDetailsController);

export default router;