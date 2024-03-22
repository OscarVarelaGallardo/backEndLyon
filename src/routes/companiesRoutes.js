import express from 'express';
import { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany, uploadPdf, showPdf } from '../controllers/companiesController.js';
import protectRoute from '../middleware/protectRoute.js';
import upload from '../helpers/multer.js';

const router = express.Router();

/**
 * @openapi
 * /companies:
 *   post:
 *     summary: Crea una nueva empresa.
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
 * @openapi
 * /companies:
 *   get:
 *     summary: Obtiene todas las empresas.
 *     responses:
 *       '200':
 *         description: Empresas encontradas correctamente.
 *       '500':
 *         description: Error al encontrar empresas.
 */
router.get('/', getAllCompanies);

/**
 * @openapi
 * /companies/{id}:
 *   get:
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
 * @openapi
 * /companies/{id}:
 *   put:
 *     summary: Actualiza una empresa por su ID.
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
 * @openapi
 * /companies/{id}:
 *   delete:
 *     summary: Elimina una empresa por su ID.
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
 * @openapi
 * /companies/upload/{id}:
 *   post:
 *     summary: Sube un archivo PDF para la empresa especificada por su ID.
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
router.post('/upload/:id', upload.single('pdf'), uploadPdf);

/**
 * @openapi
 * /companies/download/{id}:
 *   get:
 *     summary: Descarga el archivo PDF de la empresa especificada por su ID.
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

export default router;
