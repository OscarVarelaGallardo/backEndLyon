import companiesSchema from '../models/Companies.js';

const createCompany = async (req, res) => {
    const { companyName, companyCountry, productType, companyPhone, companyContact, companyRfc } = req.body;
    try {
        const newCompany = await companiesSchema.create({ 
            companyName, companyCountry, productType, companyPhone, companyContact, companyRfc 
        });
        
        res.status(200).json({ status: 200, msg: 'Empresa creada correctamente', company:newCompany });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al crear empresa', error:error.message });
    }
}

const getAllCompanies = async (req, res) => {
    try {
        const companies = await companiesSchema.findAll();
        res.status(200).json({ status: 200, msg: 'Empresas encontradas', companies });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al encontrar empresas', error:error.message  });
    }
} 

const getCompanyById = async (req, res) => {
    const companyId = req.params.id;
    try {
        const company = await companiesSchema.findByPk(companyId);
        if (!company) {
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
        const company = await companiesSchema.findByPk(companyId);
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
        const company = await companiesSchema.findByPk(companyId);
        if (!company) {
            return res.status(404).json({ status: 404, msg: 'empersa no encontrada' });
        }
        await companiesSchema.destroy({where: {id:companyId}});
        res.status(200).json({ status: 200, msg: 'Empresa eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error al eliminar empresa', error: error.message });
    }
}

export { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany }