const STORAGE_KEY = "taskflow.todos";

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function isValidTask(task) {
  return (
    task !== null &&
    typeof task === "object" &&
    typeof task.title === "string" &&
    task.title.trim().length > 0
  );
}

function normalizeTask(task) {
  const createdAt = Number(task.createdAt);
  return {
    id: typeof task.id === "string" && task.id.length > 0 ? task.id : createId(),
    title: task.title.trim(),
    completed: Boolean(task.completed),
    createdAt: Number.isFinite(createdAt) && createdAt > 0 ? createdAt : Date.now(),
  };
}

export function loadTasks() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidTask).map(normalizeTask);
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
