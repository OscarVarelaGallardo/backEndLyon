import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Categories management
 * 
 * 
 * @swagger
 * /categories:
 *   post:
 *     tags: [Category]
 *     summary: Create a new category.
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
 *         description: Category created successfully.
 *       '500':
 *         description: Server error.
 */
router.post('/', createCategory);

/**
 * @swagger
 * tags:
 *  name: Category
 *  summary: Get all categories.
 * 
 * @swagger
 * /categories:
 *   get:
 *     tags: [Category]
 *     summary: Get all categories.
 *     responses:
 *       '200':
 *         description: Categories found successfully.
 */
router.get('/', getAllCategories);

/**
 * @swagger
 * tags:
 *  name: Category
 *  summary: Get a category.
 * 
 * @openapi
 * /categories/{id}:
 *   get:
 *     tags: [Category]
 *     summary: Get a category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category found successfully.
 *       '404':
 *         description: Category not found.
 */
router.get('/:id', getCategoryById);

/**
 * @swagger
 * tags:
 *  name: Category
 *  summary: Update a category.
 * 
 * @swagger
 * /categories/update/{id}:
 *   put:
 *     tags: [Category]
 *     summary: Update a category by its ID.
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
 *         description: Category updated successfully.
 *       '404':
 *         description: Category not found.
 */
router.put('/update/:id', updateCategory);

/**
 * @swagger
 * tags:
 *  name: Category
 *  summary: Delete a category.
 * 
 * 
 * @swagger
 * /categories/delete/{id}:
 *   delete:
 *     tags: [Category]
 *     summary: Delete a category by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Category deleted successfully.
 *       '404':
 *         description: Category not found.
 */
router.delete('/delete/:id', deleteCategory);


export default router;