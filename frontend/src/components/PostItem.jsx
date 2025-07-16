export default function PostItem({ post, onDelete }) {
    return (
        <div className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content.slice(0, 100)}...</p>
            <button onClick={() => onDelete(post.id)}>Удалить</button>
        </div>
    );
}