import { useState, useEffect } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { getPostById, deletePost } from '../../services/api/postApi';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../services/context/AuthContext';

export default function PostPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id);
                setPost(data);
            } catch (err) {
                setError('Post not found');
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deletePost(id);
            navigate('/');
        } catch (err) {
            setError('Failed to delete post');
        }
    };

    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!post) return <div>Loading...</div>;

    const isAuthor = user && user.id === post.authorId;

    return (
        <Container className="py-4">
            <article>
                <h1>{post.title}</h1>
                <p className="text-muted">
                    By {post.authorName} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <p>{post.content}</p>

                {isAuthor && (
                    <div className="mt-4">
                        <Link to={`/posts/${post.id}/edit`} className="btn btn-secondary me-2">
                            Edit
                        </Link>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                )}
            </article>
        </Container>
    );
}