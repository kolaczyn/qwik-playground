import {
  $,
  component$,
  useClientEffect$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { Todo } from "~/components/todo";
import { TodoInput } from "~/components/todo-input";
import styles from "./flower.css?inline";

export const LOCAL_STORAGE_KEY = "todos";

type Todo = {
  label: string;
  id: number;
  completed: boolean;
};

type LoadableTodos =
  | {
      isLoading: true;
      todos: [];
    }
  | { isLoading: false; todos: Todo[] };

export const exampleTodos: Todo[] = [
  {
    label: "Learn React",
    id: 0,
    completed: true,
  },
  {
    label: "Learn Qwik",
    id: 1,
    completed: false,
  },
];

export default component$(() => {
  useStylesScoped$(styles);
  const store = useStore<LoadableTodos>({ isLoading: true, todos: [] });

  const readFromLocalStorage = $(() => {
    const fromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
    const todos = JSON.parse(fromLocalStorage ?? "[]") as Todo[];
    return todos;
  });

  const saveToLocalStorage = $(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.todos));
  });

  useClientEffect$(async () => {
    store.todos = await readFromLocalStorage();
    store.isLoading = false;
  });

  const markCompleted$ = $((id: number) => {
    const markCompleted = (todo: Todo) => ({
      ...todo,
      completed: !todo.completed,
    });
    store.todos = store.todos.map((todo) =>
      todo.id === id ? markCompleted(todo) : todo
    );
    saveToLocalStorage();
  });

  const handleAddTodo$ = $((label: string) => {
    const todo: Todo = {
      completed: false,
      id: Math.random(),
      label: label,
    };

    store.todos = [...store.todos, todo];
    saveToLocalStorage();
  });

  return (
    <>
      <b>TODOS</b>
      <hr />
      {store.isLoading ? (
        "Loading..."
      ) : store.todos.length === 0 ? (
        <span>There are not Todos</span>
      ) : (
        store.todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            handleMarkCompleted$={() => markCompleted$(todo.id)}
          />
        ))
      )}
      <hr />

      <label for="add-todo-input">Add new Todo</label>
      <TodoInput handleAddTodo$={handleAddTodo$} />
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik How are you",
};
