const App = () => {
  return (
    <div className="container">
      <div className="upper">
        <h1 className="heading">To-Do for todos</h1>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter your task"
          />
          <button>+</button>
        </div>
      </div>

      <div className="line"></div>

      <div className="task-container">
        <div className="task">
          <div className="task-left">
            <input
              type="checkbox"
              className="checkbox"
            />
            <p className="input-task">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam amet necessitatibus.
            </p>
          </div>

          <div className="task-buttons">
            <button className="edit">edit</button>
            <button className="delete">delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
