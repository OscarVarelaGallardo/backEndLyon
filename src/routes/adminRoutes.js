import express from 'express';
import { login } from '../controllers/adminController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Admin
 *  description: User management
 *
 *
 * @swagger
 * /admin/login:
 *   post:
 *     tags: [Admin]
 *     summary: Admin login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '400':
 *         description: User does not exist or password is incorrect.
 *       '403':
 *         description: Account is not confirmed.
 *       '500':
 *         description: Server error.
 */
router.post("/login", login);


export default router;