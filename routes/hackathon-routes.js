import express from 'express';
import validate from 'express-validation';
import HackathonValidation from '../validations/hackathon-validation';
import HackathonController from '../controllers/hackathon-controller';
const router = express.Router();

router.route('/create')
    .post(validate(HackathonValidation.createHackathon), HackathonController.createHackathon);


export default router;