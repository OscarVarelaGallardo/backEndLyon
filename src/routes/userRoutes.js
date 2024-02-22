import express from 'express';
import { createUser,login } from '../controllers/usersControllers.js';

const router = express.Router();

router.post('/create-user', createUser);
router.post('/login', login);




export default router;