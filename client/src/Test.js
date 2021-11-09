import axios from 'axios';

import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Test = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const postPerPage = 2;
    const pagesVisited = pageNumber * postPerPage;
    const [displayPost, setDisplayPost] = useState('');
    
    const [topics, setTopics] = useState('');
    const [problems, setProblems] = useState('');
    const [data , setData] = useState(true);

    

      
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
            
            if(!data){
                setDisplayPost(
                    problems
                    .slice(pagesVisited, pagesVisited + postPerPage)
                    .map((problem) => {
                    return (
                        <div className="user">
                        <h3>{problem.name}</h3>
                        </div>
                    );
                    })
                )
            }


    }, [problems]);

    const pageCount = Math.ceil(problems.length / postPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
      };
    // console.log(displayPost)

    return(
        
        <div className="test">
           
            <h1>test page</h1>
            {!data && displayPost}

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
        </div>
    )
    
    
    
}
 
export default Test;