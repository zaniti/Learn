import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Verify } from "./Verify";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Link } from "react-router-dom";
import LoadingBar from "./LoadingBar";
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import SchemaValidationPassword from "./validation/UpdatePassword";
import { useFormik } from "formik";



const Profile = () => {
    Verify();


    const [email, SetEmail] = useState('');
    const [name, SetName] = useState('');
    const [username, SetUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [verifyOldPassword, setVerifyOldPassword] = useState(false);

    const [showEmail, setShowEmail] = useState(false);
    const handleCloseEmail = () => setShowEmail(false);
    const handleShowEmail = () => setShowEmail(true);

    const [showName, setShowName] = useState(false);
    const handleCloseName = () => setShowName(false);
    const handleShowName = () => setShowName(true);

    const [showUsername, setShowUsername] = useState(false);
    const handleCloseUsername = () => setShowUsername(false);
    const handleShowUsername = () => setShowUsername(true);

    const [showPassword, setShowPassword] = useState(false);
    const handleClosePassword = () => setShowPassword(false);
    const handleShowPassword = () => setShowPassword(true);
    
    const [isPending, setIsPending] = useState(true);

    const [emailExist, setEmailExist] = useState(false);
    const [validUsername, setValidUsername] = useState(false);
    const [data, setData] = useState('');
    const [points, setPoints] = useState('');

    

    let token = localStorage.getItem('user');
    let decoded = jwt_decode(token);


    const usernameReg = new RegExp(/^\S*$/);

    const [errorPayment, setErrorPayment] = useState(true);


// get data from database
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/updateUserDetails',
            data: {id : decoded.id}
            }).then((res) => {
                setData(res.data);
                SetEmail(res.data.email);
                SetName(res.data.name);
                SetUsername(res.data.username);
                setPoints(res.data.points);
                setIsPending(false);
            }).catch(err => {
                console.log(err.message)
            });
    }, []);

    const handleForm = (e) => {
        e.preventDefault();
        const data = {id: decoded.id, name, username };
        axios({
            method: 'post',
            url: 'http://localhost:5000/update',
            data: data
            }).then((res) => {
                if(!usernameReg.test(username)){
                    setValidUsername(true);
                    console.log('please enter a valid username');
                }else{
                    setValidUsername(false);
                    handleCloseName();
                    handleCloseUsername();
                    handleClosePassword();
                    store.addNotification({
                        title: "Notification!",
                        message: "Your information was updated successfully",
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
                }
                
            }).catch(err => {
                console.log('Error: ',err.message)
            } );
    };

    const handleFormEmail = (e) => {
        e.preventDefault();
        const data = {id: decoded.id, email};
        axios({
            method: 'post',
            url: 'http://localhost:5000/updateemail',
            data: data
            }).then((res) => {
                setEmailExist(false);
                handleCloseEmail();
                store.addNotification({
                    title: "Notification!",
                    message: "Email updated successfully",
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
                setEmailExist(true);
                console.log('Error: ',err.message);
            } );
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            passwordTwo: ''
        },
        onSubmit: (values) => {
          const ps = {id: decoded.id, old: oldPassword, password: values.password, passwordTwo: values.passwordTwo };
          axios({
            method: 'post',
            url: 'http://localhost:5000/update/password/old',
            data: ps
            }).then((res) => { 

                if(res.data){
                    setVerifyOldPassword(false);
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/updatepassword',
                        data: ps
                        }).then(res => {

                                setVerifyOldPassword(false);
                                values.password = '';
                                values.passwordTwo = '';
                                setOldPassword('');
                                handleClosePassword();
                                store.addNotification({
                                    title: "Notification!",
                                    message: "Password updated successfully",
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
                            }
                        ).catch(err => {
                            console.log('Error: ',err.message)
                        } );
                }else{
                    setVerifyOldPassword(true);
                }
            }).catch(err => {
                console.log('Error: ',err.message)
            } );
 
        },
        validationSchema: SchemaValidationPassword
    })

    const handlePayment = (e) =>{
      
        if(points < 100){
             console.log('payment failed ');
             setErrorPayment(true);
        }else{
            const data = {id_user: decoded.id, amount: points };
            const datat = {id: decoded.id};

            const dataOne = axios.post("http://localhost:5000/payment", data);
            const dataTwo = axios.post("http://localhost:5000/payment/update", datat);

            axios.all([dataOne, dataTwo])
            .then(res =>{
                setErrorPayment(false);
                store.addNotification({
                    title: "Notification!",
                    message: "Your  payment request has been submitted successfully",
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

            });
                   
            
        }
     
    }

    useEffect(() =>{
        if(points < 100000){
            setErrorPayment(true);
            
        }else{
            setErrorPayment(false);
        }
    });

    return ( 
        
        <div className="profile">
            <NavBar />
            
            {isPending && <div> <LoadingBar /> </div>}
            <ReactNotification  />
            {!isPending && 
            
            <div className="profile-containerr container profile-container mt-5 bg-white shadow p-5">
            
                <div className="row px-5">
                
                    <div className="col-4">
                        <h4>Primary Email</h4>
                        <p>(Use paypal email)</p>
                    </div>
                    <div className="col">
                        <h4>{email}</h4>
                        <Button variant="danger" onClick={handleShowEmail}>
                            Change email
                        </Button>
                        
                    </div>
                </div>
                <hr/>

                <div className="row px-5">
                    <div className="col-4">
                        <h4>Name</h4>
                    </div>
                    <div className="col">
                        <h4>{name}</h4>
                        <Button variant="danger" onClick={handleShowName}>
                            Change name
                        </Button>
                        
                    </div>
                </div>
                <hr/>
                <div className="row px-5">
                    <div className="col-4">
                        <h4>Username</h4>
                    </div>
                    <div className="col">
                        <h4>@{username}</h4>
                        <Button variant="danger" onClick={handleShowUsername}>
                            Change username
                        </Button>
                        
                    </div>
                </div>
                <hr/>
                <div className="row px-5">
                    <div className="col-4">
                        <h4>Password</h4>
                    </div>
                    <div className="col">
                    <Button variant="danger" onClick={handleShowPassword}>
                            Change password
                    </Button>
                        
                    </div>
                </div>
                <hr/>
                <div className="row px-5">
                    <div className="col-4">
                        <h4>Payment history</h4>
                    </div>
                    <div className="col my-auto">
                        
                        <Link to="/payment">
                            View Payment History
                        </Link>

                    </div>
                </div>
                
               {/* Modal for email*/}
             
                <Modal
                    show={showEmail}
                    onHide={handleCloseEmail}
                    backdrop="static"
                    keyboard={false}
                >   <form onSubmit={e => handleFormEmail(e)}>
                    <Modal.Header closeButton>
                    <Modal.Title>Change email</Modal.Title>
                    
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-group">
                        <label for="email">New email address</label>
                        <input type="email" class="form-control" id="email" name="email" aria-describedby="emailHelp" 
                        required
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}
                        />
                        {emailExist && <p className='text-danger mt-2 ml-2'>Email already exist!!</p>}
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEmail}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit">Submit</Button>
                    </Modal.Footer>
                    
                    </form>
                </Modal>

                {/* end model for email */}

                {/* Modal for name*/}
             
                <Modal
                    show={showName}
                    onHide={handleCloseName}
                    backdrop="static"
                    keyboard={false}
                >   <form onSubmit={handleForm}>
                    <Modal.Header closeButton>
                    <Modal.Title>Change name</Modal.Title>
                    
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-group">
                        <label for="name">New name</label>
                        <input type="text" class="form-control" id="name" required
                        value={name}
                        onChange={(e) => SetName(e.target.value)}
                        />
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseName}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit">Submit</Button>
                    </Modal.Footer>
                    
                    </form>
                </Modal>

                {/* end model for name */}

                {/* Modal for username*/}
             
                <Modal
                    show={showUsername}
                    onHide={handleCloseUsername}
                    backdrop="static"
                    keyboard={false}
                >   <form onSubmit={handleForm}>
                    <Modal.Header closeButton>
                    <Modal.Title>Change username</Modal.Title>
                    
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-group">
                        <label for="username">New username</label>
                        <input type="text" class="form-control" name="username"
                        value={username}
                        onChange={(e) => SetUsername(e.target.value)}
                        required/>
                        {validUsername && <p className='text-danger mt-2 ml-2'>Please enter a valid username</p>}
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUsername}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit">Submit</Button>
                    </Modal.Footer>
                    
                    </form>
                </Modal>

                {/* end model for username */}

                {/* Modal for password*/}
             
                <Modal
                    show={showPassword}
                    onHide={handleClosePassword}
                    backdrop="static"
                    keyboard={false}
                >   <form onSubmit={formik.handleSubmit}>
                    <Modal.Header closeButton>
                    <Modal.Title>Change password</Modal.Title>
                    
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-group">

                        <label for="oldpassword">Old password</label>
                        <input type="password" class="form-control" id="oldpassword"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)} 
                                required/>
                        {verifyOldPassword && <p className="text-danger mt-2 ml-2">Password Incorrect!!</p>}

                        <label for="password">New password</label>
                        <input type="password" class="form-control" id="password" name="password"
                                    
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && <div class="text-danger mt-3">{formik.errors.password}</div>}

                        <label for="password" className="mt-3">Confirm password</label>
                        <input type="password" class="form-control" id="passwordtwo" name="passwordTwo"

                                value={formik.values.passwordTwo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                        
                        />
                        {formik.touched.passwordTwo && <div class="text-danger mt-3">{formik.errors.passwordTwo}</div>}
                        
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePassword}>
                        Close
                    </Button>
                    <Button variant="danger" type="submit">Submit</Button>
                    </Modal.Footer>
                    
                    </form>
                </Modal>

                {/* end model for password */}

                
            </div>
        }
        {!isPending && 
            <div className="container bg-white profile-container mt-5 py-3 px-5 shadow">
                <div className="row ">
                    <div className="col-4 col-md-3 col-lg-2 ">
                        <h4 className="credit">My credit:</h4>
                    </div>
                    <div className="col-5 mr-auto">
                        <h4 className="text-danger">{points} Points <span className="dollar"> / {(points*0.0005).toFixed(2)}$</span></h4>
                    </div>
                    <div className="col-3 ">
                    {!isPending &&
                        <form className="my-auto" onSubmit={e => handlePayment(e)}>
                            
                            {errorPayment ? <button type="submit" class="btn btn-danger" disabled>Request Payment!</button> : <button type="submit" class="btn btn-danger">Request Payment!</button>}
                        </form>
                    }
                    </div>
                </div>
                <small>You need at least 100,000 points to request a payement!</small>
            </div>
        }
        </div>
     );
}
 
export default Profile;