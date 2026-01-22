<script lang="ts" setup>
import { computed, ref, watch, onMounted } from "vue";
import TaskForm from "./components/TaskForm.vue";
import type { Task, TaskFilter } from "./types";
import TaskList from "./components/TaskList.vue";
import FilterButton from "./components/FilterButton.vue";

const message = ref("- My Tasky -");
const tasks = ref<Task[]>([]);
const filter = ref<TaskFilter>("all");

onMounted(() => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
});

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  },
  { deep: true },
);

const totalDone = computed(() =>
  tasks.value.reduce((total, task) => (task.done ? total + 1 : total), 0),
);

const progressPercentage = computed(() =>
  tasks.value.length > 0 ? (totalDone.value / tasks.value.length) * 100 : 0,
);

function addTask(newTask: string) {
  tasks.value.push({
    id: crypto.randomUUID(),
    title: newTask,
    done: false,
  });
}

function removeTask(id: string) {
  const index = tasks.value.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.value.splice(index, 1);
  }
}

function toggleDone(id: string) {
  const task = tasks.value.find((task) => task.id === id);
  if (task) {
    task.done = !task.done;
  }
}

const filteredTasks = computed(() => {
  switch (filter.value) {
    case "todo":
      return tasks.value.filter((task) => !task.done);
    case "done":
      return tasks.value.filter((task) => task.done);
    default:
      return tasks.value;
  }
});

function setFilter(value: TaskFilter) {
  filter.value = value;
}
</script>

<template>
  <main class="page">
    <div class="container">
      <header class="app-header">
        <h1>{{ message }}</h1>
        <p v-if="tasks.length" class="task-summary">
          {{ totalDone }} sur {{ tasks.length }} tâches terminées
        </p>
        <div v-if="tasks.length" class="progress-wrapper">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
        </div>
      </header>

      <TaskForm @add-task="addTask" />

      <div v-if="tasks.length" class="controls">
        <FilterButton
          :currentFilter="filter"
          filter="all"
          @set-filter="setFilter"
        />
        <FilterButton
          :currentFilter="filter"
          filter="todo"
          @set-filter="setFilter"
        />
        <FilterButton
          :currentFilter="filter"
          filter="done"
          @set-filter="setFilter"
        />
      </div>

      <div v-if="!tasks.length" class="empty-state">
        <p class="empty-title">Aucune tâche</p>
        <p class="empty-hint">
          Ajoutez votre première tâche ci-dessus pour commencer
        </p>
      </div>

      <TaskList
        :tasks="filteredTasks"
        @toggle-done="toggleDone"
        @remove-task="removeTask"
      />
    </div>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f7fa 0%, #e8edf2 100%);
  padding: 2.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  padding: 2.5rem;
}

.app-header {
  text-align: center;
  margin-bottom: 2.25rem;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid #e9ecef;
  position: relative;
}

.app-header::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #3b82f6;
  border-radius: 2px;
}

.app-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.875rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.02em;
}

.task-summary {
  margin: 0;
  color: #6c757d;
  font-size: 0.9375rem;
  font-weight: 500;
}

.progress-wrapper {
  margin-top: 1.25rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 999px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.controls {
  display: flex;
  gap: 0.625rem;
  justify-content: center;
  margin-bottom: 1.75rem;
}

.empty-state {
  text-align: center;
  padding: 3.5rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px dashed #dee2e6;
  margin-bottom: 1.5rem;
}

.empty-title {
  margin: 0 0 0.5rem 0;
  color: #495057;
  font-size: 1.125rem;
  font-weight: 600;
}

.empty-hint {
  margin: 0;
  font-size: 0.9375rem;
  color: #adb5bd;
}

@media (max-width: 576px) {
  .page {
    padding: 1.5rem 0.75rem;
  }

  .container {
    padding: 2rem 1.5rem;
  }

  .app-header h1 {
    font-size: 1.625rem;
  }

  .controls {
    flex-wrap: wrap;
  }
}
</style>
