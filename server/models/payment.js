import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema({

    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: Number,
    state: {
        type: String,
        default: "requested"
    },
    created_at:{
        type: Date,
        default: new Date()
    }
});

const paymentModel = mongoose.model('Payment', paymentSchema);

export default paymentModel;