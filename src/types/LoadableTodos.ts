import { Todo } from "./Todo";

export type LoadableTodos =
  | {
      isLoading: true;
      todos: [];
    }
  | { isLoading: false; todos: Todo[] };
