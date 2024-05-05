import mongoose from 'mongoose';

const { Schema } = mongoose;

const CartDetailsSchema = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    shoppingCartId: {
        type:String,
        required: true
    }
});

const CarDetails = mongoose.model('CartDetails', CartDetailsSchema);

export default CarDetails;