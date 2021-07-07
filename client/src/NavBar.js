import { useEffect, useState } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import userLogo from './img/newuser.png';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import logo from './img/learn1.png';


const NavBar = () => {
    const [points, setPoints] = useState('');
    let token = localStorage.getItem('user');
    let decoded = jwt_decode(token);
    const [role, setRole] = useState('');
    useEffect(() => {
      axios({
          method: 'post',
          url: 'http://localhost:5000/updateUserDetails',
          data: {id : decoded.id}
          }).then((res) => {
            setPoints(res.data.points);
            setRole(res.data.role);
          }).catch(err => {
              console.log(err.message)
          });
    }, []);

    const history = useHistory();
    const handleClick = () =>{
      localStorage.removeItem('user');
      history.push('/');
    }

    return ( 

      <Navbar className="shadow" bg="white" expand="lg">
        <div className="container container-navbar">
        <Navbar.Brand className="LogoMenu mr-5" href="/home">
        <img src={logo} width="100"/>
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto tasks-profile">
          <NavLink className="mr-3" to="/home" activeClassName="active">Tasks</NavLink>
          <NavLink to="/mytasks" activeClassName="active">My Tasks</NavLink>
          
        </Nav>
        
        <Nav>
        <h5 className="my-lg-auto my-4 mr-3 navbar-points"><span>{points}</span> Points</h5>
        <NavDropdown title={<img src={userLogo} />} id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            {role=== 'admin' && <NavDropdown.Item href="/admin">Dashboard</NavDropdown.Item>}
            <NavDropdown.Divider />
            <button className="logout dropdown-item" onClick={handleClick}>Logout</button>
          </NavDropdown>
        </Nav>

      </Navbar.Collapse>
        </div>
    </Navbar>
       
     );
}
 
export default NavBar;