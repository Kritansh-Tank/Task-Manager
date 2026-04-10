const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const {
    validateCreateTask,
    validateUpdateTask,
} = require('../middleware/validate');

router.get('/', getAllTasks);
router.post('/', validateCreateTask, createTask);
router.patch('/:id', validateUpdateTask, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
