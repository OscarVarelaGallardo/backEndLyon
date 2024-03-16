<<<<<<< HEAD
//crear un todo con las instrucciones para crear un rol
// :TODO CREAR LOS ENDPOINTS PARA CREAR UN ROL
=======
import express from 'express';
import { createRol, getAllRols, getRolById, updateRol, deleteRol } from '../controllers/rolsController.js';

const router = express.Router();

router.post('/', createRol);
router.get('/', getAllRols);
router.get('/:id', getRolById);
router.put('/update/:id', updateRol);
router.delete('/delete/:id', deleteRol);

export default router;
>>>>>>> 224651555e29a2e55aa6f200ed547fd4cc0284c4
