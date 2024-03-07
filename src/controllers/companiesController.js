import companiesSchema from '../models/Companies.js';

const createCompany = async (req, res) => {
    const { name, description, logo } = req.body;
    try {
        const company = new companiesSchema({ name, description, logo });
        await company.save();
        res.status(200).json({ status: 200, msg: 'Empresa creada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const getAllCompanies = async (req, res) => {
    try {
        const companies = await companiesSchema.findAll();
        res.status(200).json({ status: 200, companies });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const getCompanyById = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await companiesSchema.findOne({ where: { id } });
        res.status(200).json({ status: 200, company });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const updateCompany = async (req, res) => {
    const { id } = req.params;
    const { name, description, logo } = req.body;
    try {
        const company = await companiesSchema.findOne({ where: { id } });
        company.name = name;
        company.description = description;
        company.logo = logo;
        await company.save();
        res.status(200).json({ status: 200, msg: 'Empresa actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const deleteCompany = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await companiesSchema.findOne({ where: { id } });
        await company.destroy();
        res.status(200).json({ status: 200, msg: 'Empresa eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

export { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany }