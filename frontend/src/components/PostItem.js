import {useNavigate} from 'react-router-dom';

export default function PostItem({post, onDelete}) {
    const navigate = useNavigate();

    return (
        <div className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content.slice(0, 100)}...</p>
            <div className="post-actions">
                <button
                    onClick={() => navigate(`/posts/${post.id}`)}
                    className="view-button">
                    View Post
                </button>
                <button
                    onClick={() => onDelete(post.id)}
                    className="delete-button">
                    Delete
                </button>
            </div>
        </div>
    );
}