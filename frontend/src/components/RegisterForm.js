import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!userData.username) newErrors.username = 'Обязательное поле';
        if (!userData.email.includes('@')) newErrors.email = 'Некорректный email';
        if (userData.password.length < 6) newErrors.password = 'Минимум 6 символов';
        if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await signUp({
                username: userData.username,
                email: userData.email,
                password: userData.password
            });
            navigate('/');
        } catch (err) {
            setApiError(err.message || 'Ошибка регистрации');
        }
    };

    return (
        <Card className="mx-auto mt-5" style={{ maxWidth: '500px' }}>
            <Card.Body>
                <Card.Title className="text-center mb-4">Регистрация</Card.Title>
                {apiError && <Alert variant="danger">{apiError}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control
                            isInvalid={!!errors.username}
                            type="text"
                            value={userData.username}
                            onChange={(e) => setUserData({...userData, username: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            isInvalid={!!errors.email}
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            isInvalid={!!errors.password}
                            type="password"
                            value={userData.password}
                            onChange={(e) => setUserData({...userData, password: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Подтвердите пароль</Form.Label>
                        <Form.Control
                            isInvalid={!!errors.confirmPassword}
                            type="password"
                            value={userData.confirmPassword}
                            onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="success" type="submit" className="w-100">
                        Зарегистрироваться
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}