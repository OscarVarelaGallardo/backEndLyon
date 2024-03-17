import express from 'express';
import { register, login, confirmToken,recoverPassword } from '../controllers/usersControllers.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/confirm/:token', confirmToken)
router.post('/recovery', recoverPassword)





export default router;