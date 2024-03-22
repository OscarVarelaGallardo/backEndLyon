import express from 'express';
import { createComent, getAllComents, getComentById, updateComent, deleteComent } from '../controllers/comentsController.js';

const router = express.Router();

/**
 * @openapi
 * /comments/createComent:
 *   post:
 *     summary: Crea un nuevo comentario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Comentario creado correctamente.
 *       '500':
 *         description: Error en el servidor.
 */
router.post('/createComent', createComent);

/**
 * @openapi
 * /comments:
 *   get:
 *     summary: Obtiene todos los comentarios.
 *     responses:
 *       '200':
 *         description: Comentarios obtenidos correctamente.
 *       '500':
 *         description: Error en el servidor.
 */
router.get('/', getAllComents);

/**
 * @openapi
 * /comments/{id}:
 *   get:
 *     summary: Obtiene un comentario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Comentario obtenido correctamente.
 *       '500':
 *         description: Error en el servidor.
 */
router.get('/:id', getComentById);

/**
 * @openapi
 * /comments/{id}:
 *   put:
 *     summary: Actualiza un comentario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Comentario actualizado correctamente.
 *       '500':
 *         description: Error en el servidor.
 */
router.put('/:id', updateComent);

/**
 * @openapi
 * /comments/{id}:
 *   delete:
 *     summary: Elimina un comentario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Comentario eliminado correctamente.
 *       '500':
 *         description: Error en el servidor.
 */
router.delete('/:id', deleteComent);

export default router;
