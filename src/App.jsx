import { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import TodoFilters from "./components/TodoFilters";
import TodoFooter from "./components/TodoFooter";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";
import { useTodos } from "./hooks/useTodos.jsx";
import { FILTERS, filterTasks } from "./utils/tasks";

export default function App() {
  const {
    tasks,
    stats,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    clearCompleted,
  } = useTodos();
  const [filter, setFilter] = useState(FILTERS.ALL);

  const visibleTasks = useMemo(
    () => filterTasks(tasks, filter),
    [tasks, filter],
  );

  const filterCounts = useMemo(
    () => ({
      [FILTERS.ALL]: stats.total,
      [FILTERS.ACTIVE]: stats.remaining,
      [FILTERS.COMPLETED]: stats.completed,
    }),
    [stats],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl" />

      <div className="relative mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="space-y-8">
          <Header />

          <main className="space-y-6 rounded-3xl border border-white/60 bg-white/70 p-5 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-7">
            <TodoStats stats={stats} />

            <TodoForm onAdd={addTask} />

            <TodoFilters
              filter={filter}
              onFilterChange={setFilter}
              counts={filterCounts}
            />

            <TodoList
              tasks={visibleTasks}
              filter={filter}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />

            <TodoFooter
              remaining={stats.remaining}
              completed={stats.completed}
              onClearCompleted={clearCompleted}
            />
          </main>

          <p className="text-center text-xs text-slate-400">
            TaskFlow · your tasks are stored locally in this browser.
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="light"
        closeOnClick
        pauseOnHover
        draggable
        newestOnTop
        toastClassName="tf-toast"
      />
    </div>
  );
}
