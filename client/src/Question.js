import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router";
import jwt_decode from "jwt-decode";
import LoadingBar from "./LoadingBar";

const Question = () => {

    const { id } = useParams();
    const [problem, setProblem]  = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    const [url, setUrl] = useState('');
    const [message, SetMessage] = useState('');

    const [testPost, setTestPost] = useState('');
    const [valid, setValid] = useState('');

    let token = localStorage.getItem('user');
    let decoded = jwt_decode(token);

    useEffect(() => {

        const dataOne = axios.post("http://localhost:5000/problemid", {id});
        const dataTwo = axios.post("http://localhost:5000/answercount", {id});
        const dataThree = axios.post("http://localhost:5000/answercount/valid", {id});

        axios.all([dataOne, dataTwo, dataThree] ).then(
            axios.spread((problem, answer, valid) => {
                setProblem(problem.data);
                setTestPost(answer.data);
                setValid(valid.data);
                setIsLoading(false);
            })
        )
    }, [])

    
    const handleSubmit = () => {
        if(message === ''){
            const data = {
                id_user: decoded.id,
                id_problem: id,
                link: url,
                message: "---"
            }
            axios({
                method: 'post',
                url: 'http://localhost:5000/answer',
                data: data
                }).then((res) => {
                    console.log('sent')
                }).catch(err => {
                    
                    console.log(err.message)
                });
        }else{
            const data = {
                id_user: decoded.id,
                id_problem: id,
                link: url,
                message: message
            }
            axios({
                method: 'post',
                url: 'http://localhost:5000/answer',
                data: data
                }).then((res) => {
                    console.log('sent')
                }).catch(err => {
                    
                    console.log(err.message)
                });
        }
        
        
    }

    
    if (isLoading) return <div> <LoadingBar /> </div>

    return ( 

        
        <div className="tasks mt-5">

            {!isLoading && 
            <div className="container pt-5">
                <div className="row">
                    <div className="col-9 mx-auto">
                        
                        <div className="content-task bg-white p-4 shadow mb-5">
                            <div className="row">
                                <div className="col-6 col-md-8 col-lg-9 col-xl-10 ">
                                    <h3>{problem.name}</h3>
                                </div>
                                <div className="col text-center">
                                    <h3 className="reward">Reward</h3>
                                    <h3 className="mt-4 points">{problem.reward}</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mt-3">
                                <p>{problem.description}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col my-3">
                                <a className="text-danger" href={problem.link} target="_blank">Go to link</a>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-6 col-md-3 col-lg-2 mt-4 mt-md-2 text-center ml-3 topicx">
                                    <h5>{problem.id_topic.name}</h5>
                                </div> 
                            </div>
                        </div>

                        <div className="content-taskk bg-white p-4 shadow mb-5">
                           
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <input className="form-control" type="text" id="repo" placeholder="Send Your Github Repo!" required
                                        onChange={e => setUrl(e.target.value) }
                                        />
                                    </div>
                                    <div className="col-12 my-3">
                                        <input className="form-control" type="text" placeholder="Type your message!"
                                        onChange={e => SetMessage(e.target.value) }
                                        />
                                    </div>
                                    
                                    <div className="col p-0 text-right mr-3">
                                       {testPost.length != 0 || valid.length !=0 ? <button type="submit" class="btn btn-danger" disabled>Send</button> : <button type="submit" class="btn btn-danger">Send</button> } 
                                    </div>
                                    
                                </div>
                                
                            </form>

                        </div>

                    {/* end */}
                    </div>
     
                </div>
                
            </div>
            }
        </div>
     );
}
 
export default Question;