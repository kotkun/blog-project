import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {createPost, getPost, updatePost} from '../services/api';
import PostForm from '../components/PostForm';

export default function PostFormPage() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            getPost(id).then(data => setPost(data));
        }
    }, [id, isEditMode]);

    const handleSubmit = async (formData) => {
        try {
            if (isEditMode) {
                await updatePost(id, formData);
            } else {
                await createPost(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    if (isEditMode && !post) return <div>Загрузка...</div>;

    return (
        <div className="form-page">
            <h2>{isEditMode ? 'Редактировать пост' : 'Создать пост'}</h2>
            <button onClick={() => navigate(-1)} className="back-button">
                Назад
            </button>
            <PostForm
                initialData={post || {title: '', content: ''}}
                onSubmit={handleSubmit}
            />
        </div>
    );
}