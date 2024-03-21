import express from 'express';
import { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany } from '../controllers/companiesController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/', createCompany);
router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

export default router;