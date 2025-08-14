import PostCard from './PostCard';

export default function PostList({ posts, onDelete }) {
    return (
        <div>
            {posts.map(post => (
                <PostCard key={post.id} post={post} onDelete={onDelete} />
            ))}
        </div>
    );
}