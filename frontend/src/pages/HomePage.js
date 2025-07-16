import { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import PostList from '../components/PostList';

export default function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(data => setPosts(data));
    }, []);

    return (
        <div>
            <h1>Последние посты</h1>
            <PostList posts={posts} />
        </div>
    );
}