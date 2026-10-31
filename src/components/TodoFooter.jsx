import { LuArchive, LuFlame } from "react-icons/lu";

export default function TodoFooter({ remaining, completed, onClearCompleted }) {
  return (
    <footer className="flex flex-col gap-4 border-t border-slate-200/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-700">
          {remaining === 0
            ? "All tasks completed — nice work!"
            : `${remaining} ${remaining === 1 ? "task" : "tasks"} left to do.`}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
          <LuFlame size={13} className="text-amber-500" />
          Small steps every day turn into big results.
        </p>
      </div>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completed === 0}
        className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/20 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-600 sm:self-auto"
      >
        <LuArchive size={17} />
        Clear Completed
      </button>
    </footer>
  );
}
