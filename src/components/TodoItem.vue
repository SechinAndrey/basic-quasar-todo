<script setup>
import { computed } from 'vue';
import { useTodosStore } from "src/stores/todos-store";
import { Loading, date } from "quasar";
import { useRoute } from 'vue-router';

const route = useRoute();

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

const archivedIcon = computed(() => {
  if(props.todo.archived) {
    return 'unarchive';
  } else {
    return 'o_archive';
  }
});

const formattedEndDate = computed(() => {
  return date.formatDate(props.todo.endDate, 'DD.MM.YYYY');
});

const isToday = computed(() => {
  return props.todo.endDate <= new Date();
});

function processArchiving() {
  if (props.todo.archived) {
    todosStore.unarchiveTodoById(props.todo.id);
  } else {
    todosStore.archiveTodoById(props.todo.id);
  }
}

function processRemoving() {
  todosStore.removeTodoById(props.todo.id);
}
</script>

<template>
  <q-item 
    :class="['todo-item', {
      'todo-item--done': todo.done,
      'todo-item--archived': todo.archived,
    }]" 
    @click="todosStore.toggleTodoDoneById(todo.id)" clickable v-ripple.stop
  >
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
    <q-item-section v-show="todo.archived" avatar>
      <q-btn 
        @click="processRemoving" 
        v-ripple.stop 
        flat 
        round 
        color="negative"
        icon="delete_forever" />
    </q-item-section>
    <q-item-section avatar>
        <q-btn 
          @click="processArchiving" 
          v-ripple.stop 
          flat 
          round 
          :color="todo.archived ? 'secondary' : 'primary'"
          :icon="archivedIcon" />
    </q-item-section>
  </q-item>
</template>

<style lang="scss">
.todo-item {
  &--done {
    .q-item__section--main{
      text-decoration: line-through;
    }
  }

  &--archived {
    .q-item__section--main{
      opacity: 0.5;
    }
  }
}
</style>