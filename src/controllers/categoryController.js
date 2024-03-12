import Category from "../models/Category.js";

const createCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(200).json({ status: 200, msg: 'Categoria creada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const category = await Category.findOne({ where: { id } });
        if (!category) {
            const error = new Error("Categoria no encontrada ")
            return res.status(400).json({ status: 400, msg: error.message })
        }
        category.name = name;
        category.description = description;
        await category.save();
        res.status(200).json({ status: 200, msg: 'Categoria actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({ where: { id } });
        if (!category) {
            const error = new Error("Categoria no encontrada ")
            return res.status(400).json({ status: 400, msg: error.message })
        }
        category.status = false;
        await category.save();
        res.status(200).json({ status: 200, msg: 'Categoria eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const category = await Category.findAll({ where: { status: true } });
        res.status(200).json({ status: 200, category });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({ where: { id, status: true } });
        if (!category) {
            const error = new Error("Categoria no encontrada ")
            return res.status(400).json({ status: 400, msg: error.message })
        }
        res.status(200).json({ status: 200, category });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}
const deleteCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({ where: { id } });
        if (!category) {
            const error = new Error("Categoria no encontrada ")
            return res.status(400).json({ status: 400, msg: error.message })
        }
        await category.destroy();
        res.status(200).json({ status: 200, msg: 'Categoria eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}


export { createCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById, deleteCategoryById }