import express from 'express';
import { createRol, getAllRols, getRolById, updateRol, deleteRol } from '../controllers/rolsController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Rol
 *  description: Roles management
 * 
 * @swagger
 * /roles:
 *   post:
 *    tags: [Rol]
 *    summary: Crea un nuevo rol.
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *    responses:
 *       '201':
 *         description: Rol creado exitosamente.
 *       '500':
 *         description: Error al crear el rol.
 */
router.post('/', createRol);

/**
 * @swagger
 * /roles:
 *  get:
 *  tags: [Rol]
 *  summary: Obtiene todos los roles.
 * 
 * @swagger
 * /roles:
 *   get:
 *     tags: [Rol]
 *     summary: Obtiene todos los roles.
 *     responses:
 *       '200':
 *         description: Roles encontrados exitosamente.
 *       '500':
 *         description: Error al encontrar roles.
 */
router.get('/', getAllRols);

/**
 * @swagger
 * tags:
 *  name: Rol
 *  description: Roles management
 * 
 * @swagger
 * /roles/{id}:
 *   get: 
 *     tags: [Rol]
 *     summary: Obtiene un rol por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Rol encontrado exitosamente.
 *       '404':
 *         description: Rol no encontrado.
 *       '500':
 *         description: Error al encontrar el rol.
 */
router.get('/:id', getRolById);

/**
 * @swagger
 * /roles/update/{id}:
 * put:
 * tags: [Rol]
 * summary: Actualiza un rol por su ID.
 * 
 * 
 * @swagger
 * /roles/update/{id}:
 *   put:
 *     tags: [Rol]
 *     summary: Actualiza un rol por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Rol actualizado exitosamente.
 *       '404':
 *         description: Rol no encontrado.
 *       '500':
 *         description: Error al actualizar el rol.
 */
router.put('/update/:id', updateRol);

/**
 * @swagger
 * /roles/delete/{id}:
 * delete:
 * tags: [Rol]
 * summary: Elimina un rol por su ID.
 * 
 * 
 * @swagger
 * /roles/delete/{id}:
 *   delete:
 *     tags: [Rol]
 *     summary: Elimina un rol por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Rol eliminado exitosamente.
 *       '404':
 *         description: Rol no encontrado.
 *       '500':
 *         description: Error al eliminar el rol.
 */
router.delete('/delete/:id', deleteRol);

export default router;
