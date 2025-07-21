import { useNavigate, useParams } from 'react-router-dom';
import { getPost, updatePost } from '../services/api';
import { useEffect, useState } from "react";
import PostForm from '../components/PostForm';
import { Button, Container, Spinner } from 'react-bootstrap';

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
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
    }, [id]);

    const handleUpdate = async (updatedData) => {
        await updatePost(id, updatedData);
        setPost({...post, ...updatedData});
        setIsEditing(false);
    };

    if (loading || !post) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="py-4">
            {isEditing ? (
                <PostForm
                    initialData={post}
                    onSubmit={handleUpdate}
                />
            ) : (
                <>
                    <h1>{post.title}</h1>
                    <p className="lead">{post.content}</p>
                </>
            )}

            <div className="d-flex gap-2 mt-4">
                <Button
                    variant="outline-secondary"
                    onClick={() => navigate('/')}
                >
                    ← Назад
                </Button>
                <Button
                    variant={isEditing ? 'secondary' : 'primary'}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Отменить' : 'Редактировать'}
                </Button>
            </div>
        </Container>
    );
}