'use server';

import { db as prisma } from "../../lib/prisma";
import { TodoType } from "./page";

export const fetchTodoLists = async (): Promise<TodoType[]> => {
  const todoLists: TodoType[] = await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      completionDate: true,
      status: true,
      updatedAt: true,
    },
  });
  console.log(todoLists);
  return todoLists;
};
