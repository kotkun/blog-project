import { useAuth } from '../../services/context/AuthContext';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function WelcomeBanner() {
    const { user } = useAuth();

    if (!user) {
        return (
            <Alert variant="info" className="text-center mb-4">
                Welcome! Please <Link to="/login">login</Link> or <Link to="/register">register</Link>.
            </Alert>
        );
    }

    return (
        <Alert variant="success" className="text-center mb-4">
            Welcome back, <strong>{user.username}</strong>!{' '}
            <Button variant="outline-success" size="sm" as={Link} to="/profile">
                My Profile
            </Button>
        </Alert>
    );
}