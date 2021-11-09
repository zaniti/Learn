import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";
import LoadingBar from "./LoadingBar";
import ReactPaginate from "react-paginate";





const Tasks = () => {

    const [topics, setTopics] = useState('');
    const [problems, setProblems] = useState('');
    const [data , setData] = useState(true);

    //pagination 
    const [pageNumber, setPageNumber] = useState(0);
    const postPerPage = 3;
    const pagesVisited = pageNumber * postPerPage;
      
    useEffect(() => {
        
        
        const dataOne = axios.get("http://localhost:5000/topic");
        const dataTwo = axios.get("http://localhost:5000/problem");

        axios.all([dataOne, dataTwo]).then(
            axios.spread((topics, problems) => {
                setTopics(topics.data);
                setProblems(problems.data);
                setData(false);
            })
        )
        

    }, []);


    const pageCount = Math.ceil(problems.length / postPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    
    if (data) return <div> <LoadingBar /> </div>



    
    const handleClick = (e) => {
        const taskDiv = document.querySelectorAll('.content-task');

        taskDiv.forEach(task => {
            if(e.target.textContent === task.id){
                task.classList.remove("d-none");
            }
            else if(e.target.textContent === 'All'){
                task.classList.remove("d-none");
            }
            else{
                task.classList.add("d-none");
            }
        })  
    }
    
    
    return ( 
        
        
        <div className="tasks mt-5">
            
            <div className="container pt-5">

                <div className="row">
                    <div className="col-3 all-topics d-none d-md-block overflow-auto">
     
                        
                        <ul className="list-topics">
                            <li><button type="submit" onClick={e => handleClick(e)}>All</button></li>
                            {topics.map((topic, index) =>
                                <li key={index}><button onClick={e => handleClick(e)}>{topic.name}</button></li>
                            )}
                        </ul>
                    </div>
                    
                    <div className="col-9">
                    {problems.slice(pagesVisited, pagesVisited + postPerPage).map((problem, index) => 
                        
                        <div className="content-task bg-white p-4 shadow mb-5" key={index} id={problem.id_topic.name}>
                            <Link to={`/task/${problem._id}`}>
                            
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
                                <div className="col-6 col-md-3 col-lg-2 mt-4 mt-md-2 text-center ml-3 topicx">
                                    <h5 id='topicName'>{problem.id_topic.name}</h5>
                                </div> 
                            </div>
                            </Link>
                        </div>
        
                    )}
                    {problems.length > 3 &&
                    <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    />
                }
                    </div>
     
                </div>
                
            </div>
        </div>
     );
}
 
export default Tasks;