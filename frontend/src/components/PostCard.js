import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function PostForm({ post, onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                content: post.content
            });
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.content) {
            setError('Please fill all fields');
            return;
        }
        try {
            await onSubmit(formData);
        } catch (err) {
            setError('Failed to save post');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {post ? 'Update Post' : 'Create Post'}
            </Button>
        </Form>
    );
}