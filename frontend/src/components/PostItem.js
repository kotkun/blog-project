export default function PostItem({ post, onDelete }) {
    return (
        <div className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content.slice(0, 100)}...</p>
            <button onClick={() => onDelete(post.id)}>Delete</button>
        </div>
    );
}