import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logosignup from './img/signup.jpg';
import axios from 'axios';
import SchemaValidation from "./validation/Validation";
import { useFormik } from "formik";


const Register = () => {

    const [error, setError] = useState('');
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            userName: "",
            email: '',
            password: '',
            passwordTwo: ''
        },
        onSubmit: (values) => {
          
            const user = {username: values.userName, email: values.email, password: values.password, passwordTwo: values.passwordTwo};

            axios({
                method: 'post',
                url: 'http://localhost:5000/register',
                data: user
                }).then((res) => {
                    console.log(res.data)   
                    if(res.data === "Email Already Exist!!"){
                        setError('Email Already Exist!!');
                    }
                    else{
                        setError('');
                        history.push('/');
                    }
                });
        },
        validationSchema: SchemaValidation
    })
    

    return ( 
        <div className="register pt-5">
            <h1 className="text-center mt-5 pb-5"><span className="l">L</span>earn</h1>
      
            <div className="container containerls shadow p-5 rounded mt-5 bg-white">
                
                <div className="row">

                    <div className="col-12 col-md-6 mb-5 mb-md-0">

                        <form className=" mx-auto" onSubmit={formik.handleSubmit}>
                            <h2 className="my-4">Sign Up</h2>
                            
                            <div className="row form-group">
                                <div className="col">
                                    <label for="usernmae">Username</label>
                                    <input type="text" className="form-control" name="userName" placeholder="Enter username"

                                    value={formik.values.userName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.userName && <div class="text-danger mt-3">{formik.errors.userName}</div>}
                                    
                                </div>

                                <div className="col">
                                    <label for="usernmae">Email</label>
                                    <input type="text" className="form-control" name="email" placeholder="Enter email"
                                   
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && <div class="text-danger mt-3">{formik.errors.email}</div>}
                                    <p className="text-danger"> {error} </p>
                                </div>
                                                                    
                            </div>
                            <div className="row form-group">
                                <div className="col">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Password"
                                    
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.password && <div class="text-danger mt-3">{formik.errors.password}</div>}
                                   
                                </div>
                                
                                <div className="col">
                                    <label for="exampleInputPassword1">Confirm Password</label>
                                    <input type="password" className="form-control" name="passwordTwo" placeholder="Password"
                            
                                    value={formik.values.passwordTwo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    /> 
                                    {formik.errors.passwordTwo && <div class="text-danger mt-3">{formik.errors.passwordTwo}</div>}
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