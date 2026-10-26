import type { Task } from '@/types/task';
export function recoverTasks(raw: string, generateId: () => string): { tasks: Task[]; recovered: boolean } {
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error('Invalid saved tasks');
  const ids = new Set<string>();
  const tasks = parsed.filter((item): item is Record<string, unknown> => item !== null && typeof item === 'object' && typeof item.title === 'string').map(item => {
    const id = typeof item.id === 'string' && item.id && !ids.has(item.id) ? item.id : generateId();
    ids.add(id);
    return { id, title: item.title as string, done: item.done === true, createdAt: typeof item.createdAt === 'number' && Number.isFinite(item.createdAt) ? item.createdAt : Date.now() };
  });
  return { tasks, recovered: tasks.length !== parsed.length };
}
