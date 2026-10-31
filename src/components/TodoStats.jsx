import { LuCircleCheckBig, LuClock, LuList } from "react-icons/lu";

const statCards = [
  {
    key: "total",
    label: "Total Tasks",
    icon: LuList,
    iconClass: "bg-indigo-50 text-indigo-600",
    accentClass: "from-indigo-500/10 via-indigo-500/5 to-transparent",
    valueClass: "text-slate-900",
  },
  {
    key: "completed",
    label: "Completed Tasks",
    icon: LuCircleCheckBig,
    iconClass: "bg-emerald-50 text-emerald-600",
    accentClass: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    valueClass: "text-emerald-600",
  },
  {
    key: "remaining",
    label: "Remaining Tasks",
    icon: LuClock,
    iconClass: "bg-amber-50 text-amber-600",
    accentClass: "from-amber-500/10 via-amber-500/5 to-transparent",
    valueClass: "text-amber-600",
  },
];

export default function TodoStats({ stats }) {
  return (
    <section
      aria-label="Task statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <article
            key={card.key}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-linear-to-br ${card.accentClass} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <p className="whitespace-nowrap text-[13px] font-medium text-slate-500">
                  {card.label}
                </p>
                <p
                  className={`mt-2 font-display text-4xl font-extrabold tracking-tight ${card.valueClass}`}
                >
                  {stats[card.key]}
                </p>
              </div>
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <Icon size={20} />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
