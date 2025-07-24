import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Проверка авторизации...</div>;
    if (!user) return <Navigate to="/login" replace />;

    return children;
}