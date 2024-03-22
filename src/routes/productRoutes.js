import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct ,storageImg,getImgProductById} from '../controllers/productsController.js';
import upload from '../helpers/multer.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/',  createProduct);

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.put('/update/:id', updateProduct );

router.delete('/delete/:id', deleteProduct);

router.post('/img/:id', upload.single('image'), storageImg);

router.get('/img/:id', getImgProductById);




export default router;