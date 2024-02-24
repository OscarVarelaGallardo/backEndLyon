import express from 'express';
import { register, login, confirmToken } from '../controllers/usersControllers.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/confirm/:token', confirmToken)




export default router;