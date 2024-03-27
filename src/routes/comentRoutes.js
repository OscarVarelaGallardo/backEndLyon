import express from 'express';
import { createComent, getAllComents, getComentById, updateComent, deleteComent } from '../controllers/comentsController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Coment
 *  description: Coments management
 * @swagger
 * /comments/createComent:
 *   post:
 *     tags: [Coment]
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
 * @swagger
 *  tags:
 *  name: Coment
 *  description: Coments management
 * @swagger
 * /comments:
 *   get:
 *     tags: [Coment]
 *     summary: Obtiene todos los comentarios.
 *     responses:
 *       '200':
 *         description: Comentarios obtenidos correctamente.
 *       '500':
 *         description: Error en el servidor.
 */
router.get('/', getAllComents);

/**
 * @swagger
 * tags:
 *  name: Coment
 *  description: Coments management
 * 
 * @swagger
 * /comments/{id}:
 *   get:
 *     tags: [Coment]
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
 * @swagger
 *  tags:
 *  name: Coment
 *  description: Coments management
 * @swagger
 * /comments/{id}:
 *   put:
 *     tags: [Coment]
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
 * @swagger
 * tags:
 *  name: Coment
 *  description: Coments management
 * @swagger
 * /comments/{id}:
 *   delete:
 *     tags: [Coment]
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
