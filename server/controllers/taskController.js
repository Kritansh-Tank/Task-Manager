const TaskModel = require('../models/taskModel');

/**
 * GET /api/tasks
 * Return all tasks.
 */
function getAllTasks(req, res) {
    const tasks = TaskModel.getAll();
    res.json({ success: true, data: tasks });
}

/**
 * POST /api/tasks
 * Create a new task.
 */
function createTask(req, res) {
    const { title } = req.body;
    const task = TaskModel.create(title);
    res.status(201).json({ success: true, data: task });
}

/**
 * PATCH /api/tasks/:id
 * Update a task's status or title.
 */
function updateTask(req, res) {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = TaskModel.update(id, { title, completed });

    if (!task) {
        return res.status(404).json({
            success: false,
            error: `Task with id "${id}" not found.`,
        });
    }

    res.json({ success: true, data: task });
}

/**
 * DELETE /api/tasks/:id
 * Delete a task.
 */
function deleteTask(req, res) {
    const { id } = req.params;
    const removed = TaskModel.remove(id);

    if (!removed) {
        return res.status(404).json({
            success: false,
            error: `Task with id "${id}" not found.`,
        });
    }

    res.json({ success: true, data: { id } });
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
