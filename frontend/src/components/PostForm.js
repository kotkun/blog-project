import { useState } from "react";
import { Form, Button } from 'react-bootstrap';

export default function PostForm({ initialData = { title: '', content: '' }, onSubmit }) {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            try {
                await onSubmit(formData);
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.content.trim()) newErrors.content = 'Текст обязателен';
        return newErrors;
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Заголовок</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Введите заголовок"
                    isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.title}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Содержание</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Введите текст поста"
                    isInvalid={!!errors.content}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.content}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </Button>
        </Form>
    );
}