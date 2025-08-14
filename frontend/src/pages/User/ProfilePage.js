import { Container } from 'react-bootstrap';
import ProfileForm from '../../components/User/ProfileForm';

import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/api/userApi';

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const loadProfile = async () => {
            const profile = await getUserProfile();
            setUser(profile);
            setFormData({
                username: profile.username,
                email: profile.email,
                password: ''
            });
        };
        loadProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUserProfile(formData);
            setUser(updatedUser);
            // Показать уведомление об успехе
        } catch (error) {
            // Обработка ошибки
        }
    };

  return (
      <Container className="py-4">
        <h1 className="mb-4">My Profile</h1>
        <ProfileForm />
      </Container>
  );
}