import { useEffect, useState } from 'react';
import { getPosts } from '../../services/api/postApi';
import PostList from '../../components/Post/PostList';
import WelcomeBanner from '../../components/Auth/WelcomeBanner';
import { Container, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/context/AuthContext';

export default function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user, signOut } = useAuth();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (err) {
                setError('Failed to load posts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
            setError('Failed to logout');
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <WelcomeBanner />
                {user && (
                    <div>
                        <Button
                            variant="outline-danger"
                            onClick={handleLogout}
                            className="me-2"
                        >
                            Logout
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => navigate('/posts/create')}
                        >
                            Create Post
                        </Button>
                    </div>
                )}
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Latest Posts</h1>
                {!user && (
                    <Button
                        variant="primary"
                        onClick={() => navigate('/login')}
                    >
                        Login to create post
                    </Button>
                )}
            </div>

            {posts.length > 0 ? (
                <PostList posts={posts} />
            ) : (
                <Card className="text-center p-5 mb-4">
                    <Card.Body>
                        <Card.Title>No posts yet</Card.Title>
                        <Card.Text className="mb-4">
                            Be the first to share your thoughts!
                        </Card.Text>
                        {user ? (
                            <Button
                                variant="primary"
                                onClick={() => navigate('/posts/create')}
                            >
                                Create First Post
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                onClick={() => navigate('/register')}
                            >
                                Register to get started
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}