import "./Layout.css";
import { useState } from "react";

function Background({
  projectList,
  TodoList,
  Switch,
  useSwitch,
  setCurrentProjectName,
}) {
  const [ListOfTodos, setEditUpdate] = useState(TodoList);

  function SetInput(e) {
    inputChange(e);
  }

  function specificProjectShown(index) {
    TodoList.forEach((todo, todoIndex) => {
      if (todoIndex === index) {
      }
    });
  }

  function AddMoreTodos(index) {
    if (Switch === "project") {
      projectList.forEach((project, projectIndex) => {
        if (projectIndex === index) {
          setCurrentProjectName(project);
          useSwitch("todo");
        }
      });
    }
  }

  function editTheTodo(todo) {
    ListOfTodos.forEach((element, index) => {
      if (todo.task === element.task && element.status === "static") {
        let NewList = ListOfTodos.map((element) => {
          if (element.project === todo.project) {
            return {
              project: todo.project,
              task: todo.task,
              description: todo.description,
              dueDate: todo.dueDate,
              status: "edit",
            };
          } else {
            return {
              project: element.project,
              task: element.task,
              description: element.description,
              dueDate: element.dueDate,
              status: "static",
            };
          }
        });
        setEditUpdate(NewList);

        localStorage.setItem("todo-list", JSON.stringify(NewList));
      } else if (todo.task === element.task && element.status === "edit") {
        let NewTodoList = ListOfTodos.map((element, index) => {
          if (element.project === todo.project) {
            return {
              project: todo.project,
              task: todo.task,
              description: todo.description,
              dueDate: todo.dueDate,
              status: "static",
            };
          } else {
            return {
              project: todo.project,
              task: todo.task,
              description: todo.description,
              dueDate: todo.dueDate,
              status: "static",
            };
          }
        });

        setEditUpdate(NewTodoList);
        localStorage.setItem("todo-list", JSON.stringify(NewTodoList));
      }
    });
  }

  return (
    <div className="background">
      <p className="title">To Do List</p>
      <div className="project-sidebar">
        <p className="project-title">Project Lists</p>
        {projectList.map((element, index) => {
          return (
            <div
              onClick={() => {
                specificProjectShown(index);
              }}
              className="project-div"
              key={index}
            >
              <p className="project-name">{element} </p>{" "}
              <div className="project-updation-buttons">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className="delete-button"
                >
                  Delete
                </button>
                <button
                  onClick={(event) => {
                    AddMoreTodos(index);
                    event.stopPropagation();
                  }}
                >
                  Add More
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="todo-list">
        <p className="todo-title">Todo-Tasks</p>
        <div className="todo-task-summary">
          {ListOfTodos.map((todo, index) => {
            if (todo.status === "static") {
              return (
                <div className="todo-div" key={index}>
                  <p>{todo.task}</p>
                  <p>{todo.description}</p>
                  <p>{todo.dueDate}</p>
                  <div className="function-buttons">
                    <button>Delete</button>
                    <button
                      onClick={() => {
                        editTheTodo(todo);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={index}>
                  <p>
                    Task Name:- <input className={`${index}-name`} />
                  </p>
                  <p>
                    Task description:-{" "}
                    <input className={`${todo.project}-desc`} />
                  </p>
                  <p>
                    DueDate:- <input className={`${todo.project}-date`} />
                  </p>
                  <div className="function-buttons">
                    <button
                      onClick={() => {
                        editTheTodo(todo);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Background;
