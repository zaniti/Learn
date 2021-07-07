import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'user name'
    }, 
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    points: {
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: new Date()
    }
});

const userModel = mongoose.model('User', userSchema);

export default userModel;