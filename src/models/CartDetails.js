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
        type: Schema.Types.ObjectId,
        ref: 'ShoppingCart',
        required: true
    }
});

export default mongoose.model('CartDetails', CartDetailsSchema);