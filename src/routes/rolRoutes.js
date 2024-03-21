
import express from 'express';
import { createRol, getAllRols, getRolById, updateRol, deleteRol } from '../controllers/rolsController.js';

const router = express.Router();

router.post('/',  createRol);
router.get('/', getAllRols);
router.get('/:id', getRolById);
router.put('/update/:id', updateRol);
router.delete('/delete/:id', deleteRol);

export default router;
