import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct ,storageImg} from '../controllers/productsController.js';
import upload from '../helpers/multer.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/', protectRoute,  createProduct);

router.get('/', protectRoute, getAllProducts);

router.get('/:id', protectRoute, getProductById);

router.put('/update/:id', protectRoute, updateProduct );

router.delete('/delete/:id', protectRoute, deleteProduct);

router.post('/img/:id', upload.single('image'), protectRoute, storageImg);



export default router;