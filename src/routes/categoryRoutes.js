import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);


export default router;