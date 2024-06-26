import Rol from '../models/Rol.js';

const createRol = async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ status: 400, msg: 'Por favor envia todos los campos requeridos' });
    }
    try {
        const newRol = await Rol.create({ name, description });
        res.status(201).json({ status: 201, msg: 'Rol creado exitosamente', rol: newRol });
    } catch (error) {
        console.error('Errror al crear el rol:', error);
        res.status(500).json({ status:500, msg: 'Error al crear el rol', error: error.message });
    }
};

const getAllRols = async (req, res) => {
    try {
        const rols = await Rol.find()
        if (rols.length === 0) {
            return res.status(200).json({ status: 200, msg: 'No hay roles actualmente, crea uno' });
        }
        res.status(200).json({ status: 200, msg: 'Roles econtrados exitosamente', rols });
    } catch (error) {
        console.error('Error al encontrar roles:', error);
        res.status(500).json({ status: 500, msg: 'Errror al encontrar roles', error: error.message });
    }
};

const getRolById = async (req, res) => {
    const rolId = req.params.id;
    //validate id type string
    if (rolId.length !== 24) {
        return res.status(400).json({ status: 400, msg: 'Id invalido' });
    }
    try {
        const rol = await Rol.findById(rolId);
       
        if (!rol) {
            return res.status(404).json({ status: 404, msg: 'Rol no encontrado' });
        }
        res.status(200).json({ status: 200, msg: 'Rol encontrado exitosamente', rol });
    } catch (error) {
        console.error('Error al encontrar rol:', error);
        res.status(500).json({ status: 500, msg: 'Error al encontrar el rol', error: error.message });
    }
};

const updateRol = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const rol = await Rol.findById(id);
        if (!rol) {
            return res.status(404).json({ status: 404, msg: 'Rol no encontrado' })
        }
        await rol.updateOne({ name, description });
        return res.status(200).json({ status: 200, msg: 'Rol actualizado exitosamente', rol });
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        res.status(500).json({ status: 500, msg: 'Error al actualizar el rol', error: error.message });
    }
};

const deleteRol = async (req, res) => {
    const { id } = req.params;
    try {
        const rol = await Rol.findById(id);
        if (!rol) {
            return res.status(404).json({ status: 404, msg: 'Rol no encontrado' });
        }
        await Rol.deleteOne({ _id: id });
        res.status(200).json({ status: 200, msg: 'Rol eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el rol:', error);
        res.status(500).json({ status: 500, msg: 'Error al eliminar el rol', error: error.message });
    }
};

export { createRol, getAllRols, getRolById, updateRol, deleteRol };