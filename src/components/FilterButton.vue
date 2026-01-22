<script lang="ts" setup>
import type { TaskFilter } from "../types";

const props = defineProps<{
  filter: TaskFilter;
  currentFilter: TaskFilter;
}>();

const emits = defineEmits<{
  setFilter: [filter: TaskFilter];
}>();

const labels: Record<TaskFilter, string> = {
  all: "Toutes",
  todo: "À faire",
  done: "Terminées",
};
</script>

<template>
  <button
    @click="emits('setFilter', props.filter)"
    :class="{ active: props.currentFilter === props.filter }"
    class="filter-button"
  >
    {{ labels[props.filter] }}
  </button>
</template>

<style scoped>
.filter-button {
  padding: 0.625rem 1.25rem;
  background: #ffffff;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  color: #6c757d;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
}

.filter-button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #f0f7ff;
}

.filter-button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
}
</style>