
import express from 'express';
import { createRol, getAllRols, getRolById, updateRol, deleteRol } from '../controllers/rolsController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/',protectRoute,  createRol);
router.get('/', protectRoute, getAllRols);
router.get('/:id', protectRoute, getRolById);
router.put('/update/:id', protectRoute, updateRol);
router.delete('/delete/:id', protectRoute, deleteRol);

export default router;
