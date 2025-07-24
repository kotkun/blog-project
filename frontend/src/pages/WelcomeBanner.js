import { useAuth } from './AuthContext';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function WelcomeBanner() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Alert variant="info" className="text-center">
        Добро пожаловать! <Link to="/login">Войдите</Link> или{' '}
        <Link to="/register">зарегистрируйтесь</Link>.
      </Alert>
    );
  }

  return (
    <Alert variant="success" className="text-center">
      Добро пожаловать, <strong>{user.username}</strong>!{' '}
      <Button variant="outline-success" size="sm" as={Link} to="/profile">
        Мой профиль
      </Button>
    </Alert>
  );
}