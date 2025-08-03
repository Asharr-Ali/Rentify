import axios from 'axios'
import { toast } from 'react-toastify';

const LogOut = (Navigate) => {
    toast.success ('User Loggged Out Successfully!');
    setTimeout(() => {
        localStorage.removeItem ('token');
        delete axios.defaults.headers.common['x-auth-token'];
        Navigate ('/');
    }, 3000);
}

export default LogOut;