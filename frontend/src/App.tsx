import "./App.css";
import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);





  
  return (
    <div className="todo-page">
      <div className="todo-card">
        <div className="heading-wrap">
          <span className="eyebrow">Daily planner</span>
          <h1 className="heading">To-Do for todos</h1>
          <p className="subtitle">Keep track of today&apos;s work with a clean, focused list.</p>
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your task"
          />
          <button aria-label="Add task">+</button>
        </div>

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
          <div className="task task-active">
            <div className="task-left">
              <input
                type="checkbox"
                className="checkbox"
              />
              <div>
                <p className="task-title">Design the dashboard layout</p>
                <p className="input-task">Polish spacing, cards, and visual hierarchy.</p>
              </div>
            </div>

            <div className="task-buttons">
              <button className="edit">edit</button>
              <button className="delete">delete</button>
            </div>
          </div>

          <div className="task">
            <div className="task-left">
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked
              />
              <div>
                <p className="task-title done">Refine component spacing</p>
                <p className="input-task done-text">
                  Completed with tighter padding and smoother layout.
                </p>
              </div>
            </div>

            <div className="task-buttons">
              <button className="edit">edit</button>
              <button className="delete">delete</button>
            </div>
          </div>

          <div className="task">
            <div className="task-left">
              <input
                type="checkbox"
                className="checkbox"
              />
              <div>
                <p className="task-title">Add a finishing accent style</p>
                <p className="input-task">Use subtle gradients and soft shadows for depth.</p>
              </div>
            </div>

            <div className="task-buttons">
              <button className="edit">edit</button>
              <button className="delete">delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
