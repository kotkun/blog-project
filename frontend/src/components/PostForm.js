import { useState } from 'react';

export default function PostForm({ initialData = {}, onSubmit }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        content: initialData.content || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Заголовок"
                required
            />
            <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Текст поста"
                required
            />
            <button type="submit">Сохранить</button>
        </form>
    );
}