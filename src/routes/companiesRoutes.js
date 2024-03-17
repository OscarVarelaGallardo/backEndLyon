import express from 'express';
import { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany } from '../controllers/companiesController.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post('/', protectRoute, createCompany);
router.get('/', protectRoute, getAllCompanies);
router.get('/:id', protectRoute, getCompanyById);
router.put('/:id', protectRoute, updateCompany);
router.delete('/:id', protectRoute, deleteCompany);

export default router;