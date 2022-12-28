import { $, component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { Todo } from "~/components/todo";
import { TodoInput } from "~/components/todo-input";
import styles from "./flower.css?inline";

type Todo = {
  label: string;
  id: number;
  completed: boolean;
};

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
  const store = useStore({
    todos: exampleTodos,
  });

  const markCompleted$ = $((id: number) => {
    const markCompleted = (todo: Todo) => ({
      ...todo,
      completed: !todo.completed,
    });
    store.todos = store.todos.map((todo) =>
      todo.id === id ? markCompleted(todo) : todo
    );
  });

  const handleAddTodo$ = $((label: string) => {
    const todo: Todo = {
      completed: false,
      id: Math.random(),
      label: label,
    };

    store.todos = [...store.todos, todo];
  });

  return (
    <>
      <span>Here are todos</span>
      <hr />
      {store.todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          handleMarkCompleted$={() => markCompleted$(todo.id)}
        />
      ))}
      <hr />

      <label for="add-todo-input">Add new Todo</label>
      <TodoInput handleAddTodo$={handleAddTodo$} />
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik How are you",
};
