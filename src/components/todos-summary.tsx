import { component$ } from "@builder.io/qwik";
import { Todo } from "~/types/Todo";
import { getSummary } from "~/utils/getSummary";

type Props = {
  todos: Todo[];
};

export const TodosSummary = component$(({ todos }: Props) => {
  const { completed, notCompleted, total } = getSummary(todos);
  return (
    <>
      <span>Completed: </span>
      <b>{completed}</b>
      <br />
      <span>Not Completed: </span>
      <b>{notCompleted}</b>
      <br />
      <span>In Total:</span>
      <b>{total}</b>
    </>
  );
});
