import { component$, QRL } from "@builder.io/qwik";

type Props = {
  id: number;
  completed: boolean;
  label: string;
  handleMarkCompleted$: QRL<() => void>;
};

export const SingleTodo = component$(
  ({ completed, id, label, handleMarkCompleted$ }: Props) => (
    <div>
      <input
        type="checkbox"
        id={`todo-${id}`}
        checked={completed}
        onClick$={() => handleMarkCompleted$()}
      />
      <label class={completed ? "completed" : ""} for={`todo-${id}`}>
        <b>{label} </b>
        <span>is {completed ? "completed" : "not completed"}</span>
      </label>
    </div>
  )
);
