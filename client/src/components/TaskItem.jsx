import { useState } from 'react';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        const trimmed = editValue.trim();
        if (!trimmed || trimmed === task.title) {
            setEditValue(task.title);
            setEditing(false);
            return;
        }
        setSaving(true);
        try {
            await onEdit(task.id, trimmed);
            setEditing(false);
        } catch {
            // Error handled by parent
        } finally {
            setSaving(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditValue(task.title);
            setEditing(false);
        }
    };

    return (
        <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
            <label className="task-item__checkbox-label">
                <input
                    type="checkbox"
                    className="task-item__checkbox"
                    checked={task.completed}
                    onChange={() => onToggle(task.id)}
                />
                <span className="task-item__checkmark"></span>
            </label>

            {editing ? (
                <input
                    type="text"
                    className="task-item__edit-input"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    disabled={saving}
                    autoFocus
                />
            ) : (
                <span
                    className="task-item__title"
                    onDoubleClick={() => {
                        setEditValue(task.title);
                        setEditing(true);
                    }}
                >
                    {task.title}
                </span>
            )}

            <div className="task-item__actions">
                {!editing && (
                    <button
                        className="task-item__btn task-item__btn--edit"
                        onClick={() => {
                            setEditValue(task.title);
                            setEditing(true);
                        }}
                        title="Edit"
                    >
                        ✏️
                    </button>
                )}
                <button
                    className="task-item__btn task-item__btn--delete"
                    onClick={() => onDelete(task.id)}
                    title="Delete"
                >
                    🗑️
                </button>
            </div>
        </li>
    );
}
