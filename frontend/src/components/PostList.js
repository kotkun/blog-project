import PostItem from './PostItem';

export default function PostList({ posts, onDelete }) {
    return (
        <div className="post-list">
            {posts.map(post => (
                <PostItem key={post.id} post={post} onDelete={onDelete} />
            ))}
        </div>
    );
}