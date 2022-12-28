import { describe, expect, test } from "vitest";
import { Todo } from "~/types/Todo";
import { getSummary } from "./getSummary";

describe("getSummary", () => {
  test("happy path", () => {
    const todos = [
      { completed: true },
      { completed: false },
      { completed: true },
      { completed: true },
    ] as Todo[];
    expect(getSummary(todos)).toMatchObject({
      completed: 3,
      notCompleted: 1,
      total: 4,
    });
  });

  test("no todos", () => {
    expect(getSummary([])).toMatchObject({
      completed: 0,
      notCompleted: 0,
      total: 0,
    });
  });
});
