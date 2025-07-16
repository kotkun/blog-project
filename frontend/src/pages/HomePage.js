import {useEffect, useState} from 'react';
import {getPosts} from '../services/api';
import {useNavigate} from 'react-router-dom';
import PostList from '../components/PostList';

export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPosts().then(data => setPosts(data));
    }, []);
    return (
        <div>
            <button onClick={() => navigate('/posts/new')}>
                Создать пост
            </button>
            <h1>Последние посты</h1>
            <PostList posts={posts}/>
        </div>
    );
}