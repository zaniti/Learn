import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logosignup from './img/signup.jpg';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SchemaValidation from "./Validation";


const Register = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SchemaValidation),
    });
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();


    const submitForm = (data) => {
        // console.log(data);

        const user = {username, email, password}

        axios({
            method: 'post',
            url: 'http://localhost:5000/register',
            data: user
            }).then((res) => {
                if(res.data === "Email Already Exist!!"){
                    setError('Email Already Exist!!');
                }else{
                    setError('');
                    history.push('/');
                }
            });
    };

    return ( 
        <div className="register pt-5">
            <h1 className="text-center mt-5 pb-5"><span className="l">L</span>earn</h1>
      
            <div className="container containerls shadow p-5 rounded mt-5 bg-white">
                
                <div className="row">

                    <div className="col-12 col-md-6 mb-5 mb-md-0">

                        <form className=" mx-auto" onSubmit={handleSubmit(submitForm)}>
                            <h2 className="my-4">Sign Up</h2>
                            
                            <div className="row form-group">
                                <div className="col">
                                    <label for="usernmae">Username</label>
                                    <input type="text" className="form-control" name="userName" placeholder="Enter username"
                                    required
                                    {...register("userName")}
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    />    
                                    <p className="text-danger"> {errors.userName?.message} </p>
                                </div>

                                <div className="col">
                                    <label for="usernmae">Email</label>
                                    <input type="email" className="form-control" name="email" placeholder="Enter email"
                                    required
                                    {...register("email")}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    />
                                    <p className="text-danger"> {errors.email?.message} </p>
                                    <p className="text-danger"> {error} </p>
                                </div>
                                                                    
                            </div>
                            <div className="row form-group">
                                <div className="col">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Password"
                                    required
                                    {...register("password")}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    />
                                    <p className="text-danger"> {errors.password?.message} </p>
                                </div>
                                
                                <div className="col">
                                    <label for="exampleInputPassword1">Confirm Password</label>
                                    <input type="password" className="form-control" name="confirmPassword" placeholder="Password"
                                    required
                                    {...register("confirmPassword")}
                                    value={passwordTwo}
                                    onChange={e => setPasswordTwo(e.target.value)}
                                    />  
                                    <p className="text-danger"> {errors.confirmPassword && "Passwords Should Match!"} </p>
                                </div>
                            </div>      
                            <button type="submit" className="btn btn-danger mt-4">Register</button>                            
                        </form>
                    </div>

                    <div className="col-12 text-center col-md-6">
                        <div className="mt-4">
                            <img src={logosignup} alt="login image"/>
                        </div>
                        
                        <div className="mt-4 create-account">
                            <Link to="/" className="login-a">Already Member?</Link>
                        </div>
                        
                    </div>

                </div>
                
            </div>
            <div className="test"></div>
        </div>
     );
}
 
export default Register;