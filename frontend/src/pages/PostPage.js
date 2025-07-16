import {useNavigate, useParams} from 'react-router-dom';
import {getPost, updatePost} from '../services/api';
import {useEffect, useState} from "react";
import PostForm from '../components/PostForm';

export default function PostPage() {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        getPost(id).then(data => setPost(data));
    }, [id]);

    const handleUpdate = async (updatedData) => {
        await updatePost(id, updatedData);
        setPost({...post, ...updatedData});
        setIsEditing(false);
    };

    if (!post) return <div>Загрузка...</div>;

    return (
        <article>
            {isEditing ? (
                <PostForm
                    initialData={post}
                    onSubmit={handleUpdate}
                />
            ) : (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </>
            )}
            <div>
                <button onClick={() => navigate('/')}>← Назад</button>
                <button onClick={() => navigate(`/posts/edit/${id}`)}>
                    Редактировать
                </button>
            </div>
        </article>
    );
}