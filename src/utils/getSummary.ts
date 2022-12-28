import { Todo } from "~/types/Todo";

export const getSummary = (todos: Todo[]) => {
  const completed = todos.reduce(
    (acc, todo) => (todo.completed ? acc + 1 : acc),
    0
  );
  const notCompleted = todos.reduce(
    (acc, curr) => (!curr.completed ? acc + 1 : acc),
    0
  );

  const total = todos.length;

  return { completed, notCompleted, total };
};
