import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};
let nextId: number = 0;

export const Index = () => {
  const [data, setData] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todo");
    return saved ? JSON.parse(saved) : [];
  });
  const [idEdit, setIdEdit] = useState<number>();
  const [textEdit, setTextEdit] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(data));
  }, [data]);

  const formik = useFormik({
    initialValues: {
      todo: "",
    },
    onSubmit: (values) => {
      setData([
        ...data,
        {
          id: nextId++,
          text: values.todo,
          done: false,
        },
      ]);
      formik.resetForm();
    },
  });

  const handleDelete = (todoId: number) => {
    setData(data.filter((data) => data.id !== todoId));
  };

  return (
    <div className="flex relative top-30 flex-col w-100 m-auto items-center">
      <form className="flex w-100 gap-2" onSubmit={formik.handleSubmit}>
        <Input
          name="todo"
          value={formik.values.todo}
          onChange={formik.handleChange}
          type="text"
        />
        <Button type="submit" className="cursor-pointer">
          Click
        </Button>
      </form>
      <ul className="mt-10 w-full grid gap-2">
        {data?.map((todo) => (
          <li key={todo.id} className="flex justify-between w-full">
            <div className="flex items-center gap-2 ml-2">
              <Checkbox
                checked={todo.done}
                onCheckedChange={(checked) => {
                  setData(
                    data.map((dataTodo) =>
                      dataTodo.id === todo.id
                        ? { ...dataTodo, done: !!checked }
                        : dataTodo
                    )
                  );
                }}
              />
              {todo.id === idEdit ? (
                <Input
                  value={textEdit}
                  onChange={(e) => {
                    setTextEdit(e.target.value);
                  }}
                />
              ) : (
                <Label className={`mb-1 ${todo.done ? "line-through" : ""}`}>
                  {todo.text}
                </Label>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (todo.id === idEdit) {
                    setData(
                      data.map((dataTodo) =>
                        dataTodo.id === todo.id
                          ? { ...dataTodo, text: textEdit }
                          : dataTodo
                      )
                    );
                    setIdEdit(undefined);
                    setTextEdit("");
                  } else {
                    setIdEdit(todo.id);
                    setTextEdit(todo.text);
                  }
                }}
                className="bg-blue-500 hover:bg-blue-600 w-14 cursor-pointer text-white"
              >
                {idEdit === todo.id ? "Save" : "Edit"}
              </Button>
              <Button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white"
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
