import express from 'express';
import { register, login, confirmToken,recoverPassword,getAllUsers } from '../controllers/usersControllers.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/confirm/:token', confirmToken)
router.post('/recovery', recoverPassword)
router.get('/users', getAllUsers)





export default router;