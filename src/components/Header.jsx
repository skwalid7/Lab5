import { LuCalendar, LuListTodo } from "react-icons/lu";
import { formatToday } from "../utils/date";

export default function Header() {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30">
          <LuListTodo size={26} />
        </div>
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            TaskFlow
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Organize your day, one task at a time.
          </p>
        </div>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur sm:text-sm">
        <LuCalendar size={16} className="text-indigo-500" />
        <span>{formatToday()}</span>
      </div>
    </header>
  );
}
