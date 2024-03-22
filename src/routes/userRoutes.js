import express from 'express';
import { register, login, confirmToken, recoverPassword } from '../controllers/usersControllers.js';

const router = express.Router();

/**
 * @openapi
 * /user/register:
 *   post:
 *     summary: Crea un nuevo usuario.
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
 *         description: Usuario creado correctamente.
 *       '400':
 *         description: El email ya está registrado.
 *       '500':
 *         description: Error en el servidor.
 */
router.post('/register', register);

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Inicia sesión de usuario.
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
 *         description: Usuario logueado correctamente.
 *       '400':
 *         description: El usuario no existe o la contraseña es incorrecta.
 *       '403':
 *         description: La cuenta no está confirmada.
 *       '500':
 *         description: Error en el servidor.
 */
router.post('/login', login);

/**
 * @openapi
 * /user/confirm/{token}:
 *   get:
 *     summary: Confirma un usuario mediante un token.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario confirmado correctamente.
 *       '400':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error en el servidor.
 */
router.get('/confirm/:token', confirmToken);

/**
 * @openapi
 * /user/recovery:
 *   post:
 *     summary: Envía un correo para recuperar contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Correo enviado correctamente.
 *       '400':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error en el servidor.
 */
router.post('/recovery', recoverPassword);

export default router;
