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

  const handleAddTodo = $(() => {
    const todo: Todo = {
      completed: false,
      id: Math.random(),
      label: "Newest todo",
    };
    store.todos = [...store.todos, todo];
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
            <b>{todo.label} </b>
            <span>is {todo.completed ? "completed" : "not completed"}</span>
          </label>
        </div>
      ))}
      <hr />

      <label for="add-todo-input">Add new Todo</label>
      <input placeholder="..." id="add-todo-input" />
      <button onClick$={handleAddTodo}>Add todo</button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik How are you",
};
