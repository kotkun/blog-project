import { Container } from 'react-bootstrap';
import PostForm from '../../components/Post/PostForm';
import { createPost } from '../../services/api/postApi';
import { useNavigate } from 'react-router-dom';

export default function PostCreatePage() {
    const navigate = useNavigate();

    const handleSubmit = async (postData) => {
        await createPost(postData);
        navigate('/');
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4">Create New Post</h1>
            <PostForm onSubmit={handleSubmit} />
        </Container>
    );
}