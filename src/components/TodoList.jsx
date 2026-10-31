import EmptyState from "./EmptyState";
import TodoItem from "./TodoItem";

export default function TodoList({ tasks, filter, onToggle, onDelete, onUpdate }) {
  if (tasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.id} className="animate-fade-up">
          <TodoItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </li>
      ))}
    </ul>
  );
}
