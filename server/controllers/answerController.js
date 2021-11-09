import answerModel from "../models/answer.js";
import userModel from "../models/user.js";

// get asnwer by user id
export const getAnswerById = async (req, res) =>{


    answerModel.find({id_user: req.body.id}, (err, answer) => {
        if(err){
            res.send(err)
        }
        else{
            res.send(answer)
        }
    }).populate('id_problem');
}

// add answer

export const addAnswer = async (req, res) =>{
        
    const answer = new answerModel(req.body);

    await answer.save();

    try {
        res.status(201).json(answer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

}

// get all answers
export const getAllAnswers = async (req, res) =>{
    const answers = await answerModel.find().populate('id_user').populate('id_problem');

    try {     
        res.status(200).json(answers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//update topic

export const updateAnswer = async (req, res) =>{
    await answerModel.findByIdAndUpdate(req.body.id,
        {
            state: req.body.state,
            reviewed: 1
        },
        (err, result) =>{

        if(err){
            res.send(err)
        }
        else{
            if(req.body.state === "Validated" && req.body.reviewed === 0){
                userModel.findByIdAndUpdate(req.body.userId, {points: req.body.points + req.body.reward},
                    (err, re) =>{
    
                        if(err){
                            res.send(err)
                        } else{
                            
                        }
                    }
                )
            }
            
            res.send(result)
        }
    });
}


export const getAnswerReview = async (req, res) =>{
    // console.log(req.body)
    const answers = await answerModel.find({id_problem: req.body.id, id_user: req.body.id_user, state: "In review"})
    try {     
        res.status(200).json(answers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}
export const getAnswer= async (req, res) =>{

    const valid = await answerModel.find({id_problem: req.body.id, state: "Validated"})
    try {     
        res.status(200).json(valid);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}