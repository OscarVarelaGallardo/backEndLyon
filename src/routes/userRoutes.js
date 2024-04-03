import express from "express";

import {
  register,
  login,
  confirmToken,
  recoverPassword,
  getAllUsers,
} from "../controllers/usersControllers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Users management
 * @swagger
 * /user/register:
 *   post:
 *     tags: [User]
 *     summary: Create a new user.
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
 *         description: User created successfully.
 *       '400':
 *         description: Email is already registered.
 *       '500':
 *         description: Server error.
 */
router.post("/register", register);

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User management
 *
 *
 * @swagger
 * /user/login:
 *   post:
 *     tags: [User]
 *     summary: User login.
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

/**
 * @swagger
 * tags:
 *  name: User
 *  description: Confirm token.
 *
 * @swagger
 * /user/confirm/{token}:
 *   get:
 *     tags: [User]
 *     summary: Confirm a user using a token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User confirmed successfully.
 *       '400':
 *         description: User not found.
 *       '500':
 *         description: Server error.
 * 
 */
router.get("/confirm/:token", confirmToken);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Recover password.
 *
 * @swagger
 * /user/recovery:
 *    post:
 *      tags: [User]
 *      summary: Send an email to recover password.
 *      requestBody:
 *         required: true
 *         content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *      responses:
 *       '200':
 *         description: Email sent successfully.
 *       '400':
 *         description: User not found.
 *       '500':
 *         description: Server error.
 */
router.post("/recovery", recoverPassword);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Get all users.
 * @swagger
 * /user/users:
 *   get:
 *     tags: [User]
 *     summary: Get all users.
 *     responses:
 *       '200':
 *         description: Users retrieved successfully.
 *       '500':
 *         description: Server error.
 */
router.get("/users", getAllUsers);

export default router;
