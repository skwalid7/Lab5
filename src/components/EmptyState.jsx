import { LuInbox, LuPartyPopper, LuSparkles } from "react-icons/lu";
import { FILTERS } from "../utils/tasks";

const emptyStates = {
  [FILTERS.ALL]: {
    icon: LuInbox,
    title: "No tasks yet",
    description: "Add your first task above and start building momentum today.",
  },
  [FILTERS.ACTIVE]: {
    icon: LuPartyPopper,
    title: "All caught up!",
    description: "Every task is completed. Enjoy the well-earned break.",
  },
  [FILTERS.COMPLETED]: {
    icon: LuSparkles,
    title: "Nothing completed yet",
    description: "Finished tasks will show up here once you tick them off.",
  },
};

export default function EmptyState({ filter }) {
  const state = emptyStates[filter] ?? emptyStates[FILTERS.ALL];
  const Icon = state.icon;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500/10 via-violet-500/10 to-fuchsia-500/10 text-indigo-500">
        <Icon size={30} />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-slate-800">
        {state.title}
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        {state.description}
      </p>
    </div>
  );
}
