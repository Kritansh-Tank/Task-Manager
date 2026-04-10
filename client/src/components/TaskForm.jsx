import { useState } from 'react';

export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = title.trim();
        if (!trimmed) {
            setValidationError('Task title cannot be empty.');
            return;
        }
        setValidationError('');
        setSubmitting(true);
        try {
            await onAdd(trimmed);
            setTitle('');
        } catch {
            // Error handled by parent hook
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="task-form__input-wrapper">
                <input
                    id="task-title-input"
                    type="text"
                    className="task-form__input"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (validationError) setValidationError('');
                    }}
                    disabled={submitting}
                    autoFocus
                />
                <button
                    id="add-task-btn"
                    type="submit"
                    className="task-form__btn"
                    disabled={submitting}
                >
                    {submitting ? 'Adding...' : 'Add Task'}
                </button>
            </div>
            {validationError && (
                <p className="task-form__error">{validationError}</p>
            )}
        </form>
    );
}
