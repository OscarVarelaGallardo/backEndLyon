import companiesSchema from '../models/Companies.js';

const createCompany = async (req, res) => {
    const { companyName, companyCountry, productType, companyPhone, companyContact, companyRfc,user_id } = req.body;
    if (!companyName || !companyCountry || !productType || !companyPhone || !companyContact || !companyRfc) {
        return res.status(400).json({ status: 400, msg: 'Todos los campos son requeridos' });
    }
    const companyExist = await companiesSchema.findOne({ where: { companyName } });
    companyExist ? res.status(400).json({ status: 400, msg: 'La empresa ya existe' }) : null;

    try {
        const newCompany = await companiesSchema.create({ 
            companyName, companyCountry, productType, companyPhone, companyContact, companyRfc ,user_id
        });
        
        res.status(200).json({ status: 200, msg: 'Empresa creada correctamente', company:newCompany });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al crear empresa', error:error.message });
    }
}

const getAllCompanies = async (req, res) => {
    try {
        const companies = await companiesSchema.find({});
        res.status(200).json({ status: 200, msg: 'Empresas encontradas', companies });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al encontrar empresas', error:error.message  });
    }
} 

const getCompanyById = async (req, res) => {
    const companyId = req.params.id;

    try {
        const companyExist = await companiesSchema.findById(companyId);
        if (!companyExist) {
            return res.status(404).json({ status: 404, msg: 'empersa no encontrada' });
        }
        res.status(200).json({ status: 200, msg:'empresa encontrada', company });
    } catch (error) {
        res.status(500).json({ status: 500, msg:'error al encontrar la empresa', error:error.message});
    }
}

const updateCompany = async (req, res) => {
    const companyId = req.params.id;
    const { companyName, companyCountry, productType, companyPhone, companyContact, companyRfc } = req.body;
    try {
        const company = await companiesSchema.findById(companyId);
        if (!company) {
            return res.status(404).json({ status: 404, msg: 'empersa no encontrada' });
        }
        await company.update({
            companyName, companyCountry, productType, companyPhone, companyContact, companyRfc
        });
        res.status(200).json({ status: 200, msg: 'Empresa actualizada correctamente', company });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'error al actualizar empresa', error:error.message});
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

//create service for pdf
const uploadPdf = async (req, res) => {
    const companyId = req.params.id;
    console.log(req.file);
    try {
        const company = await companiesSchema.findById(companyId);
        if (!company) {
            return res.status(404).json({ status: 404, msg: 'empresa no encontrada no encontrada' });
        }
        // Guardar el nombre del archivo PDF en la base de datos
        await company.updateOne({ pdf: req.file.filename });
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
            return res.status(404).json({ status: 404, msg: 'empresa no encontrada no encontrada' });
        }
        // Ruta al archivo PDF
        const pdfPath = company.pdfPath;

        // Enviar el archivo PDF como respuesta
        res.sendFile(pdfPath);

    }
    catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al eliminar empresa', error: error.message });
    }
}



export { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany, uploadPdf }