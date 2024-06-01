'use server';

import { db as prisma } from "../lib/prisma";
import { TodoType } from "./todo-list/page";

export default function SampleComponent(): JSX.Element {
	const todoLists: TodoType[] = prisma.todo.findMany({
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
  return <></>;
}
