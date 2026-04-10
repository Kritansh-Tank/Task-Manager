export default function TaskFilter({ current, onChange, counts }) {
    const filters = [
        { value: 'all', label: `All (${counts.all})` },
        { value: 'active', label: `Active (${counts.active})` },
        { value: 'completed', label: `Completed (${counts.completed})` },
    ];

    return (
        <div className="task-filter">
            {filters.map((f) => (
                <button
                    key={f.value}
                    id={`filter-${f.value}-btn`}
                    className={`task-filter__btn ${current === f.value ? 'task-filter__btn--active' : ''}`}
                    onClick={() => onChange(f.value)}
                >
                    {f.label}
                </button>
            ))}
        </div>
    );
}
