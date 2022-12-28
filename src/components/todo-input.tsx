import { component$, QRL, useStore } from "@builder.io/qwik";

type Props = {
  handleAddTodo$: QRL<(label: string) => void>;
};

export const TodoInput = component$(({ handleAddTodo$ }: Props) => {
  const store = useStore({
    input: "",
  });

  return (
    <div>
      <input
        value={store.input}
        onChange$={(e) => (store.input = e.target.value)}
        placeholder="..."
        id="add-todo-input"
      />
      <button
        onClick$={() => {
          handleAddTodo$(store.input);
          store.input = "";
        }}
      >
        Add todo
      </button>
    </div>
  );
});
