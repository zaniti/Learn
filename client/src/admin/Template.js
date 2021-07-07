import { Link, useHistory } from "react-router-dom";
import logo from '../img/learn.png';
import { Verify } from "../Verify";
import jwt_decode from "jwt-decode";
import { useState } from "react";


const Template = () => {

    Verify();
    const history = useHistory();
    const handleClick = () =>{
      localStorage.removeItem('user');
      history.push('/');
    }

    let token = localStorage.getItem('user');
    let decoded = jwt_decode(token);
    const [role, setRole] = useState(decoded.role);

    // setRole();

    if(role === 'user') {
        history.push('/denied');
    }

    return ( 
        <div className="template">
            <div className="header">
                <div  id="menu-action">
                    <i class="fa fa-bars"></i>
                </div>
                <div className="logo mt-2 text-center">             
                    <img src={logo} width="100"/>
                </div>
            </div>
            
            <div className="sidebar">
                <ul>
                    <li><Link to="/admin/users"><i class="fas fa-users"></i><span>Manage users</span></Link></li>
                    <li><Link to="/admin/posts"><i class="fa fa-server"></i><span>Manage posts</span></Link></li>
                    <li><Link to="/admin/topics"><i class="fas fa-layer-group"></i><span>Manage topics</span></Link></li>
                    <li><Link to="/admin/answers"><i class="fas fa-clipboard-check"></i><span>Validate answers</span></Link></li>
                    <li><Link to="/admin/payments"><i class="far fa-money-bill-alt"></i><span>Payments requested</span></Link></li>
                    <li><Link to="/"><i class="fas fa-arrow-left"></i><span>Back To User Interface</span></Link></li>
                    <li><Link onClick={handleClick}><i class="fas fa-sign-out-alt"></i><span>Logout</span></Link></li>
                </ul>
            </div>

        
        </div>

        
     );
}
 
export default Template;