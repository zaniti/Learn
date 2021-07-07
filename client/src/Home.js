import NavBar from './NavBar';
import Tasks from './Tasks';
import { Verify } from './Verify';

const Home = () => {
   Verify();
    return ( 
        <div className="home">
            <NavBar />
            <Tasks/>
        </div>
     );
}
 
export default Home;