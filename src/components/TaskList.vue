<script lang="ts" setup>
import type { Task } from "../types";

const props = defineProps<{
  tasks: Task[];
}>();

const emits = defineEmits<{
  toggleDone: [id: string];
  removeTask: [id: string];
}>();
</script>

<template>
  <TransitionGroup name="task" tag="div" class="task-list">
    <article v-for="task in tasks" :key="task.id" class="task-item">
      <label class="task-label">
        <input
          @change="emits('toggleDone', task.id)"
          :checked="task.done"
          type="checkbox"
          class="task-checkbox"
        />
        <span :class="{ 'task-text-done': task.done }" class="task-text">
          {{ task.title }}
        </span>
      </label>
      <button
        @click="emits('removeTask', task.id)"
        class="remove-button"
        type="button"
        aria-label="Supprimer"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </article>
  </TransitionGroup>
</template>

<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.125rem 1.25rem;
  margin-bottom: 0;
  background: #ffffff;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor:pointer
}

.task-item:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.task-label {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0;
  cursor: pointer;
  min-width: 0;
}

.task-checkbox {
  flex-shrink: 0;
  cursor: pointer;
  margin: 0;
  width: 20px;
  height: 20px;
  accent-color: #3b82f6;
  border-radius: 6px;
  border: 2px solid #dee2e6;
  background: #ffffff;
  transition: all 0.2s ease;
}

.task-checkbox:checked {
  background: #3b82f6;
  border-color: #3b82f6;
}

.task-text {
  flex: 1;
  word-break: break-word;
  transition: all 0.2s ease;
  font-size: 0.9375rem;
  color: #212529;
  line-height: 1.5;
  font-weight: 500;
}

.task-text-done {
  text-decoration: line-through;
}

.remove-button {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 6px;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;
}

.remove-button:hover {
  background: #ef4444;
  border-color: #ef4444;
  color: #ffffff;
  transform: scale(1.1);
}

.remove-button:active {
  transform: scale(0.95);
}

/* Transitions */
.task-enter-active {
  transition: all 0.3s ease;
}

.task-leave-active {
  transition: all 0.25s ease;
}

.task-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.task-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.task-move {
  transition: transform 0.3s ease;
}

@media (max-width: 576px) {
  .task-item {
    flex-direction: column;
    align-items: stretch;
  }

  .remove-button {
    width: 100%;
    height: 40px;
  }

  .remove-button:hover {
    transform: scale(1.02);
  }
}
</style>