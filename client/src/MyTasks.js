import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { Verify } from "./Verify";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import axios from 'axios';
import LoadingBar from "./LoadingBar";


const MyTasks = () => {

    Verify();

    let token = localStorage.getItem('user');
    let decoded = jwt_decode(token);

    const [problems, setProblems]  = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        

        axios({
            method: 'post',
            url: 'http://localhost:5000/answerid',
            data: {id: decoded.id}
            }).then((res) => {
                setProblems(res.data);
                setIsLoading(false);
                console.log(problems)
            }).catch(err => {
                setIsLoading(true);
                console.log(err.message)
            });

    }, [])
    


    return (
        <div className="mytasks">
            <NavBar />

            {isLoading && <div> <LoadingBar /> </div>}
            <div className="firstDiv"></div>
            {!isLoading && 

            
            problems.map((problem, index) =>  
            <div className="container w-50" key={index}>
                <div className="row">
                    <div className="col">
                        
                        <div className="content-task bg-white p-4 shadow mb-5">
                            <Link to={`/task/${problem.id_problem._id}`}>
                            <div className="row">
                                <div className="col-6 col-md-8 col-lg-9 col-xl-10 ">
                                    <h3>{problem.id_problem.name}</h3>
                                </div>
                                <div className="col text-center">
                                    <h3 className="reward">Reward</h3>
                                    <h3 className="mt-4 points">{problem.id_problem.reward}</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className={`state col-6 col-md-3 col-lg-2 mt-4 mt-md-2 text-center ml-3 ${problem.state}`}>
                                    <h5>{problem.state}</h5>
                                </div> 
                            </div>
                            </Link>
                        </div>


                    {/* end */}
                    </div>
            </div>
        </div>
        )
        }
        </div>
     );
}
 
export default MyTasks;