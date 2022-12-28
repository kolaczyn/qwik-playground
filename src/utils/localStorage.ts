import { Todo } from "~/types/Todo";

export const LOCAL_STORAGE_KEY = "todos";

export const readFromLocalStorage = () => {
  const fromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
  const todos = JSON.parse(fromLocalStorage ?? "[]") as Todo[];
  return todos;
};

export const saveToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};
