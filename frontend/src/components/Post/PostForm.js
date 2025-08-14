import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export default function PostForm({ post, onDelete }) {
    const navigate = useNavigate();

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>
                    {post.content}
                </Card.Text>
                <div className="d-flex gap-2">
                    <Button
                        variant="primary"
                        onClick={() => navigate(`/posts/${post.id}`)}
                    >
                        Читать
                    </Button>
                    <Button
                        variant="outline-danger"
                        onClick={() => onDelete(post.id)}
                    >
                        Удалить
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}