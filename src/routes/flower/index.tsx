import { $, component$, useStore } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

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
  const store = useStore<{ todos: Todo[] }>({
    todos: exampleTodos,
  });

  const markCompleted = $((id: number) => {
    store.todos = store.todos.map((x) =>
      x.id !== id
        ? x
        : {
            ...x,
            completed: !x.completed,
          }
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
          <label for={`todo-${todo.id}`}>
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
