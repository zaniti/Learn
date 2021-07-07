import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const problemSchema = mongoose.Schema({
    name: String,
    description: String,
    id_topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    },
    reward: Number,
    link: String
});

const problemModel = mongoose.model('Problem', problemSchema);

export default problemModel;