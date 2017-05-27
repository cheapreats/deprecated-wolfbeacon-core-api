import express from 'express';
import validate from 'express-validation';
import HackathonValidation from '../validations/hackathon-validation';
import HackathonControllers from '../controllers/hackathon-controller';
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
        url: "http://localhost:3000/api/hackathons/",
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
    .post(validate(HackathonValidation.createHackathonValidation), HackathonControllers.createHackathonController);

/**
 * @api {get} /hackathons/:id Get Hackathon Data
 * @apiName GetHackathonData
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

 request.get(`http://localhost:3000/api/hackathons/${hackathonId}`, function (err, res, body) {
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
    .get(HackathonControllers.getHackathonDetailsController);

/**
 * @api {post} /hackathons/:id/data Update Hackathon Data
 * @apiName UpdateHackathonData
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
        url: "http://localhost:3000/api/hackathon/712/data",
        body: {
            id: 712,
            data: {
                "exampleHackathonData": {
                    "Name": "Hack The Valley"
                    "Organizer" : "Ralphie the cool buoy"
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
 * {message: 'Successfully updated data for Hackathon 712' }
 *
 */
router.route('/:id/data')
    .post(validate(HackathonValidation.updateHackathonDataValidation), HackathonControllers.updateHackathonDetailsController);

/**
 * @api {get} /hackathons/:id/is-published Get Published Status
 * @apiName GetIsPublished
 * @apiGroup Hackathon
 * @apiVersion 0.0.1
 * @apiDescription Retrieves the 'Published' status for a Hackathon, indicating 'true' if it is publicly visible for applications and 'false' otherwise.
 *
 * @apiHeader {String} authorization Auth0 Access Token.
 *
 * @apiParam {String} id   Hackathon Id
 *
 * @apiExample {js} Example Request (JS):
 var request = require('request');
 let hackathonId = 712;
 request.get(`http://localhost:3000/api/hackathons/${hackathonId}/is-published`, function (err, res, body) {
    if (err) {
        console.error(err)
    } else {
        console.log(body);
    }
});
 *
 * @apiSuccessExample {json} Success Response
 * {"isPublished":"false"}
 *
 */
router.route('/:id/is-published')
    .get(HackathonControllers.getHackathonPublishedStatusController);

/**
 * @api {post} /hackathons/:id/is-published Update Published status
 * @apiName UpdateIsPublished
 * @apiGroup Hackathon
 * @apiVersion 0.0.1
 * @apiDescription Updates the 'Published' status for a Hackathon, indicating 'true' if it is publicly visible for applications and 'false' otherwise.
 *
 * @apiHeader {String} authorization Auth0 Access Token.
 *
 * @apiParam {String} id   Hackathon Id
 * @apiParam {Boolean} isPublished true if public, false otherwise.
 *
 * @apiExample {js} Example Request (JS):
 var request = require('request');
 let hackathonId = 712;
 request({
        method: 'POST',
        url: `http://localhost:3000/api/hackathons/${hackathonId}/is-published`,
        body: {
            id: 712,
            isPublished: true
        },
        json: true,
        headers: {authorization: 'Bearer access-token-here'}
    }
 , function (error, response, body) {
        console.log(body);
    });
 *
 * @apiSuccessExample {json} Success Response
 * {message: "Successfully updated Hackathon 712, published status updated to true" }
 *
 */
router.route('/:id/is-published')
    .post(validate(HackathonValidation.updateHackathonPublishedStatusValidation), HackathonControllers.updateHackathonPublishedStatusController);


export default router;