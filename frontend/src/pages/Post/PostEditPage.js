import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import PostForm from '../../components/Post/PostForm';
import { getPostById, updatePost } from '../../services/api/postApi';
import { useParams, useNavigate } from 'react-router-dom';

export default function PostEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const data = await getPostById(id);
            setPost(data);
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (postData) => {
        await updatePost(id, postData);
        navigate(`/posts/${id}`);
    };

    if (!post) return <div>Loading...</div>;

    return (
        <Container className="py-4">
            <h1 className="mb-4">Edit Post</h1>
            <PostForm post={post} onSubmit={handleSubmit} />
        </Container>
    );
}