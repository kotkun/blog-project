import PostItem from './PostItem';
import { Row, Col } from 'react-bootstrap';

export default function PostList({ posts, onDelete }) {
    return (
        <Row>
            {posts.map(post => (
                <Col key={post.id} md={6} lg={4} className="mb-4">
                    <PostItem post={post} onDelete={onDelete} />
                </Col>
            ))}
        </Row>
    );
}