const API_BASE = 'http://localhost:5000/api';

export async function fetchTasks() {
    const res = await fetch(`${API_BASE}/tasks`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch tasks.');
    return data.data;
}

export async function createTask(title) {
    const res = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create task.');
    return data.data;
}

export async function updateTask(id, fields) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update task.');
    return data.data;
}

export async function deleteTask(id) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete task.');
    return data.data;
}
