"use client"

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  IconButton,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Textarea,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTodoLists } from "./todo-list-fooks";

type TodoStatusType = "todo" | "inProgress" | "done";

type TodoFormType = {
  id?: number;
  title: string;
  description?: string;
  completionDate: string;
  status: TodoStatusType;
};

export type TodoType = TodoFormType & {
  id: number;
  createdAt?: string;
  updatedAt: string;
};

const formattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const defaultFormValue: TodoFormType = {
  title: "",
  description: "",
  completionDate: formattedDate(new Date()),
  status: "todo",
};

const convertedStatusBadge = (status: string): JSX.Element => {
  switch (status) {
    case "todo":
      return <Text className="uppercase">{status}</Text>;
    case "inProgress":
      return (
        <Text colorScheme="purple" className="uppercase">
          {status}
        </Text>
      );
    case "done":
      return (
        <Text colorScheme="green" className="uppercase">
          {status}
        </Text>
      );
    default:
      return <></>;
  }
};

export default function TodoListPage(): JSX.Element {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [todoForm, setTodoForm] = useState<TodoFormType>(defaultFormValue);

  useEffect(() => {
    // 暫定対応
    const init = async (): Promise<void> => {
      const lists = await fetchTodoLists();
      console.log(lists)
      setTodoList([]);
    };
    init();
  }, []);

  const registerTodo = (): void => {};

  return (
    <>
      <div>
        <div className="px-8 bg-main-bg-color">
          <div className="flex">
            <div className="w-96 pt-8 pr-20 border-r border-solid border-r-border-gray">
              <FormControl className="mb-4">
                <label className="font-bold">タスク名</label>
                <Input
                  className="mt-2 !bg-white"
                  type="text"
                  isRequired
                  value={todoForm.title}
                  onChange={(e) =>
                    setTodoForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
                <FormErrorMessage>
                  タスク名が入力されていません。
                </FormErrorMessage>
              </FormControl>
              <FormControl className="mb-4">
                <label className="font-bold">説明</label>
                <Textarea
                  className="mt-2 !bg-white"
                  value={todoForm.description}
                  onChange={(e) =>
                    setTodoForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl className="mb-4">
                <label className="font-bold">期日</label>
                <Input
                  className="mt-2 !bg-white"
                  type="date"
                  isRequired
                  value={todoForm.completionDate}
                  onChange={(e) =>
                    setTodoForm((prev) => ({
                      ...prev,
                      completionDate: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <FormControl className="mb-4">
                <label className="font-bold">ステータス</label>
                <Select
                  className="mt-2 !bg-white"
                  value={todoForm.status}
                  isRequired
                  onChange={(e) =>
                    setTodoForm(
                      (prev): TodoFormType => ({
                        ...prev,
                        status: e.target.value as TodoStatusType,
                      }),
                    )
                  }
                >
                  <option value="todo">todo</option>
                  <option value="inProgress">inProgress</option>
                  <option value="done">done</option>
                </Select>
              </FormControl>
              <Button
                className="mb-4 mt-8 w-80"
                bg="mainColor"
                color="blue"
                _hover={{ color: "", borderColor: "" }}
                onClick={fetchTodoLists}
              >
                登録
              </Button>
            </div>
            <div className="w-full pt-8 flex justify-center">
              <TableContainer>
                <Table
                  variant="striped"
                  className="!border-separate	border-spacing-x-0 border-spacing-y-2"
                >
                  <Thead>
                    <Tr>
                      <Th className="!normal-case">タスク名</Th>
                      <Th className="!normal-case">ステータス</Th>
                      <Th className="!normal-case">期日</Th>
                      <Th className="!normal-case">更新日</Th>
                      <Th></Th>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {todoList.map((todo) => (
                      <Tr key={"todo-item-" + todo.id} className="bg-white">
                        <Th className="!py-2">
                          <span className="hover:cursor-pointer !normal-case">
                            {todo.title}
                          </span>
                        </Th>
                        <Th className="!py-2">
                          {convertedStatusBadge(todo.status)}
                        </Th>
                        <Th className="!py-2">
                          {formattedDate(new Date(todo.completionDate))}
                        </Th>
                        <Th className="!py-2">
                          {formattedDate(new Date(todo.updatedAt))}
                        </Th>
                        <Th className="!py-2">
                          <IconButton
                            variant="unstyled"
                            className="!min-w-0 !min-h-0"
                            aria-label="Search database"
                            icon={<EditIcon />}
                            onClick={() => {}}
                          />
                        </Th>
                        <Th className="!py-2">
                          <IconButton
                            variant="unstyled"
                            className="!min-w-0 !min-h-0"
                            aria-label="Search database"
                            icon={<DeleteIcon />}
                            onClick={() => {}}
                          />
                        </Th>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
