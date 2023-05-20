<script setup>
import TodoItem from "src/components/TodoItem.vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },

  emptyText: {
    type: String,
    default: "No tasks yet",
  },
});
</script>

<template>
  <q-list bordered separator>
    <q-item v-if="!props.list?.length">
      <q-item-section>
        <q-item-label header class="text-center text-gray-10 text-h4">
          <!-- <q-icon class="vertical-bottom" size="xl" name="edit"/> -->
          {{ props.emptyText }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <TodoItem v-for="todo in props.list" :key="todo.id" :todo="todo" />
  </q-list>
</template>