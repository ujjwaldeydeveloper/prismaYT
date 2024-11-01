import { Router } from "express";   

import UserRoutes from './userRoutes.js';

import PostRoutes from './postRoutes.js';

const router = Router();

router.use('/api/user', UserRoutes);

// * For Post Routes

router.use('/api/post', PostRoutes);

export default router;