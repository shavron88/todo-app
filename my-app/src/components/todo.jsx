
import React, { useState, useEffect } from "react";

import { FaTrash } from "react-icons/fa"; 
import "./todo.css"; 
const Todo = () => {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {

      console.error("Error loading todos from localStorage:", error);
      return [];
    }

  });

  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all"); 


  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);

    }
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ?     { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));

  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });


  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="todo-container">
      <h1>Todo List</h1>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>

      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="todo-checkbox"
            />
            <span className="todo-text">{todo.text}</span>
            
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
              aria-label="Delete"
            >
              <FaTrash />
            </button>

          </li>
        ))}
      </ul>

      {todos.length > 0 && (

        <div className="todo-footer">
          <span>
            {activeTodosCount}  {activeTodosCount === 1 ? "item" : "items"} left
          </span>
          <button onClick={clearCompleted} className="clear-button">
            Clear Completed
          </button  >
        </div>
      )}
    </div>  

  );
};

export default Todo;
