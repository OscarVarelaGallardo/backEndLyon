import express from 'express';
import { createOrder } from '../controllers/ordersController.js';
import handleFileUpload from '../helpers/multer.js';

const router = express.Router();

router.post('/newOrder', handleFileUpload, createOrder);



export default router;
