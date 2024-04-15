import React, { FC, useEffect, useRef, useState } from "react";
import Modal from "./modal";

interface Todo {
  id: string;
  title: string;
  description: string;
}

interface TodoFormProps {
  handleAddTask: (title: string, description: string, taskId: string) => void;
  task: Todo | null;
  onEdit: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const TodoForm: FC<TodoFormProps> = ({
  handleAddTask,
  task,
  onEdit,
  isOpen,
  setIsOpen,
}) => {
  const [text, setText] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [invalid, setInvalid] = useState(false);
  const [newTask, setNewTask] = useState(task ? false : true);
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setText("");
    setDescription("");
    setInvalid(false);
    setNewTask(true);
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || text === "UPDATE") {
      setInvalid(true);
      inputRef.current?.focus();
      return;
    }
    const taskId = task ? task.id : "";
    handleAddTask(text, description, taskId);
    setText("");
    setDescription("");
    closeModal();
  };

  const addTask = () => {
    setNewTask(true);
    openModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "task") {
      if (value.length === 0) {
        setInvalid(true);
      } else {
        setInvalid(false);
      }
      setText(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  useEffect(() => {
    if (task) {
      setText(task.title);
      setDescription(task.description);
      setNewTask(false);
    } else {
      setText("");
      setDescription("");
      setNewTask(true);
    }
  }, [task]);

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || text === "UPDATE") {
      setInvalid(true);
      inputRef.current?.focus();
      return;
    }
    const taskId = task ? task.id : "";
    handleAddTask(text, description, taskId);
    setText("");
    setDescription("");
    closeModal();
    onEdit();
  };

  return (
    <div className="form_container">
      <button className="addnewbtn" onClick={addTask}>Add New Task</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {newTask ? (
          <form onSubmit={handleSubmit}>
            <h2>Add Todo</h2>
            <p>Title</p>
            <div className="form_wrapper">
              <div className="form_input_row">
                <input
                  ref={inputRef}
                  type="text"
                  className={`taskinput ${invalid ? "invalid" : "valid"}`}
                  placeholder="Write your task here..."
                  autoComplete="off"
                  name="task"
                  value={text}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p>Description</p>
            <div className="form_wrapper">
              <div className="form_input_row">
                <textarea
                  name="description"
                  placeholder="Write your description here..."
                  value={description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="add_btn">{task ? "UPDATE" : "ADD"}</button>
          </form>
        ) : (
          <form onSubmit={handleEdit}>
            <h2>Edit Todo</h2>
            <p>Title</p>
            <div className="form_wrapper">
              <div className="form_input_row">
                <input
                  ref={inputRef}
                  type="text"
                  className={`taskinput ${invalid ? "invalid" : "valid"}`}
                  placeholder="Write your task here..."
                  autoComplete="off"
                  name="task"
                  value={text}
                  onChange={handleChange}
                />
              </div>
            </div>
            <p>Description</p>
            <div className="form_wrapper">
              <div className="form_input_row">
                <textarea
                  name="description"
                  placeholder="Write your description here..."
                  value={description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="add_btn">UPDATE</button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default TodoForm;
