import mongoose from 'mongoose';

const { Schema } = mongoose;

const ShoppingCartSchema = new Schema({
    total: {
        type: Number,
        required: true
    },
    cartStatus: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default mongoose.model('ShoppingCart', ShoppingCartSchema);
