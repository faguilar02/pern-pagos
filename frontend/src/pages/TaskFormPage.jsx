import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, Input, Textarea, Label, Button } from "../components/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function TaskFormPage() {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { createTask, updateTask, loadTask, setValue } = useTasks();
  const params = useParams();

  const onSubmit = data => {
    const finalData = {
      ...data,
      due_date: data.due_date.toISOString().split('T')[0]  // Formatear la fecha a YYYY-MM-DD
    };
    if (!params.id) {
      createTask(finalData).then(() => navigate("/tasks"));
    } else {
      updateTask(params.id, finalData).then(() => navigate("/tasks"));
    }
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id).then(task => {
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("due_date", new Date(task.due_date));
      });
    }
  }, [params.id, loadTask, setValue]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title", { required: true })} />
        {errors.title && <p className="text-red-500">Title is required</p>}

        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />

        <Label htmlFor="due_date">Due Date</Label>
        <Controller
          control={control}
          name="due_date"
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

        <Button type="submit">{params.id ? "Update Task" : "Create Task"}</Button>
      </form>
    </Card>
  );
}

export default TaskFormPage;
