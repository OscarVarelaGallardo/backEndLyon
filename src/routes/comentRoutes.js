import express from 'express';
import { createComent, getAllComents, getComentById, updateComent, deleteComent } from '../controllers/comentsController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/createComent', protectRoute, createComent);
router.get('/', protectRoute, getAllComents);
router.get('/:id', protectRoute, getComentById);
router.put('/:id', protectRoute, updateComent);
router.delete('/:id', protectRoute, deleteComent);


export default router;