import "./App.css";
import { useState } from "react";
import { nanoid } from "nanoid";

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTodo: Todo = {
      id: nanoid(),
      title: title,
      isCompleted: false,
    };

    setTodos([...todos, newTodo]);

    setTitle("");
  };

  return (
    <div className="todo-page">
      <div className="todo-card">
        <div className="heading-wrap">
          <span className="eyebrow">Daily planner</span>
          <h1 className="heading">To-Do for todos</h1>
          <p className="subtitle">Keep track of today&apos;s work with a clean, focused list.</p>
        </div>

        <form
          onSubmit={submitHandler}
          className="input-box"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter your task"
          />
          <button
            type="submit"
            aria-label="Add task"
          >
            +
          </button>
        </form>

        <div
          className="stats-row"
          aria-label="Task summary"
        >
          <div className="stat-card">
            <span className="stat-label">Today</span>
            <strong>06 tasks</strong>
          </div>
          <div className="stat-card accent">
            <span className="stat-label">Completed</span>
            <strong>03 tasks</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Pending</span>
            <strong>03 tasks</strong>
          </div>
        </div>

        <div className="line" />

        <div className="task-container">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="task task-active"
            >
              <div className="task-left">
                <input
                  type="checkbox"
                  className="checkbox"
                />
                <div>
                  <p className="input-task">{todo.title}</p>
                </div>
              </div>

              <div className="task-buttons">
                <button className="edit">edit</button>
                <button className="delete">delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
