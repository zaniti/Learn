import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from './img/login.jpg';
import axios from 'axios';

const Login = () => {
    const history = useHistory();
    let token = localStorage.getItem('user');
    token && history.push('/home');
    
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [userFounded, setUserFounded ] = useState(false);
    

    const handleSubmit = (e) =>{
        e.preventDefault();

        const user = {email, password};
        axios({
            method: 'post',
            url: 'http://localhost:5000/login',
            data: user
        }).then((res) => {
            setUserFounded(false);
            localStorage.setItem('user', JSON.stringify({
                login: true,
                token: res.data.accessToken
            }));
            history.push('/home');
        }).catch((err) =>{
            setUserFounded(true);
        })
    }

    return ( 
        <div className="login pt-5">
            <h1 className="text-center mt-5 pb-5"><span className="l">L</span>earn</h1>
            {userFounded && <h5 className="text-center text-danger">Email or password incorrect!!</h5>}
            <div className="container containerls shadow p-5 rounded mt-5 bg-white">
                <div className="row">
                    <div className="col-12 text-center order-last order-md-first col-md-6">
                        <div className="mt-4">
                            <img src={logo} alt="login image"/>
                        </div>
                        
                        <div className="mt-4 create-account">
                            <Link to="/register" className="login-a">Creat Account</Link>
                        </div>
                        
                    </div>

                    <div className="col-12 col-md-6 mb-5 mb-md-0">

                        <form className="w-75 mx-auto" onSubmit={handleSubmit}>
                            <h2 className="my-4">Login</h2>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                required
                                onChange={e => setEmail(e.target.value)}
                                />                 
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                required
                                onChange={e => setPassword(e.target.value)}
                                />
                            </div>      
                            <button type="submit" className="btn btn-danger float-right mt-4">Login</button>                            
                        </form>

                    
                    </div>
                </div>
                
            </div>
            <div className="test"></div>

        </div>
     );
}
 
export default Login;