import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Erro ao carregar as tarefas:", error));
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      } else {
        return task;
      }
    });
    setTasks(newTasks);
  }

  function fetchTasks() {
    fetch("http://localhost:8080/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Erro ao carregar as tarefas:", error));
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function onAddTaskSubmit(title, description) {
    const newTask = { title, description, isCompleted: false };

    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar a tarefa");
        }
        return response.json();
      })
      .then((createdTask) => {
        // Mapeia `completed` para `isCompleted`
        const formattedTask = {
          ...createdTask,
          isCompleted: createdTask.completed,
        };
        console.log("Tarefa adicionada:", formattedTask);
        setTasks((prevTasks) => [...prevTasks, formattedTask]);
      })
      .catch((error) => {
        console.error("Erro ao adicionar a tarefa:", error);
      });
  }

  function deleteTask(taskId) {
    fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then(() => fetchTasks()) // Atualiza a lista de tarefas após deletar
      .catch((error) => console.error("Erro ao deletar a tarefa:", error));
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-500px space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
