import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/taskApi';

export function useTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

    // Fetch tasks on mount
    const loadTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.fetchTasks();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    // Add a new task
    const addTask = useCallback(async (title) => {
        setError(null);
        try {
            const task = await api.createTask(title);
            setTasks((prev) => [task, ...prev]);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, []);

    // Toggle completed status
    const toggleComplete = useCallback(async (id) => {
        setError(null);
        try {
            const task = tasks.find((t) => t.id === id);
            if (!task) return;
            const updated = await api.updateTask(id, { completed: !task.completed });
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        } catch (err) {
            setError(err.message);
        }
    }, [tasks]);

    // Edit task title
    const editTitle = useCallback(async (id, newTitle) => {
        setError(null);
        try {
            const updated = await api.updateTask(id, { title: newTitle });
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    }, []);

    // Remove task
    const removeTask = useCallback(async (id) => {
        setError(null);
        try {
            await api.deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            setError(err.message);
        }
    }, []);

    // Filtered tasks
    const filteredTasks = tasks.filter((t) => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    return {
        tasks: filteredTasks,
        allTasks: tasks,
        loading,
        error,
        filter,
        setFilter,
        addTask,
        toggleComplete,
        editTitle,
        removeTask,
        clearError: () => setError(null),
    };
}
