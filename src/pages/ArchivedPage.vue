<script setup>
import TodoForm from "src/components/TodoForm.vue";
import TodoList from "src/components/TodoList.vue";
import { useTodosStore } from "src/stores/todos-store";

const todosStore = useTodosStore();
</script>

<template>
  <q-page class="q-px-md q-px-sm-xl">
    <h1 class="text-h2">Archived To-Dos</h1>

    <!-- <TodoForm /> -->

    <TodoList :list="todosStore.archivedTodos" empty-text="No archived tasks yet" class="q-mt-md" />
  </q-page>
</template>