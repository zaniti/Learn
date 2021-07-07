import NavBar from './NavBar';
import Question from './Question';
import { Verify } from './Verify';

const Task = () => {
    Verify();
    
    return ( 
        <div className="task">
            <NavBar />
            <Question />
        </div>
     );
}
 
export default Task;