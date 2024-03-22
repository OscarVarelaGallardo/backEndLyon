import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Crea una nueva categoría.
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
 *         description: Categoría creada correctamente.
 *       '500':
 *         description: Error al crear la categoría.
 */
router.post('/', createCategory);

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Obtiene todas las categorías.
 *     responses:
 *       '200':
 *         description: Categorías encontradas.
 */
router.get('/', getAllCategories);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Obtiene una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Categoría encontrada.
 *       '404':
 *         description: Categoría no encontrada.
 */
router.get('/:id', getCategoryById);

/**
 * @openapi
 * /categories/update/{id}:
 *   put:
 *     summary: Actualiza una categoría existente por su ID.
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
 *         description: Categoría actualizada correctamente.
 *       '404':
 *         description: Categoría no encontrada.
 */
router.put('/update/:id', updateCategory);

/**
 * @openapi
 * /categories/delete/{id}:
 *   delete:
 *     summary: Elimina una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Categoría eliminada correctamente.
 *       '404':
 *         description: Categoría no encontrada.
 */
router.delete('/delete/:id', deleteCategory);


export default router;