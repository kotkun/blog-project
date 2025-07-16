import { useParams } from 'react-router-dom';
import { getPost } from '../services/api';
import {useEffect, useState} from "react";

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getPost(id).then(data => setPost(data));
    }, [id]);

    if (!post) return <div>Загрузка...</div>;

    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </article>
    );
}