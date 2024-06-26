import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/todoform/TodoForm";
import Tabs from "./components/tabs/Tabs";
import TodoList from "./components/todolist/TodoList";
import { getRecordsfromLocal, storeDataLocal } from "./utils/storage";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const [task, setTask] = useState<Task | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setTask(null);
    setIsOpen(false);
  };

  const handleAddTask = (title: string, description: string, id: string = "") => {
    const taskId = tasks && tasks.length > 0 ? Math.max(...tasks?.map((item) => parseInt(item.id))) + 1 : 1;
    let availableTasks: Task[];
    let alertMessage = "";

    if (id !== "") {
      availableTasks = tasks.map((item) => (item.id === id ? { ...item, title, description } : item));
      alertMessage = "Task has been updated successfully!";
    } else {
      const newTask: Task = {
        id: String(taskId),
        title,
        description,
        isCompleted: false,
      };
      availableTasks = [...tasks, newTask];
      alertMessage = "Task has been added successfully!";
    }

    setTasks(availableTasks);
    storeDataLocal("localTasks", availableTasks);
    setTask(null);
    setMessage(alertMessage);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  useEffect(() => {
    const records = getRecordsfromLocal("localTasks");
    if (records) {
      setTasks(records);
    }
  }, []);

  return (
    <div className="container">
      <div className="todo">Todo App</div>
      {message && <div className="alert success">{message}</div>}
      <TodoForm
        handleAddTask={handleAddTask}
        task={task}
        onEdit={handleEdit}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TodoList
        tasks={tasks}
        setTasks={setTasks}
        filter={selectedTab}
        setTask={setTask}
        setIsOpen={(value) => setIsOpen(value && task !== null)}
      />
    </div>
  );
}

export default App;
