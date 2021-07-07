import userModel from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv  from "dotenv";


dotenv.config({ path: '../.env' });
// get all users
export const getAllUsers = async (req, res) =>{
    const users = await userModel.find();

    try {     
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get single user
export const getSingleUser = async (req, res) =>{
    const user = await userModel.findOne({
        email: req.body.email,
    }); 
    
    if(user){
        const verified = bcrypt.compareSync(req.body.password, user.password);
        if(verified){
            const payload = {id: user.id, role: user.role};
            const accessToken = jwt.sign(payload, process.env.ACCES_TOKEN_SECRET)
            return  res.status(200).json({verified, user, accessToken: accessToken});
        }
        else{
            return  res.status(403).json({message: 'user not founded!!!'});
        }  
    }else{
        res.status(400).send('email not found');
    }

}
export const getUserDetails = async (req, res) =>{

    userModel.findById(req.body.id, (err, user) => {
        if(err){
            res.send(err)
        }
        else{
            res.send(user)
        }
    });
}


// add new user
export const addUser = async (req, res) =>{

    const userExist = await userModel.findOne({email: req.body.email});
    if(userExist) return res.status(200).json('Email Already Exist!!');

        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        
        const user = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: passwordHash
        });

        await user.save();

        try {
            res.status(201).json(user);
        } catch (error) {
            res.status(409).json({ message: error.message });

        }
    
}

export const updateUser = async (req, res) =>{

    await userModel.findByIdAndUpdate(req.body.id,
        {
        name: req.body.name,
        username: req.body.username
        },

        (err, result) =>{

            console.log(req.body)

        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    });
}

export const updateEmail = async (req, res) =>{

    const userExist = await userModel.findOne({email: req.body.email});
    if(userExist) return res.status(400).json('Email Already Exist!!');

    await userModel.findByIdAndUpdate(req.body.id,
        req.body,
        (err, result) =>{

        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    });
}


export const updatePassword = async (req, res) =>{
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    await userModel.findByIdAndUpdate(req.body.id,
        {password: passwordHash},

        (err, result) =>{

            console.log(req.body)

        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    });
}

export const AdminUpdateUser = async (req, res) =>{
    await userModel.findByIdAndUpdate(req.body.id,
        {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            role: req.body.role
        },

        (err, result) =>{

        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    });
}

export const deleteUser = async (req, res) => {
    console.log(req.body)
    await userModel.findByIdAndRemove(req.body.id, (err) => {
        console.log(req.body)
        if(err){
            res.send(err);
        } else {
            res.send('User deleted!!');
        }
    })
        

}