import express from 'express';
import HackathonRoutes from './hackathon-routes';

const router = express.Router();

router.use('/hackathons', HackathonRoutes);

export default router;
