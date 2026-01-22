<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits<{
  addTask: [newTask: string];
}>();

const newTask = ref("");
const error = ref("");

function formSubmitted() {
  if (newTask.value.trim()) {
    emit("addTask", newTask.value.trim());
    newTask.value = "";
    error.value = "";
  } else {
    error.value = "Veuiller écrire votre tâche.";
  }
}
</script>

<template>
  <form @submit.prevent="formSubmitted" class="task-form">
    <div class="input-row">
      <input
        v-model="newTask"
        placeholder="Quelle tâche voulez-vous ajouter?"
        :aria-invalid="!!error || undefined"
        @input="error = ''"
        class="task-input"
        type="text"
      />
      <button type="submit" class="add-button">Ajouter</button>
    </div>
    <small v-if="error" class="error-text">{{ error }}</small>
  </form>
</template>

<style scoped>
.task-form {
  margin-bottom: 2rem;
}

.input-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 0;
}

.task-input {
  flex: 1;
  margin-bottom: 0;
  min-width: 0;
  padding: 0.875rem 1rem;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  outline: none;
  background-image: none !important;
  color: #212529;
}

.task-input::placeholder {
  color: #adb5bd;
}

.task-input:focus {
  border-color: #3b82f6;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-image: none !important;
}

.task-input[aria-invalid="true"] {
  border-color: #ef4444;
  background-image: none !important;
  background-color: #fef2f2 !important;
}

.add-button {
  flex-shrink: 0;
  width: auto;
  min-width: 110px;
  margin-bottom: 0;
  padding: 0.875rem 1.5rem;
  background: #3b82f6;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 0.9375rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-button:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.add-button:active {
  transform: scale(0.98);
}

.error-text {
  display: block;
  color: #ef4444;
  margin-top: 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
}

@media (max-width: 576px) {
  .input-row {
    flex-direction: column;
    gap: 0.625rem;
  }

  .add-button {
    width: 100%;
  }
}
</style>