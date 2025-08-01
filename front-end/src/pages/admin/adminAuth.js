import { useNavigate } from 'react-router';
import { decodeToken } from '../../components/services/decodeToken';
import { useEffect } from 'react';

export function AdminAuth () {
    const user = decodeToken ();
    const Navigate = useNavigate();

    useEffect (() => {
        if (!user || !user.isAdmin) Navigate ('/', { replace: true });

    }, [user])

    if (!user || !user.isAdmin) return null;
    return user;
}
 
export default AdminAuth;