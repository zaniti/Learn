import mongoose from 'mongoose';

const topicSchema = mongoose.Schema({
    name: String,
});

const topicModel = mongoose.model('Topic', topicSchema);

export default topicModel;