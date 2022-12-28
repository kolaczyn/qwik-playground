import { component$ } from "@builder.io/qwik";
import { Todo } from "~/types/Todo";

type Props = {
  todos: Todo[];
};

export const TodosSummary = component$(({ todos }: Props) => {
  const completed = todos.reduce(
    (acc, todo) => (todo.completed ? acc + 1 : acc),
    0
  );
  const notCompleted = todos.reduce(
    (acc, curr) => (!curr.completed ? acc + 1 : acc),
    0
  );
  return (
    <>
      <span>Completed: </span>
      <b>{completed}</b>
      <br />
      <span>Not Completed: </span>
      <b>{notCompleted}</b>
      <br />
      <span>In Total:</span>
      <b>{todos.length}</b>
    </>
  );
});
