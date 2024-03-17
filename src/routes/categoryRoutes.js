import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/', protectRoute, createCategory);
router.get('/', protectRoute, getAllCategories);
router.get('/:id', protectRoute, getCategoryById);
router.put('/update/:id', protectRoute, updateCategory);
router.delete('/delete/:id', protectRoute, deleteCategory);


export default router;