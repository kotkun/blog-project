import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createPost, getPost, updatePost } from '../../services/api/api';
import PostCard from '../../components/Post/PostCard';
import { Container, Button, Spinner } from 'react-bootstrap';

export default function PostFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(!!id);
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            const fetchPost = async () => {
                try {
                    const data = await getPost(id);
                    setPost(data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchPost();
        }
    }, [id, isEditMode]);

    const handleSubmit = async (formData) => {
        try {
            if (isEditMode) {
                await updatePost(id, formData);
            } else {
                await createPost(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{isEditMode ? 'Редактировать пост' : 'Создать пост'}</h2>
                <Button
                    variant="outline-secondary"
                    onClick={() => navigate(-1)}
                >
                    Назад
                </Button>
            </div>

            <PostCard
                initialData={post || { title: '', content: '' }}
                onSubmit={handleSubmit}
            />
        </Container>
    );
}