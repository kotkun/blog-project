import { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import { getPosts, deletePost } from '../../../frontend/src/services/api';

export default function HomePage() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const { data } = await getPosts();
            setPosts(data);
        } catch (error) {
            console.error('Ошибка загрузки постов:', error);
        }
    };

    const handleDelete = async (id) => {
        await deletePost(id);
        fetchPosts(); // Обновляем список
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return <PostList posts={posts} onDelete={handleDelete} />;
}