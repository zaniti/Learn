import answerModel from '../models/answer.js';
import problemModel from '../models/problem.js';
import topicModel from '../models/topic.js';

// add new problem
export const addProblem = async (req, res) =>{
        
    const problem = new problemModel(req.body);

    await problem.save();

    try {
        res.status(201).json(problem);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// get all problems
export const getAllProblems = async (req, res) =>{
    const problems = await problemModel.find().populate('id_topic');

    try {     
        res.status(200).json(problems);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get problem by id
export const getProblem = async (req, res) =>{

    problemModel.findById(req.body.id, (err, problem) => {
        if(err){
            res.send(err)
        }
        else{
            res.send(problem)
        }
    }).populate('id_topic');
}

//delete problem
export const deleteProblem = async (req, res) => {

    await answerModel.deleteMany({ id_problem: req.body.id}, (err) => {
        if(err){
            res.send(err);
        } else {
                problemModel.findByIdAndRemove(req.body.id, (err) => {
                console.log(req.body)
                if(err){
                    res.send(err);
                } else {
                    res.send('topic deleted!!');
                }
            })
        }
    });
        

}

export const updateProblem = async (req, res) =>{
    console.log(req.body)
    await problemModel.findByIdAndUpdate(req.body.id,
        {
            name: req.body.name,
            description: req.body.description,
            reward: req.body.reward,
            id_topic: req.body.id_topic,
            link: req.body.link
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