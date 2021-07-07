import problemModel from '../models/problem.js';
import topicModel from '../models/topic.js';

// add new topic
export const addTopic = async (req, res) =>{
        
        const topic = new topicModel(req.body);

        await topic.save();

        try {
            res.status(201).json(topic);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    
}

// get all topics
export const getAllTopics = async (req, res) =>{
    const topics = await topicModel.find();

    try {     
        res.status(200).json(topics);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//delete topic

export const deleteTopic = async (req, res) => {
    
    await problemModel.deleteMany({ id_topic: req.body.id}, (err) => {
        if(err){
            res.send(err);
        } else {
             topicModel.findByIdAndRemove(req.body.id, (err) => {
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

export const updateTopic = async (req, res) =>{
    console.log(req.body)
    await topicModel.findByIdAndUpdate(req.body.id,
        {
            name: req.body.name,
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


export const countTopic = async (req, res) =>{
    const problems = await problemModel.find().count({id_topic: req.body.id});

    try {     
        res.status(200).json(problems);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}