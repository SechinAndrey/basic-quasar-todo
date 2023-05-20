<script setup>
import { ref, reactive } from "vue";
import {useTodosStore} from "src/stores/todos-store.js";
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  endDate: {
    type: Date,
  },
});

const form = ref(null);
const todosStore = useTodosStore();

const newTodo = reactive({
  id: null,
  title: '',
  description: '',
  createdAt: null,
  endDate: null,
  done: false,
  removed: false,
});

function addTodo() {
  todosStore.addTodo({
    ...newTodo,
    id: Math.random().toString(36).slice(2),
    createdAt: Date.now(),
  });
  resetForm();
}

function resetForm() {
  newTodo.title = '';
  newTodo.description = '';
  newTodo.endDate = null;
  isShowFullForm.value = false;
  form.value.reset();
}

const isShowFullForm = ref(false);
onClickOutside(form, () => isShowFullForm.value = false);
</script>

<template>
  <q-form class="todo-form" ref="form" @submit="addTodo">
    <q-input
      v-model="newTodo.title"
      label="What you need to do?"
      lazy-rules
      @focus="isShowFullForm = true"
      />

    <q-expansion-item v-model="isShowFullForm">

      <q-input
        v-model="newTodo.description"
        type="textarea"
        label="Description"
      />

      <q-input
      class="q-mt-md"
        v-model="newTodo.endDate"
        type="date"
        label="Due date"
      />

      <q-btn
        class="q-mt-md"
        type="submit"
        color="primary"
        label="Add"
        icon="add"
      />
    </q-expansion-item>
  </q-form>
</template>

<style lang="scss">
.todo-form{
  .q-expansion-item__container{
    > .q-item{
      display: none;
    }
  }
}
</style>