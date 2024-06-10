import mongoose from 'mongoose';


const ordersSchema = new mongoose.Schema({

    numberFacture: {
        type: String,
        required: true
    },
 
    document: {
        type: String,
        required: true
    },
    idUser: {
        type: String,
        required: true
    }
}, {
    timestamps: true

    


})

const Orders = mongoose.model('Orders', ordersSchema);

export default Orders;
