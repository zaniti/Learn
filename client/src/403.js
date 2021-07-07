import { Link } from 'react-router-dom';
import './404.css';

const AccessDenied = () => {
    return ( 
        <div className="denied">
            <div className="container refused">
                <div className="forbidden-sign"></div>
                <h1 className="font-weight-bold">Access to this page is restricted.</h1>
                <p>Ensure you have sufficient permissions.</p>
                
                <p><Link className="error-link" to="/home"><i className="fas fa-arrow-left mr-2"></i>Go back</Link></p>
            </div>
        </div>
     );
}
 
export default AccessDenied;