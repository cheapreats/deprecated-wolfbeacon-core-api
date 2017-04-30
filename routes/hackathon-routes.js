import express from 'express';
import validate from 'express-validation';
import HackathonValidation from '../validations/hackathon-validation';
import HackathonController from '../controllers/hackathon-controller';
const router = express.Router();

router.route('/create')
    .post(validate(HackathonValidation.createHackathon), HackathonController.createHackathon);

router.route('/')
    .get(HackathonController.getHackathonDataAsOrganiser);

export default router;