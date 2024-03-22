import express from 'express';
import { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany, uploadPdf, showPdf } from '../controllers/companiesController.js';
import protectRoute from '../middleware/protectRoute.js';
import upload from '../helpers/multer.js';
const router = express.Router();

router.post('/', createCompany);
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);
router.post('/upload/:id', upload.single('pdf'), uploadPdf);
router.get('/download/:id', showPdf);

export default router;