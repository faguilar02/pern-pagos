import { Card, Button } from "../ui";
import { useTasks } from "../../context/TaskContext";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const navigate = useNavigate();

  // Opción para formatear la fecha, dependiendo de cómo se guarde en tu base de datos
  const formatDate = (dateString) => {
    if (!dateString) return "No especificado";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card key={task.id} className="px-7 py-4 flex flex-col justify-center">
      <div>
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p>{task.description}</p>
        {/* Mostrar la fecha formateada */}
        <p className="text-sm text-gray-500">Vence: {formatDate(task.due_date)}</p>
      </div>

      <div className="my-2 flex justify-end gap-x-2">
        <Button onClick={() => navigate(`/tasks/${task.id}/edit`)}>
          <BiPencil className="text-white" />
          Editar
        </Button>
        <Button
          className="bg-red-700 hover:bg-red-600"
          onClick={async () => {
            if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
              deleteTask(task.id);
            }
          }}
        >
          <AiFillDelete className="text-white" />
          Eliminar
        </Button>
      </div>
    </Card>
  );
}

export default TaskCard;
