<script setup>
import { date } from 'quasar'
import TodoForm from "src/components/TodoForm.vue";

const today = date.formatDate(Date.now(), 'DD.MM.YYYY')
</script>

<template>
  <q-page class="q-px-xl">
    <h1 class="text-h2">
      Today's tasks
      <q-chip size="xl" outline square color="secondary" text-color="white" icon="today" :label="today" />
    </h1>
    <TodoForm />
  </q-page>
</template>

