import Orders from '../models/Orders.js';

const createOrder = async (req, res) => {
    const { numberFacture, idUser } = req.body;
    console.log(req.file);
    if (!numberFacture) {
        return res.status(400).json({ error: 'Falta el número de factura' });
    }
    try {
        const order = await Orders.create({
            idUser,
            numberFacture,
            document: req.file.originalname
        });

        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


}

export { createOrder };