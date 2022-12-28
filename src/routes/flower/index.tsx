import {
  $,
  component$,
  QwikChangeEvent,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { Todo } from "~/components/todo";
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
  const store = useStore<{ todos: Todo[]; input: string }>({
    todos: exampleTodos,
    input: "",
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
      label: store.input,
    };

    store.todos = [...store.todos, todo];
    store.input = "";
  });

  const handleInputChange = $((e: QwikChangeEvent<HTMLInputElement>) => {
    store.input = e.target.value;
  });

  return (
    <>
      <span>Here are todos</span>
      <hr />
      {store.todos.map((todo) => (
        <div key={todo.id}>
          <Todo {...todo} handleMarkCompleted={markCompleted} />
        </div>
      ))}
      <hr />

      <label for="add-todo-input">Add new Todo</label>
      <input
        value={store.input}
        onChange$={handleInputChange}
        placeholder="..."
        id="add-todo-input"
      />
      <button onClick$={handleAddTodo}>Add todo</button>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik How are you",
};
