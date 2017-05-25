import express from 'express';
import HackathonRoutes from './hackathon-routes';

const router = express.Router();

router.use('/hackathon', HackathonRoutes);

router.route('/ping')
    .get(function (req, res) {
        res.json({Ping : "Alive!"});
    });


export default router;
