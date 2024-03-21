import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

const UserSchema = new Schema({
    // Definición de tu esquema User...
});

const ProductSchema = new Schema({
    // Definición de tu esquema Product...
});

UserSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'user'
});

ProductSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'product'
});

const Comment = mongoose.model('Comment', CommentSchema);


export default Comment;