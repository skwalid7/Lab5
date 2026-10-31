import { useEffect, useRef, useState } from "react";
import { LuCheck, LuClock, LuPencil, LuTrash2, LuX } from "react-icons/lu";
import { formatTaskDate } from "../utils/date";

export default function TodoItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const startEditing = () => {
    setDraft(task.title);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(task.title);
    setIsEditing(false);
  };

  const saveEditing = () => {
    if (onUpdate(task.id, draft)) {
      setIsEditing(false);
    }
  };

  const handleEditKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveEditing();
    }
    if (event.key === "Escape") {
      event.preventDefault();
      cancelEditing();
    }
  };

  return (
    <div
      className={`group flex items-center gap-3 rounded-2xl border p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:gap-4 ${
        task.completed
          ? "border-emerald-100 bg-emerald-50/50"
          : "border-slate-200/80 bg-white hover:border-slate-300"
      }`}
    >
      <label className="relative flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="peer sr-only"
          aria-label={`Mark "${task.title}" as ${task.completed ? "active" : "completed"}`}
        />
        <span className="absolute inset-0 rounded-lg border-2 border-slate-300 transition duration-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 peer-focus-visible:ring-4 peer-focus-visible:ring-indigo-500/20" />
        <LuCheck
          size={15}
          className="relative z-10 scale-0 text-white transition-transform duration-200 peer-checked:scale-100"
          strokeWidth={3}
        />
      </label>

      {isEditing ? (
        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <input
            ref={editInputRef}
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleEditKeyDown}
            maxLength={200}
            aria-label="Edit task description"
            className="w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 sm:text-base"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={saveEditing}
              aria-label="Save task"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/30"
            >
              <LuCheck size={15} />
              Save
            </button>
            <button
              type="button"
              onClick={cancelEditing}
              aria-label="Cancel editing"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-300/50"
            >
              <LuX size={15} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm font-semibold transition wrap-break-word sm:text-base ${
              task.completed ? "text-slate-400 line-through" : "text-slate-800"
            }`}
          >
            {task.title}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
            <LuClock size={12} />
            {formatTaskDate(task.createdAt)}
          </p>
        </div>
      )}

      {!isEditing && (
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={startEditing}
            aria-label={`Edit "${task.title}"`}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20"
          >
            <LuPencil size={17} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete "${task.title}"`}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/20"
          >
            <LuTrash2 size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
