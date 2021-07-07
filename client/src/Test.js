import axios from 'axios';

import { useEffect, useState } from "react";

const Test = () => {
    const [problems, setProblems] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [topics, setTopics] = useState('');
    const [search, setSearch] = useState('');
    const [filteredPosts, setFiltedPosts] = useState([]);
    useEffect(() => {
        
        // get all posts
        const dataOne = axios.get("http://localhost:5000/topic");
        const dataTwo = axios.get("http://localhost:5000/problem");

        axios.all([dataOne, dataTwo]).then(
            axios.spread((topics, problems) => {
                setTopics(topics.data);
                setProblems(problems.data);
                setIsLoading(false);
            })
        )


    }, [problems]);

console.log(problems)
    useEffect(() => {
        if(problems){
            setFiltedPosts(
                problems.filter((problem) =>
                  problem.name.toLowerCase().includes(search.toLowerCase())
                )
              );
        }
        
      }, [search, problems]);

    return(
        
        <div className="test">
           
        <h1>test page</h1>
        <input
                    type="text"
                    placeholder="Search posts"
                    onChange={(e) => setSearch(e.target.value)}
                />
        {isLoading && <p>Loading...</p>}
        {!isLoading &&  

        <div className="container">
            {filteredPosts.map((problem, index) => 
            <h3>{problem.name}</h3> )}
            
        </div>
        }
       
    </div>
    )
    
    
    
}
 
export default Test;