import { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../services/AuthContext';
import { getUser, updateUser } from '../services/userApi';

export default function UserProfile() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUser(user.id);
        setProfile(userData);
        setFormData({
          email: userData.email,
          firstName: userData.firstName || '',
          lastName: userData.lastName || ''
        });
      } catch (err) {
        setError('Не удалось загрузить профиль');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(user.id, formData);
      setProfile(updatedUser);
      setEditMode(false);
    } catch (err) {
      setError('Ошибка при обновлении профиля');
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (!user) return <Alert variant="warning">Требуется авторизация</Alert>;

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: '600px' }}>
      <Card.Body>
        <Card.Title className="text-center mb-4">
          {editMode ? 'Редактирование профиля' : 'Мой профиль'}
        </Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}

        {editMode ? (
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Сохранить
              </Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>
                Отмена
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <div className="mb-4">
              <p><strong>Логин:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              {profile.firstName && <p><strong>Имя:</strong> {profile.firstName}</p>}
              {profile.lastName && <p><strong>Фамилия:</strong> {profile.lastName}</p>}
            </div>
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={() => setEditMode(true)}>
                Редактировать
              </Button>
              <Button variant="danger" onClick={signOut}>
                Выйти
              </Button>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}