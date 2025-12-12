import { Navigate, useLocation } from 'react-router-dom';
import { getAuth } from '../utils/authLocal';

export default function ProtectedRoute({ children }) {
    const auth = getAuth();
    const location = useLocation();

    if (!auth || !auth.token) {
        return <Navigate to="/auth/login" replace state={{ from: location }} />;
    }

    return children;
}
