import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const answerSchema = mongoose.Schema({
    link: String,
    message: String,
    state: {
        type: String,
        default: "In review"
    },
    id_user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    id_problem: {
        type: Schema.Types.ObjectId,
        ref: 'Problem'
    },
    reviewed: {
        type: Number,
        default: 0
    },
});

const answerModel = mongoose.model('Answer', answerSchema);

export default answerModel;