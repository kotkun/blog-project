import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from '../../services/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginForm() {
    const [credentials, setCredentials] = useState({
        username: 'admin',
        password: 'admin'
    });
    const [error, setError] = useState('');
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(credentials);
            navigate('/');
        } catch (err) {
            console.error('Login error:', err); // Добавляем логирование ошибки
            setError(err.response?.data?.message || 'Invalid username or password');
        }
    };

    return (
        <Card className="mx-auto mt-5" style={{ maxWidth: '400px' }}>
            <Card.Body>
                <Card.Title className="text-center mb-4">Login</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={credentials.username}
                            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                            required
                            autoComplete="username"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                            required
                            autoComplete="current-password"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mb-3">
                        Login
                    </Button>
                    <div className="text-center">
                        <span className="text-muted">Don't have an account? </span>
                        <Link to="/register">Register</Link>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}