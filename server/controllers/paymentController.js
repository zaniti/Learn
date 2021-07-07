import paymentModel from "../models/payment.js";
import userModel from "../models/user.js";

export const requestPayment = async (req, res) =>{

    const payment = new paymentModel(req.body);

    await payment.save();

    
    try {
        
        res.status(201).json(payment);
        
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePoints = async (req, res) =>{
    
    await userModel.findByIdAndUpdate(req.body.id,
        {
        points : 0
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

// get all payments
export const getAllPayments = async (req, res) =>{
    const payments = await paymentModel.find().populate({path:'id_user', select: ['username', 'email']})

    try {     
        res.status(200).json(payments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePaymentState = async (req, res) =>{
    
    await paymentModel.findByIdAndUpdate(req.body.id,
        {
        state : req.body.state
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


export const getUserPayments = async (req, res) =>{
    const payments = await paymentModel.find({id_user: req.body.id}).populate({path:'id_user', select: ['username', 'email']})

    try {     
        res.status(200).json(payments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}