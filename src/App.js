import React, { useState, useEffect } from "react";
import "./App.css";
import { BsTrash } from "react-icons/bs";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentFilter, setCurrentFilter] = useState("All");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDeleteAllTasks = () => {
    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (currentFilter === "All") {
      return true;
    } else if (currentFilter === "Active") {
      return !task.completed;
    } else if (currentFilter === "Complete") {
      return task.completed;
    }
    return false;
  });

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <div className="filter-buttons">
        <button
          onClick={() => handleFilterChange("All")}
          className={currentFilter === "All" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("Active")}
          className={currentFilter === "Active" ? "active" : ""}
        >
          Active
        </button>
        <button
          onClick={() => handleFilterChange("Complete")}
          className={currentFilter === "Complete" ? "active" : ""}
        >
          Complete
        </button>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add details"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`task ${task.completed ? "completed" : ""}`}
          >
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleteTask(task.id)}
              />
              <span className={task.completed ? "completed-text" : ""}>
                {task.text}
              </span>
            </label>
            {currentFilter === "Complete" && (
              <button onClick={() => handleDeleteTask(task.id)}>
                <BsTrash />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="task-controls">
        {currentFilter === "Complete" && (
          <button onClick={handleDeleteAllTasks}>Delete All</button>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
