import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, Input, Textarea, Label, Button } from "../components/ui";

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { createTask, updateTask, loadTask, errors: tasksErrors } = useTasks();
  const params = useParams();

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      due_date: data.due_date.toISOString().split('T')[0]  // Formatear la fecha a YYYY-MM-DD
    };
    if (!params.id) {
      await createTask(finalData);
    } else {
      await updateTask(params.id, finalData);
    }
    navigate("/tasks");
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id).then((task) => {
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("due_date", new Date(task.due_date));
      });
    }
  }, [params.id, setValue, loadTask]);

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {tasksErrors.map((error, i) => (
          <p className="text-red-500" key={i}>{error}</p>
        ))}
        <h2 className="text-3xl font-bold my-4">
          {params.id ? "Edit Task" : "Create Task"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title", { required: true })} />
          {errors.title && <span className="text-red-500">Title is required</span>}

          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />

          <Label htmlFor="due_date">Due Date</Label>
          <Controller
            name="due_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Select date"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                dateFormat="yyyy-MM-dd"
                className="input"
              />
            )}
          />
          {errors.due_date && (<span className="text-red-500">Date is required</span> )}
          <Button type="submit">{params.id ? "Edit Task" : "Create Task"}</Button>
        </form>
      </Card>
    </div>
  );
}

export default TaskFormPage;