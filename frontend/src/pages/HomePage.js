import {useEffect, useState} from 'react';
import {deletePost, getPosts} from '../services/api';
import {useNavigate} from 'react-router-dom';
import PostList from '../components/PostList';
import {Alert, Button, Container, Spinner} from 'react-bootstrap';

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (err) {
                setError('Не удалось загрузить посты');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deletePost(id);
            setPosts(posts.filter(post => post.id !== id));
        } catch (err) {
            console.error('Ошибка при удалении:', err);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border"/>
            </div>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Последние посты</h1>
                <Button
                    variant="success"
                    onClick={() => navigate('/posts/new')}>
                    Создать пост
                </Button>
            </div>

            <PostList posts={posts} onDelete={handleDelete}/>
        </Container>
    );
}