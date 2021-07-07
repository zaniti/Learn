import { useHistory } from 'react-router-dom';

export const Verify = () => {
    let token = localStorage.getItem('user');
    
    const history = useHistory();
    
    if(token == null){
        history.push('/');
    }
}
 
