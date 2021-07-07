import { useEffect } from "react";
import { Link } from "react-router-dom";
import './404.css';


const NotFound = () => {

    useEffect(()  => {
        document.body.classList.add('bodyWhite');
    
        return () => {
            document.body.classList.remove('bodyWhite');
        };
    },);

    return ( 
        <div className="notfound">
            
            <div class="container text-center pt-5">
                <div class="row">	
                    <div class="col-sm-12 mt-5">
                        <div class="col-sm-10 mx-auto">
                            <div class="four_zero_four_bg">
                                <h1 class="text-center ">404</h1>
                            </div>
                        
                            <div class="contant_box_404">

                                <p>the page you are looking for not avaible!</p>
                            
                                <Link to="/home" class="link_404">Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NotFound;