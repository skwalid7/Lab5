import { useState } from "react";
import { LuArrowRight, LuPencil, LuPlus } from "react-icons/lu";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onAdd(title)) {
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <LuPencil
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="What needs to be done?"
            aria-label="New task description"
            maxLength={200}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 sm:text-base"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-xl hover:shadow-indigo-500/35 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/30 active:translate-y-0 sm:text-base"
        >
          <LuPlus size={20} />
          Add Task
        </button>
      </div>

      <p className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
        <LuArrowRight size={13} className="text-indigo-400" />
        Press Enter to add a task. Everything is saved automatically in your
        browser.
      </p>
    </form>
  );
}
