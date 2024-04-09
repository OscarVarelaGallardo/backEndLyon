import companiesSchema from '../models/Companies.js';
import User from '../models/User.js';

import path from 'path';
import fs, { stat } from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));




const createCompany = async (req, res) => {
    const { companyName,
        companyCountry,
        productType,
        companyPhone,
        companyContact,
        user_id,
        password,
        email,
        status } = req.body;
    console.log(req.body);
    if (!companyName || !companyCountry || !productType || !companyPhone || !companyContact || !status) {
        return res.status(400).json({ status: 400, msg: 'Todos los campos son requeridos' });
    }
    const companyNameExist = await companiesSchema.findOne({ companyName });

    if (companyNameExist) {
        return res.status(400).json({ status: 400, msg: 'La empresa ya está registrada' });
    }
    const emailExist = await companiesSchema.findOne({ email });

    if (emailExist) {
        return res.status(400).json({ status: 400, msg: 'El email ya está registrado' });
    }
    if (!user_id) {
        try {

            const newCompanyeCreated = {
                companyName: companyName,
                companyCountry: companyCountry,
                productType: productType,
                companyPhone: companyPhone,
                companyContact: companyContact,
                user_id: user_id,
                password: password,
                email: email,
                rol_id: 3,
                status: status,
                pdf: req.file.originalname
            }

            const newCompany = await companiesSchema.create(newCompanyeCreated);
            if (!newCompany) {
                return res.status(400).json({ status: 400, msg: 'Error al crear empresa' });
            }
            return res.status(200).json({ status: 200, msg: 'Empresa asociada correctamente' });
        } catch (error) {
            return res.status(500).json({ status: 500, msg: 'Error al asociar la empresa empresa', error: error.message });
        }

    }

    try {
        const newCompany = await companiesSchema.create({
            companyName, companyCountry, productType, companyPhone, companyContact,user_id, password, email, rol_id: 3, status, pdf: req.file.originalname
        });
        if (!newCompany) {
            return res.status(400).json({ status: 400, msg: 'Error al crear empresa' });
        }

        res.status(200).json({ status: 200, msg: 'Empresa creada correctamente', company: newCompany });
    }
    catch (error) {
        return res.status(500).json({ status: 500, msg: 'Error al crear empresa', error: error.message });
    }

}



const getAllCompanies = async (req, res) => {
    try {
        const url = "https://dvhdecadrkjnssqtlncz.supabase.co/storage/v1/object/public/pdf/"
        const companies = await companiesSchema.find({});
        if (!companies) {
            return res.status(404).json({ status: 404, msg: 'empresas no encontradas' });
        }
        companies.map(company => {
            if (company.pdfDocument) {
                company.pdfDocument = `${url}/${company.pdfDocument}`;
            }
        });

        res.status(200).json({ status: 200, msg: 'Empresas encontradas', companies });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al encontrar empresas', error: error.message });
    }
}

const getCompanyById = async (req, res) => {
    const companyId = req.params.id;

    try {
        const companyExist = await companiesSchema.findOne({ where: { id: companyId } });
        if (!companyExist) {
            return res.status(404).json({ status: 404, msg: 'Empresa no encontrada' });
        }
        res.status(200).json({ status: 200, msg: 'empresa encontrada', company });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'error al encontrar la empresa', error: error.message });
    }
}

const updateCompany = async (req, res) => {
    const companyId = req.params.id;
    const { companyName, companyCountry, productType, companyPhone, companyContact, companyRfc } = req.body;
    if (!companyName || !companyCountry || !productType || !companyPhone || !companyContact || !companyRfc) {
        return res.status(400).json({ status: 400, msg: 'Todos los campos son requeridos para actualizar' });
    }
    try {
        const company = await companiesSchema.findOne({ where: { id: companyId } });
        if (!company) {
            return res.status(404).json({ status: 404, msg: 'empersa no encontrada' });
        }
        await company.update({
            companyName, companyCountry, productType, companyPhone, companyContact, companyRfc
        });
        res.status(200).json({ status: 200, msg: 'Empresa actualizada correctamente', company });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'error al actualizar empresa', error: error.message });
    }
}

