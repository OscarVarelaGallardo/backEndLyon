import Coments  from "../models/Coments.js";

const createComent = async (req, res) => {
    const { content, rating, userId, productId } = req.body;
    try {
        const coment = new Coments({ content, rating, userId, productId });
        await coment.save();
        res.status(200).json({ status: 200, msg: 'Comentario creado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const getAllComents = async (req, res) => {
    try {
        const coments = await Coments.findAll();
        res.status(200).json({ status: 200, coments });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const getComent = async (req, res) => {
    const { id } = req.params;
    try {
        const coment = await Coments.findOne({ where: { id } });
        res.status(200).json({ status: 200, coment });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const updateComent = async (req, res) => {
    const { id } = req.params;
    const { content, rating, userId, productId } = req.body;
    try {
        const coment = await Coments.findOne({ where: { id } });
        coment.content = content;
        coment.rating = rating;
        coment.userId = userId;
        coment.productId = productId;
        await coment.save();
        res.status(200).json({ status: 200, msg: 'Comentario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

const deleteComent = async (req, res) => {
    const { id } = req.params;
    try {
        const coment = await Coments.findOne({ where: { id } });
        await coment.destroy();
        res.status(200).json({ status: 200, msg: 'Comentario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}
const getComentById = async (req, res) => {
    const { id } = req.params;
    try {
        const coment = await Coments.findOne({ where: { id } });
        res.status(200).json({ status: 200, coment });
    } catch (error) {
        res.status(500).json({ status: 500, msg: error });
    }
}

export {
    createComent,
    getAllComents,
    getComent,
    updateComent,
    deleteComent,
    getComentById
}