import { defineStore  } from "pinia";
import { ref, computed } from "vue";

const initialTodos = [
  {
    id: 1,
    title: 'New Todo',
    description: 'New Todo Description',
    createdAt: new Date(),
    endDate: new Date(),
    done: false,
    removed: false,
  }
];

export const useTodosStore = defineStore('todos', () => {

  /** 
   * Array of todos
   * 
   * @example
   * [
   *  {
   *    id: 1,
   *    title: 'New Todo',
   *    description: 'New Todo Description',
   *    createdAt: new Date(),
   *    endDate: new Date(),
   *    done: false,
   *    removed: false,
   *  }
   * ]
   */
  const todos = ref([...initialTodos]);
  const undoneTodos = computed(() => todos.value.filter(todo => !todo.done && !todo.removed));
  const doneTodos = computed(() => todos.value.filter(todo => todo.done && !todo.removed));
  const removedTodos = computed(() => todos.value.filter(todo => todo.removed));
  const todayTodos = computed(
    () => todos.value.filter(todo => !todo.done && !todo.removed && todo.endDate <= new Date())
  );

  function addTodo(newTodo) {
    todos.value.push(newTodo);
  }

  function toggleTodoDoneById(id) {
    todos.value = todos.value.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
  }

  function toggleTodoRemovedById(id) {
    todos.value = todos.value.map(todo => {
      if (todo.id === id) {
        todo.removed = !todo.removed;
      }
      return todo;
    });
  }

  function removeTodoById(id) {
    todos.value = todos.value.filter(todo => todo.id !== id);
  }

  return {
    todos,
    undoneTodos,
    doneTodos,
    removedTodos,
    todayTodos,
    addTodo,
    toggleTodoDoneById,
    toggleTodoRemovedById,
    removeTodoById,
  };
});