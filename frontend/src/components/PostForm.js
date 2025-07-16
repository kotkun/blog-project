import {useState} from "react";

export default function PostForm(
    {initialData = {title: '', content: ''}, onSubmit}) {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            onSubmit(formData);
        } else {
            setErrors(errors);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Заголовок обязателен';
        if (!formData.content.trim()) newErrors.content = 'Текст обязателен';
        return newErrors;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Заголовок"/>
                {errors.title && <span className="error">{errors.title}</span>}
            </div>
            <div>
        <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Текст поста"/>
                {errors.content && <span className="error">{errors.content}</span>}
            </div>
            <button type="submit">Сохранить</button>
        </form>

    );
}