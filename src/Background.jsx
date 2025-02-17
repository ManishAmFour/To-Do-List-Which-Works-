import "./Layout.css";

// eslint-disable-next-line react/prop-types
function Background({ projectList, TodoList }) {
  return (
    <div key={2} className="background">
      <p className="title">To Do List</p>
      <div className="project-sidebar">
        <p className="project-title">Project Lists</p>
        {projectList.map((element, index) => {
          return (
            <div
              onClick={() => {
                console.log("hello");
              }}
              className="project-div"
              key={element}
            >
              <p className="project-name">{element} </p>{" "}
              <button
                onClick={() => {
                  console.log("not hello");
                }}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      <div className="todo-list">
        <p className="todo-title">Todo-Tasks</p>
        <div className="todo-task-summary">
          {TodoList.map((todo) => {
            return (
              <div className="todo-div" key={todo.task}>
                <p>{todo.task}</p>
                <p>{todo.description}</p>
                <p>{todo.dueDate}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Background;
