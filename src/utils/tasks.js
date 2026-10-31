export const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export const FILTER_OPTIONS = [
  { id: FILTERS.ALL, label: "All" },
  { id: FILTERS.ACTIVE, label: "Active" },
  { id: FILTERS.COMPLETED, label: "Completed" },
];

export function filterTasks(tasks, filter) {
  if (filter === FILTERS.ACTIVE) {
    return tasks.filter((task) => !task.completed);
  }
  if (filter === FILTERS.COMPLETED) {
    return tasks.filter((task) => task.completed);
  }
  return tasks;
}
