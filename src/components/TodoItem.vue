<script setup>
import { computed } from 'vue';
import { useTodosStore } from "src/stores/todos-store";
import { date } from "quasar";

const todosStore = useTodosStore();

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
})

const checkIcon = computed(() => {
  return props.todo.done ? 'check_box' : 'check_box_outline_blank';
});


const formattedEndDate = computed(() => {
  return date.formatDate(props.todo.endDate, 'DD.MM.YYYY');
});

const isToday = computed(() => {
  return props.todo.endDate <= new Date();
});
</script>

<template>
  <q-item @click="todosStore.toggleTodoDoneById(todo.id)" clickable v-ripple.stop>
    <q-item-section avatar>
      <q-btn flat round :icon="checkIcon" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        {{todo.title}}

        <q-badge
          v-if="todo.endDate"
          :color="isToday ? 'negative' : 'primary'"
        >
        <q-icon class="q-mr-xs" name="today" />
        {{formattedEndDate}}
        </q-badge>
      </q-item-label>
      <q-item-label caption>{{ todo.description }}</q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-btn @click="todosStore.toggleTodoRemovedById(todo.id)" v-ripple.stop flat round color="negative" icon="delete_outline" />
    </q-item-section>
  </q-item>
</template>