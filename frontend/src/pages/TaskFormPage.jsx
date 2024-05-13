import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { Card, Input, Textarea, Label, Button } from "../components/ui";

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { createTask, updateTask, loadTask } = useTasks();
  const { id } = useParams();

  // Manejo del submit
  const onSubmit = async (data) => {
    try {
      // Asegurarse de que la fecha se envía en el formato correcto
      const finalData = {
        ...data,
        due_date: data.due_date || null, // Tomar directamente el valor del input date
      };
      if (!id) {
        await createTask(finalData);
      } else {
        await updateTask(id, finalData);
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Cargar datos de la tarea para editar
  useEffect(() => {
    if (id) {
      loadTask(id).then((task) => {
        setValue("title", task.title);
        setValue("description", task.description);
        // Asegurarse de que la fecha está en el formato correcto para el input de tipo date.
        const formattedDate = task.due_date
          ? new Date(task.due_date).toISOString().split("T")[0]
          : "";
        setValue("due_date", formattedDate);
      });
    }
  }, [id, setValue, loadTask]);

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        <h2 className="text-3xl font-bold my-4">
          {id ? "Edit Task" : "Create Task"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}

          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />

          <Label htmlFor="due_date">Fecha de vencimiento</Label>
          <input
            type="date"
            className="bg-zinc-800 px-3 py-2 block my-2 w-full"
            min={new Date().toISOString().split("T")[0]}
            {...register("due_date")}
          />

          {errors.due_date && (
            <span className="text-red-500">{errors.due_date.message}</span>
          )}

          <div className="flex justify-end">
            {" "}
            {/* Añadido para alinear el botón a la derecha */}
            <Button type="submit">{id ? "Edit Task" : "Create Task"}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default TaskFormPage;
