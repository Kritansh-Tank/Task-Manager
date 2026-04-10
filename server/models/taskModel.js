const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

// Ensure data directory exists
function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Load tasks from file
function loadTasks() {
  ensureDataDir();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading tasks:', err.message);
  }
  return [];
}

// Save tasks to file
function saveTasks(tasks) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

// In-memory store, initialised from file
let tasks = loadTasks();

const TaskModel = {
  getAll() {
    return tasks;
  },

  getById(id) {
    return tasks.find((t) => t.id === id) || null;
  },

  create(title) {
    const task = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    saveTasks(tasks);
    return task;
  },

  update(id, fields) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;

    if (fields.title !== undefined) {
      task.title = fields.title.trim();
    }
    if (fields.completed !== undefined) {
      task.completed = fields.completed;
    }

    saveTasks(tasks);
    return task;
  },

  remove(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;

    tasks.splice(index, 1);
    saveTasks(tasks);
    return true;
  },
};

module.exports = TaskModel;
