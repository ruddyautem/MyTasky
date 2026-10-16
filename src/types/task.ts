export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
}

export type TaskFilter = "all" | "todo" | "done";

export interface TaskCounts {
  all: number;
  todo: number;
  done: number;
}
