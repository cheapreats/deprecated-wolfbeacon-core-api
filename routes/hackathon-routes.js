import express from 'express';
import validate from 'express-validation';
import HackathonValidation from '../validations/hackathon-validation';
import HackathonController from '../controllers/hackathon-controller';
const router = express.Router();

/**
 * @api {post} /hackathon/ Create Hackathon
 * @apiName CreateHackathon
 * @apiGroup Hackathon
 * @apiVersion 0.0.1
 * @apiDescription Create a Hackathon in the System
 *
 * @apiHeader {String} authorization Auth0 Access Token.
 *
 * @apiParam {String} hackathonId   Hackathon Id
 * @apiParam {String} hackathonUuid Hackathon UUID
 * @apiParam {Object} hackathonData Hackathon Data as JSON Object
 * @apiParam {String} UserId        Auth0 User Id.
 *
 * @apiExample {js} Example Request (JS):
 var request = require('request');
 request({
        method: 'POST',
        url: "https://wolfbeacon.com/api/hackathon/",
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
 * @api {get} /hackathon/:id Get Hackathon
 * @apiName GetHackathon
 * @apiGroup Hackathon
 * @apiVersion 0.0.1
 * @apiDescription Retrieve details/description for a particular hackathon referencing it's Hackathon Id (hackathonId) of that particular Hackathon.
 *
 * @apiHeader {String} authorization Auth0 Access Token.
 *
 * @apiParam {Number} hackathonId Hackathon Id.
 * @apiExample {js} Example Request (JS):
 var request = require('request');

 let hackathonId = 712;

 request.get(`https://wolfbeacon.com/api/hackathon/${hackathonId}`, function (err, res, body) {
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

export default router;