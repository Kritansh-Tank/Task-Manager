import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';

function App() {
  const {
    tasks,
    allTasks,
    loading,
    error,
    filter,
    setFilter,
    addTask,
    toggleComplete,
    editTitle,
    removeTask,
    clearError,
  } = useTasks();

  const counts = {
    all: allTasks.length,
    active: allTasks.filter((t) => !t.completed).length,
    completed: allTasks.filter((t) => t.completed).length,
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Task Manager</h1>
        <p className="app__subtitle">Stay organised, get things done.</p>
      </header>

      <main className="app__main">
        <TaskForm onAdd={addTask} />

        <ErrorMessage message={error} onDismiss={clearError} />

        {allTasks.length > 0 && (
          <TaskFilter current={filter} onChange={setFilter} counts={counts} />
        )}

        {loading ? (
          <Loader />
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleComplete}
            onEdit={editTitle}
            onDelete={removeTask}
          />
        )}
      </main>

      <footer className="app__footer">
        <p>Double-click a task to edit its title</p>
      </footer>
    </div>
  );
}

export default App;