const deleteCompany = async (req, res) => {
    const companyId = req.params.id;
    try {
        const company = await companiesSchema.findById(companyId);
        if (!company) {
            return res.status(404).json({ status: 404, msg: 'empersa no encontrada' });
        }
        await companiesSchema.deleteOne({ _id: companyId });
        res.status(200).json({ status: 200, msg: 'Empresa eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al eliminar empresa', error: error.message });
    }
}

const uploadPdf = async (req, res) => {
    const { _id } = req.body;

    try {
        let company = await companiesSchema.findOne({ _id: _id });
        if (!company) {
            return res.status(404).json({ status: 404, msg: 'Empresa no encontrada' });
        }
        if (!req.file) {
            return res.status(400).json({ status: 400, msg: 'Archivo pdf requerido' });
        }

        const newCompany = {
            companyName: company.companyName,
            companyCountry: company.companyCountry,
            productType: company.productType,
            companyPhone: company.companyPhone,
            companyContact: company.companyContact,
            companyRfc: company.companyRfc,
            pdfDocument: req.file.originalname,
            status: company.status,
            user_id: company.user_id,
            email: company.email,
            password: company.password,
            rol_id: company.rol_id

        }
        const companyUpdated = await companiesSchema.updateOne({ _id }, newCompany);


        if (companyUpdated.nModified === 0) {
            return res.status(400).json({ status: 400, msg: 'No se ha actualizado el pdf' });
        }

        res.status(200).json({ status: 200, msg: 'pdf subido correctamente', company });
    }
    catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al cargar pdf', error: error.message });
    }
}

//show pdf
const showPdf = async (req, res) => {
    const companyId = req.params.id;
    try {
        const company = await companiesSchema.findById(companyId);
        if (!company) {
            return res.status(404).json({ status: 404, msg: 'Empresa no encontrada' });
        }
        const pdfFilename = company.pdf;

        const pdfPath = path.join(__dirname, '..', '..', 'public', 'pdf', pdfFilename);

        if (!fs.existsSync(pdfPath)) {
            return res.status(404).json({ status: 404, msg: 'PDF no encontrado' });
        }

        res.status(200).contentType('application/pdf').sendFile(pdfPath);
    }
    catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al obtener PDF de empresa', error: error.message });
    }
}

const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: 400, msg: 'Todos los campos son requeridos' });
    }
    try {
        const company = await companiesSchema.findOne({ email });
        if (!company) {
            return res.status(400).json({ status: 400, msg: 'El no esta registrado como empresa' });
        }
        const userExist = await User.findOne({ email });
        const validPassword = await userExist.validPassword(password);
        if (!validPassword) {
            return res.status(400).json({ status: 400, msg: 'Contraseña incorrecta' });
        }
        //validar si tiene un rol de empresa
        if (userExist.rol_id !== 3) {
            return res.status(403).json({ status: 403, msg: 'No tienes permisos para ingresar' });
        }
        company.password = undefined;
        res.status(200).json({ status: 200, msg: 'Empresa logueada correctamente', company });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al loguear empresa', error: error.message });
    }
}


const updateStatus = async (req, res) => {
    const { _id, status } = req.body;
    if (!_id) { return res.status().json({ status: 400, msg: 'Id de empresa requerido' }) }
    if (!status) { return res.status().json({ status: 400, msg: 'Status de empresa requerido' }) }
    const company = await companiesSchema.findOne({ _id });
    if (!company) {
        return res.status().json({ status: 400, msg: "No se encuntra la empresa registrada" })
    }
    if (status !== 'reject' && status !== 'accept') {
        return res.status(400).json({ status: 400, msg: 'Status invalido' })
    }
    try {
        const companyUpdate = await companiesSchema.updateOne
            ({ _id }, { status });
        if (companyUpdate.nModified === 0) {
            return res.status(400).json({ status: 400, msg: 'No se ha actualizado el estado de la empresa' });
        }
        return res.status(200).json({ status: 200, msg: "Compañia actualizada correctamente" })
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al  actualizar', error: error.message })
    }
}


export { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany, uploadPdf, showPdf, loginCompany, updateStatus }