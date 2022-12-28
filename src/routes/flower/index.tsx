import { $, component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
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
  const store = useStore<{ todos: Todo[] }>({
    todos: exampleTodos,
  });

  const markCompleted = $((id: number) => {
    const markCompleted = (todo: Todo) => ({
      ...todo,
      completed: !todo.completed,
    });
    store.todos = store.todos.map((todo) =>
      todo.id === id ? markCompleted(todo) : todo
    );
  });

  return (
    <>
      <span>Here are todos</span>
      <hr />
      {store.todos.map((todo) => (
        <div key={todo.id}>
          {/* TODO add styles */}
          <input
            type="checkbox"
            id={`todo-${todo.id}`}
            checked={todo.completed}
            onClick$={() => markCompleted(todo.id)}
          />
          <label
            class={todo.completed ? "completed" : ""}
            for={`todo-${todo.id}`}
          >
            {todo.label} is {todo.completed ? "completed" : "not completed"}
          </label>
        </div>
      ))}
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik How are you",
};
