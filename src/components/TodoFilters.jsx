import { LuCheckCheck, LuClock, LuList } from "react-icons/lu";
import { FILTERS, FILTER_OPTIONS } from "../utils/tasks";

const filterIcons = {
  [FILTERS.ALL]: LuList,
  [FILTERS.ACTIVE]: LuClock,
  [FILTERS.COMPLETED]: LuCheckCheck,
};

export default function TodoFilters({ filter, onFilterChange, counts }) {
  return (
    <nav aria-label="Task filters" className="flex flex-wrap items-center gap-2">
      {FILTER_OPTIONS.map((option) => {
        const isActive = filter === option.id;
        const Icon = filterIcons[option.id];

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onFilterChange(option.id)}
            aria-pressed={isActive}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20 ${
              isActive
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                : "bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <Icon size={16} />
            {option.label}
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold tabular-nums ${
                isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {counts[option.id]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
