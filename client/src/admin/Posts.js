import Template from "./Template";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import ReactPaginate from "react-paginate";


const Posts = () => {

    const [problems, setProblems] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [topics, setTopics] = useState('');
  
    const [search, setSearch] = useState('');
    const [filteredPosts, setFiltedPosts] = useState([]);
    
    const [updateLoading, setUpdateLoading] = useState(true);

    const [updateTitle, setUpdateTitle] = useState('');
    const [updateDescription, setUpdateDescription] = useState('');
    const [updateReward, setUpdateReward] = useState('');
    const [updateLink, setUpdateLink] = useState('');
    const [updateTopic, setUpdateTopic] = useState('');
    const [uId, setUid] = useState('');

    const [showAddPost, setShowAddPost] = useState(false);
    const handleCloseAddPost = () => setShowAddPost(false);
    const handleShowAddPost = () => setShowAddPost(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reward, setReward] = useState('');
    const [link, setLink] = useState('');
    const [sTopic, setsTopic] = useState('');
    

    const [selectError, setSelectError] = useState(false);

    //pagination 
    const [pageNumber, setPageNumber] = useState(0);
    const postPerPage = 3;
    const pagesVisited = pageNumber * postPerPage;

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

    
    useEffect(() => {
        if(problems){
            setFiltedPosts(
                problems.filter((problem) =>
                  problem.name.toLowerCase().includes(search.toLowerCase())
                )
              );
        }
        
      }, [search, problems]);
    
     
    const handleDelete = (e) =>{
        e.preventDefault();
        const id = e.target.id;

        axios({
            method: 'post',
            url: 'http://localhost:5000/problemdelete',
            data: {id}
            }).then((res) => {
                store.addNotification({
                    title: "Notification!",
                    message: "Post deleted successfully",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true
                    }
                  });
                
            }).catch(err => {
                console.log(err.message)
            });
    }

    const handleUpdate = (e) =>{
        e.preventDefault();
        const id = e.target.id;

        axios({
            method: 'post',
            url: 'http://localhost:5000/problemid',
            data: {id}
            }).then((res) => {
                setUpdateTitle(res.data.name);
                setUpdateDescription(res.data.description);
                setUpdateReward(res.data.reward);
                setUpdateLink(res.data.link);
                setUpdateTopic(res.data.id_topic._id);
                setUid(res.data._id);
                setUpdateLoading(false)
            }).catch(err => {
                console.log(err.message)
            });
    }

    const handlePostSubmit = (e) => {
        e.preventDefault();
        console.log(title, description, reward, link, sTopic)

        if(sTopic === ''){
            setSelectError(true);
        }else{
            setSelectError(false);
            axios({
                method: 'post',
                url: 'http://localhost:5000/problem',
                data: {
                   name: title, description, reward, link, id_topic: sTopic
                }
                }).then((res) => {
                    handleCloseAddPost();
                }).catch(err => {
                    console.log(err.message)
                });
            store.addNotification({
                title: "Notification!",
                message: "Post added successfully!!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
        }
       
    }

    const handleFormUpdate = (e) => {
        e.preventDefault();
        const id = e.target.id;
       
        axios({
            method: 'post',
            url: 'http://localhost:5000/problemupdate',
            data: {
               id, name: updateTitle, description: updateDescription, reward: updateReward, link: setUpdateLink, id_topic: updateTopic
            }
            }).then((res) => {
                handleCloseUpdate();
                store.addNotification({
                    title: "Notification!",
                    message: "Post updated successfully",
                    type: "info",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 2000,
                      onScreen: true
                    }
                  });
            }).catch(err => {
                console.log(err.message)
            });

    }
    const pageCount = Math.ceil(problems.length / postPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return ( 
        <div className="posts">
            <Template />
            <div className="main">
                <ReactNotification  />
            

                <div className="container  mt-5">
                 

                    <div className=" filter-post d-flex justify-content-between w-75">
                        <h1 className="text-danger my-auto">Posts page</h1>
                        <Button variant="danger" onClick={handleShowAddPost}>
                                            Add new post
                                        </Button>
                        <div className="my-auto">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search posts"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        </div>
                        
                    </div>
                    <hr  className="w-75 mb-4"/>
                        
                    
                 
                
                
                
                {isLoading && <p>Loading...</p>}
            {!isLoading &&  
                <div className="row ">

                    <div className="col-9 mx-auto">

                        {filteredPosts.slice(pagesVisited, pagesVisited + postPerPage).map((problem, index) => 
                            
                            <div className="post-list content-task bg-white p-4 shadow mb-5" key={index} id={problem.id_topic.name} >
                           
                                
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
                                    <div className="col-6 col-md-3 col-lg-2 mt-4 mt-md-2 text-center ml-3 topicx mr-auto">
                                        <h5 id='topicName'>{problem.id_topic.name}</h5>
                                    </div>
                                    <div className="col-2 mt-4 mt-md-2">
                                        <div className="row mx-auto">
                                            <form className="mx-auto" id={problem._id} onSubmit={e => handleUpdate(e)}>                                              
                                                <button onClick={handleShowUpdate}><i class="fas fa-edit"></i></button>
                                            </form>
                                            <form className="mx-auto" id={problem._id}  onSubmit={e => handleDelete(e)}>                                             
                                                <button type="submit">                                           
                                                <i class="far fa-trash-alt"></i>                                                  
                                                </button>
                                            </form>
                                        </div>
                                        
                                    </div>

                                    
                                   
                                </div>

                         
                            </div>
            
                        )}
                            
                                    <div className="text-center mb-3">
                                        <div>
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
                                    
                                        

                                        <Modal show={showAddPost} onHide={handleCloseAddPost}>
                                        <form onSubmit={e => handlePostSubmit(e)}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Add new post</Modal.Title>
                                            </Modal.Header>
                                            
                                            <Modal.Body>
                                                
                                                    <div className="form-group">
                                                        <label for="title">Title:</label>
                                                        <input type="text" className="form-control" id="title" 
                                                        onChange={e => setTitle(e.target.value)}
                                                        required />
                                                    </div>
                                                    
                                                    
                                                    <div className="form-group">
                                                        <label for="description">Description:</label>
                                                        <textarea className="form-control" id="description" rows="3"
                                                        onChange={e => setDescription(e.target.value)}
                                                        required></textarea>
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="reward">Reward:</label>
                                                        <input type="number" className="form-control" id="reward"
                                                        onChange={e => setReward(e.target.value)}
                                                        required />
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="link">Link <small>(optional)</small></label>
                                                        <input type="text" className="form-control" id="link" 
                                                        onChange={e => setLink(e.target.value)}
                                                        />
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="topics">Select Topic</label>
                                                        <select class="form-control" id="topics" 
                                                        onChange={e => setsTopic(e.target.value)}
                                                        required>
                                                            <option selected="true" disabled>select topic</option>
                                                            {topics.map(topic => <option value={topic._id} >{topic.name}</option> )}
                                                        </select>
                                                        {selectError && <p className="text-danger mt-2 ml-2">Please select Topic!!</p>}
                                                    </div>
                                                
                                            </Modal.Body>
                                            
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseAddPost}>
                                                Close
                                            </Button>
                                            <Button variant="danger" type="submit" >
                                                Add Post
                                            </Button>
                                            
                                            </Modal.Footer>
                                            </form>       
                                        </Modal>
                                    </div>

                                    <div className="text-center mb-3">
                                       
                                        {!updateLoading && 
                                        <Modal show={showUpdate} onHide={handleCloseUpdate}>
                                        <form id={uId} onSubmit={e => handleFormUpdate(e)} >
                                            <Modal.Header closeButton>
                                            <Modal.Title>Update Post</Modal.Title>
                                            </Modal.Header>
                                            
                                            <Modal.Body>
                                                
                                                    <div className="form-group">
                                                        <label for="title">Title:</label>
                                                        <input type="text" className="form-control" id="title"
                                                        value={updateTitle}
                                                        onChange={e => setUpdateTitle(e.target.value)}
                                                        required />
                                                    </div>
                                                    
                                                    
                                                    <div className="form-group">
                                                        <label for="description">Description:</label>
                                                        <textarea className="form-control" id="description" rows="3"
                                                        value={updateDescription}
                                                        onChange={e => setUpdateDescription(e.target.value)}
                                                        required></textarea>
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="reward">Reward:</label>
                                                        <input type="number" className="form-control" id="reward"
                                                        value={updateReward}
                                                        onChange={e => setUpdateReward(e.target.value)}
                                                        required />
                                                    </div>

                                                    <div className="form-group">
                                                        <label for="link">Link <small>(optional)</small></label>
                                                        <input type="text" className="form-control" id="link"
                                                        value={updateLink}
                                                        onChange={e => setUpdateLink(e.target.value)}
                                                        />
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="topics">Select Topic</label>
                                                        <select className="form-control" id="topics"
                                                        value={updateTopic}
                                                        onChange={e => setUpdateTopic(e.target.value)}
                                                        
                                                        >
                                                            {/* <option selected="true" disabled>select topic</option> */}
                                                            {topics.map(topic => <option value={topic._id} >{topic.name}</option> )}
                                                        </select>
                                                        {selectError && <p className="text-danger mt-2 ml-2">Please select Topic!!</p>}
                                                    </div>
                                                
                                                </Modal.Body>
                                                
                                                <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseUpdate}>
                                                    Close
                                                </Button>
                                                <Button variant="danger" type="submit" >
                                                    update
                                                </Button>
                                                
                                                </Modal.Footer>
                                            </form>       
                                        </Modal>
                                        }
                                    </div>
                                    
                                </div>
                            </div>




                        }

            
                </div>
                
     
            </div>

        
        </div>
     );
}
 
export default Posts;