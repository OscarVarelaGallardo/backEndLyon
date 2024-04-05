import express from 'express';
import { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany, uploadPdf, showPdf, loginCompany, updateStatus } from '../controllers/companiesController.js';
import protectRoute from '../middleware/protectRoute.js';
import handleFileUpload from '../helpers/multer.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Company update Status
 *  description: Companies management
 * 
 * 
 * @swagger
 * /companies/updateCompany:
 *   post:
 *     tags: [Company]
 *     summary: Update company status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               status:
 *                 type: string
 *              
 *     responses:
 *       '200':
 *         description: Company status updated successfully.
 *       '400':
 *         description: Company not found or status is required.
 *       '500':
 *         description: Error updating company status.
 */
router.post('/updateCompany', updateStatus);

/**
 * @swagger
 * tags:
 *  name: Company
 *  description: Companies management
 * 
 * 
 * @swagger
 * /companies:
 *   post:
 *     tags: [Company]
 *     summary: Create a new company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               companyCountry:
 *                 type: string
 *               productType:
 *                 type: string
 *               companyPhone:
 *                 type: string
 *               companyContact:
 *                 type: string
 *               companyRfc:
 *                 type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Empresa creada correctamente.
 *       '400':
 *         description: Todos los campos son requeridos o la empresa ya existe.
 *       '500':
 *         description: Error al crear empresa.
 */
router.post('/', createCompany);

/**
 * @swagger
 * tags:
 *  name: Company
 *  description: Get all companies.
 * 
 * @swagger
 * /companies:
 *   get:
 *     tags: [Company]    
 *     summary: Get all companies.
 *     responses:
 *       '200':
 *         description: Empresas encontradas correctamente.
 *       '500':
 *         description: Error al encontrar empresas.
 */
router.get('/', getAllCompanies);

/**
 * @swagger
 * tags:
 *  name: Company
 *  description: Get company by ID.
 * @swagger
 * /companies/{id}:
 *   get:
 *     tags: [Company]
 *     summary: Obtiene una empresa por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Empresa encontrada correctamente.
 *       '404':
 *         description: Empresa no encontrada.
 *       '500':
 *         description: Error al encontrar la empresa.
 */
router.get('/:id', getCompanyById);

/**
 * @swagger
 * tags:
 *  name: Company
 *  description: Update company.
 * 
 * 
 * @swagger
 * /companies/{id}:
 *   put:
 *     tags: [Company]
 *     summary: Update a company by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               companyCountry:
 *                 type: string
 *               productType:
 *                 type: string
 *               companyPhone:
 *                 type: string
 *               companyContact:
 *                 type: string
 *               companyRfc:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Empresa actualizada correctamente.
 *       '404':
 *         description: Empresa no encontrada.
 *       '500':
 *         description: Error al actualizar empresa.
 */
router.put('/:id', updateCompany);

/**
 * @swagger
 * tags:
 *  name: Company
 *  description: Delete company.
 * @swagger
 * /companies/{id}:
 *   delete:
 *     tags: [Company] 
 *     summary: Delete a company by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Empresa eliminada correctamente.
 *       '404':
 *         description: Empresa no encontrada.
 *       '500':
 *         description: Error al eliminar empresa.
 */
router.delete('/:id', deleteCompany);

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Endpoint to upload PDF for a company.
 * @swagger
 *  /companies/upload/{id}:
 *   post:
 *     tags: [Company]
 *     summary: Upload PDF for a company by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: PDF subido correctamente.
 *       '404':
 *         description: Empresa no encontrada.
 *       '500':
 *         description: Error al cargar PDF.
 */
//router.post('/upload/:id', upload.single('pdf'), uploadPdf);

/**
 * @swagger
 *  tags:
 *   name: Company
 *   description: Company endpoints to upload and download PDF.
 * 
 * @swagger
 * /companies/download/{id}:
 *   get:
 *     tags: [Company]
 *     summary: Download PDF for a company by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: PDF encontrado.
 *       '404':
 *         description: Empresa no encontrada.
 *       '500':
 *         description: Error al obtener PDF de la empresa.
 */
router.get('/download/:id', showPdf);

/**
 * @swagger
 * tags:
 *  name: Company
 *  description: Login company.
 * 
 * @swagger
* /companies/login:
 *   post:
 *     tags: [Company]
 *     summary: Login company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Company logged in successfully.
 *       '400':
 *         description: Email or password are incorrect.  
 *       '500':
 *         description: Server error.
 */
router.post('/login', loginCompany);


export default router;
