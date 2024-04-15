import React, { useState, useEffect } from "react";
import "./tolist.scss";

import { storeDataLocal } from "../../utils/storage";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface TodoListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filter: string;
  setTask: React.Dispatch<React.SetStateAction<Task | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNewTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, setTasks, filter, setTask, setIsOpen, setNewTask }) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  const handleEditClick = (task: Task) => {
    setTask(task);
    setIsOpen(true);

    if (task.isCompleted) {
      setNewTask(false);
    }
  };

  useEffect(() => {
    let results: Task[];
    switch (filter) {
      case "Active":
        results = tasks.filter((item) => !item.isCompleted);
        break;
      case "Completed":
        results = tasks.filter((item) => item.isCompleted);
        break;
      default:
        results = tasks;
        break;
    }
    setFilteredTasks(results);
  }, [filter, tasks]);

  const handleClickAction = (id: string, action: string) => {
    switch (action) {
      case "markAsDone": {
        const updatedTasks = tasks.map((item) =>
          item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
        );
        setTasks(updatedTasks);
        storeDataLocal("localTasks", updatedTasks);
        break;
      }
      case "delete": {
        if (window.confirm(`Are you sure you want to delete this task?`)) {
          const updatedTasks = tasks.filter((item) => item.id !== id);
          setTasks(updatedTasks);
          storeDataLocal("localTasks", updatedTasks);
          setFilteredTasks(updatedTasks.length ? updatedTasks : []);
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="parent-div">
      {!filteredTasks || filteredTasks.length === 0 ? (
        <div className="list_item">No task available.</div>
      ) : (
        filteredTasks.map((task) => (
          <div key={`item_${task.id}`}>
            <div className="list_item task_added_animation">
              <div className="list_container">
                <span onClick={() => handleClickAction(task.id, "markAsDone")}>
                <svg width="23px" height="23px" viewBox="0 0 1024 1024" fill="#000000" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M824.8 1003.2H203.2c-12.8 0-25.6-2.4-37.6-7.2-11.2-4.8-21.6-12-30.4-20.8-8.8-8.8-16-19.2-20.8-30.4-4.8-12-7.2-24-7.2-37.6V260c0-12.8 2.4-25.6 7.2-37.6 4.8-11.2 12-21.6 20.8-30.4 8.8-8.8 19.2-16 30.4-20.8 12-4.8 24-7.2 37.6-7.2h94.4v48H203.2c-26.4 0-48 21.6-48 48v647.2c0 26.4 21.6 48 48 48h621.6c26.4 0 48-21.6 48-48V260c0-26.4-21.6-48-48-48H730.4v-48H824c12.8 0 25.6 2.4 37.6 7.2 11.2 4.8 21.6 12 30.4 20.8 8.8 8.8 16 19.2 20.8 30.4 4.8 12 7.2 24 7.2 37.6v647.2c0 12.8-2.4 25.6-7.2 37.6-4.8 11.2-12 21.6-20.8 30.4-8.8 8.8-19.2 16-30.4 20.8-11.2 4.8-24 7.2-36.8 7.2z" fill=""></path><path d="M752.8 308H274.4V152.8c0-32.8 26.4-60 60-60h61.6c22.4-44 67.2-72.8 117.6-72.8 50.4 0 95.2 28.8 117.6 72.8h61.6c32.8 0 60 26.4 60 60v155.2m-430.4-48h382.4V152.8c0-6.4-5.6-12-12-12H598.4l-5.6-16c-12-33.6-43.2-56-79.2-56s-67.2 22.4-79.2 56l-5.6 16H334.4c-6.4 0-12 5.6-12 12v107.2zM432.8 792c-6.4 0-12-2.4-16.8-7.2L252.8 621.6c-4.8-4.8-7.2-10.4-7.2-16.8s2.4-12 7.2-16.8c4.8-4.8 10.4-7.2 16.8-7.2s12 2.4 16.8 7.2L418.4 720c4 4 8.8 5.6 13.6 5.6s10.4-1.6 13.6-5.6l295.2-295.2c4.8-4.8 10.4-7.2 16.8-7.2s12 2.4 16.8 7.2c9.6 9.6 9.6 24 0 33.6L449.6 784.8c-4.8 4-11.2 7.2-16.8 7.2z" fill=""></path></g></svg>

</span>
                <div>
                  <div>
                    <h3>Title: {task.title}</h3>
                  </div>
                  <div className="description">
                    <h4>Description: {task.description}</h4>
                  </div>
                </div>
                <span onClick={() => handleClickAction(task.id, "markAsDone")}>
                  <button className="complete">Mark as Completed</button>
                </span>
              </div>
              <div className="item_actions">
                <span title="edit" onClick={() => handleEditClick(task)}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>                  </span>
                <span
                  title="Delete"
                  onClick={() => handleClickAction(task.id, "delete")}
                >
    <svg width="24px" height="24px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>delete [#1487]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"> </path> </g> </g> </g> </g></svg>                </span>
              </div>
            </div>
          </div>
        ))
      )}
      <div className="space_holder"></div>
    </div>
  );
};

export default TodoList;
