import express from 'express';
import validate from 'express-validation';
import HackathonValidation from '../validations/hackathon-validation';
import HackathonController from '../controllers/hackathon-controller';
const router = express.Router();

/**
 * @api {post} /hackathons/ Create Hackathon
 * @apiName CreateHackathon
 * @apiGroup Hackathon
 * @apiVersion 0.0.1
 * @apiDescription Create a Hackathon in the System
 *
 * @apiHeader {String} authorization Auth0 Access Token.
 *
 * @apiParam {String} id   Hackathon Id
 * @apiParam {String} uuid Hackathon UUID
 * @apiParam {Object} data Hackathon Data as JSON Object
 * @apiParam {String} userId        Auth0 User Id.
 *
 * @apiExample {js} Example Request (JS):
 var request = require('request');
 request({
        method: 'POST',
        url: "https://wolfbeacon.com/api/hackathons/",
        body: {
            id: 712,
            uuid: "ed0acef0-6078-4348-8a91-27fa51fb6851",
            data: {
                "exampleHackathonData": {
                    "Name": "Hack The Valley"
                }
            },
            userId: "151262315"
        },
        json: true,
        headers: {authorization: 'Bearer access-token-here'}
    }
 , function (error, response, body) {
        console.log(body);
    });
 *
 * @apiSuccessExample {json} Success Response
 * { status: 'SUCCESS',
  message: 'Successfully created Hackathon 712 linked to user 151262315' }
 *
 */
router.route('/')
    .post(validate(HackathonValidation.createHackathonValidation), HackathonController.createHackathonController);

/**
 * @api {get} /hackathons/:id Get Hackathon
 * @apiName GetHackathon
 * @apiGroup Hackathon
 * @apiVersion 0.0.1
 * @apiDescription Retrieve details/description for a particular hackathon referencing it's Hackathon Id (hackathonId) of that particular Hackathon.
 *
 * @apiHeader {String} authorization Auth0 Access Token.
 *
 * @apiParam {Number} id Hackathon Id.
 * @apiExample {js} Example Request (JS):
 var request = require('request');

 let hackathonId = 712;

 request.get(`https://wolfbeacon.com/api/hackathons/${hackathonId}`, function (err, res, body) {
    if (err) {
        console.log(err)
    } else {
        console.log(body);
    }
});
 *
 * @apiSuccessExample {json} Success Response
 * {"exampleHackathonData":{"Name":"Hack The Valley"}}
 *

 */
router.route('/:id')
    .get(HackathonController.fetchHackathonDetailsController);

/**
 * @api {post} /hackathons/:id/data Update Hackathon Data
 * @apiName UpdateHackathon
 * @apiGroup Hackathon
 * @apiVersion 0.0.1
 * @apiDescription Update Hackathon Data in the System
 *
 * @apiHeader {String} authorization Auth0 Access Token.
 *
 * @apiParam {String} id   Hackathon Id
 * @apiParam {Object} data Hackathon Data as JSON Object
 *
 * @apiExample {js} Example Request (JS):
 var request = require('request');
 request({
        method: 'POST',
        url: "https://wolfbeacon.com/api/hackathon/712/data",
        body: {
            id: 712,
            data: {
                "exampleHackathonData": {
                    "Name": "Hack The Valley"
                    "Organizer" : "Ralphie buoy"
                }
            }
        },
        json: true,
        headers: {authorization: 'Bearer access-token-here'}
    }
 , function (error, response, body) {
        console.log(body);
    });
 *
 * @apiSuccessExample {json} Success Response
 * {message: 'Successfully updated Hackathon 712' }
 *
 */
router.route('/:id/data')
    .post(validate(HackathonValidation.updateHackathonDataValidation), HackathonController.updateHackathonDetailsController);


export default router;