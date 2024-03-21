import express from 'express';
import { createComent, getAllComents, getComentById, updateComent, deleteComent } from '../controllers/comentsController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/createComent', createComent);
router.get('/', getAllComents);
router.get('/:id', getComentById);
router.put('/:id', updateComent);
router.delete('/:id', deleteComent);


export default router;