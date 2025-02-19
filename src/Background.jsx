import "./Layout.css";
import { use, useRef, useState } from "react";

let inputName;
let inputDesc;
let inputDate;

function Background({
  projectList,
  TodoList,
  Switch,
  useSwitch,
  setCurrentProjectName,
}) {
  const [ListOfTodos, setEditUpdate] = useState(TodoList);
  const [ListOfProjects, setProjectUpdate] = useState(projectList);

  inputName = useRef("");
  inputDesc = useRef("");
  inputDate = useRef("");

  function SetInput(e) {
    inputChange(e);
  }

  function specificProjectShown(element, index) {
    if (index === 0) {
      let DisplayTodo = JSON.parse(localStorage.getItem("todo-list")).map(
        (todo, TodoIndex) => {
          return todo;
        }
      );

      setEditUpdate(DisplayTodo);
    } else {
      let DisplayTodo = JSON.parse(localStorage.getItem("todo-list"))
        .map((todo, TodoIndex) => {
          if (element === todo.project) {
            return todo;
          }
        })
        .filter((value, index) => {
          if (value !== undefined) {
            return value;
          }
        });

      setEditUpdate(DisplayTodo);
    }
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
      if (todo.task === element.task && todo.status === "static") {
        let NewList = ListOfTodos.map((element) => {
          if (element.task === todo.task) {
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
      } else if (todo.task === element.task && todo.status === "edit") {
        let NewTodoList = ListOfTodos.map((element, index) => {
          if (element.task === todo.task) {
            return {
              project: todo.project,
              task: inputName.current.value,
              description: inputDesc.current.value,
              dueDate: inputDate.current.value,
              status: "static",
            };
          } else {
            return {
              project: element.project,
              task: element.task,
              description: element.description,
              dueDate: element.dueDate,
              status: element.status,
            };
          }
        });

        setEditUpdate(NewTodoList);
        localStorage.setItem("todo-list", JSON.stringify(NewTodoList));
      }
    });
  }

  function deleteTheProject(element, index) {
    const NewProjectList = JSON.parse(localStorage.getItem("project-list"))
      .map((project, index) => {
        if (project === element) {
          return undefined;
        } else if (project !== element) {
          return project;
        }
      })
      .filter((value, index) => {
        if (value !== undefined) {
          return value;
        }
      });

    const NewTodoList = JSON.parse(localStorage.getItem("todo-list"))
      .map((todo, index) => {
        if (todo.project === element) {
          return null;
        } else if (todo.project !== element) {
          return todo;
        }
      })
      .filter((value, index) => {
        if (value !== undefined) {
          return value;
        }
      });

    setProjectUpdate(NewProjectList);
    setEditUpdate(NewTodoList);
    localStorage.setItem("todo-list", JSON.stringify(NewTodoList));
    localStorage.setItem("project-list", JSON.stringify(NewProjectList));
  }

  function deleteTheTodo(element, index) {
    const NewTodoList = JSON.parse(localStorage.getItem("todo-list"))
      .map((todo, index) => {
        if (todo.task === element.task) {
          return null;
        } else if (todo.project !== element) {
          return todo;
        }
      })
      .filter((value, index) => {
        if (value !== undefined) {
          return value;
        }
      });
    setEditUpdate(NewTodoList);

    localStorage.setItem("todo-list", JSON.stringify(NewTodoList));

    let ProjectNameCurrent = element.project;

    if (
      JSON.parse(localStorage.getItem("todo-list")).find((todo, index) => {
        if (todo.project === ProjectNameCurrent) {
          return true;
        }
      })
    ) {
      console.log("yes");
    } else {
      let NewProjectArray = JSON.parse(localStorage.getItem("project-list"))
        .map((element, index) => {
          if (ProjectNameCurrent === element) {
            return undefined;
          } else {
            return element;
          }
        })
        .filter((value) => {
          if (value !== undefined) {
            return value;
          }
        });

      setProjectUpdate(NewProjectArray);
      localStorage.setItem("project-list", JSON.stringify(NewProjectArray));
    }
  }

  return (
    <div className="background">
      <p className="title">To Do List</p>

      <div className="todo-list">
        <div className="project-sidebar">
          <p className="project-title">Project Lists</p>
          {ListOfProjects.map((element, index) => {
            return (
              <div
                onClick={() => {
                  specificProjectShown(element, index);
                }}
                className="project-div "
                key={index}
              >
                <p className="project-name">{element} </p>{" "}
                <div className="project-updation-buttons">
                  <button
                    onClick={(event) => {
                      deleteTheProject(element, index);
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
        <div className="todo-task-summary">
          {ListOfTodos.map((todo, index) => {
            if (todo.status === "static") {
              return (
                <div className="todo-div" key={index}>
                  <p>{todo.task}</p>
                  <p>{todo.description}</p>
                  <p>{todo.dueDate}</p>
                  <div className="function-buttons">
                    <button
                      onClick={() => {
                        deleteTheTodo(todo, index);
                      }}
                    >
                      Delete
                    </button>
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
                    Task Name:- <input ref={inputName} />
                  </p>
                  <p>
                    Task description:- <input ref={inputDesc} />
                  </p>
                  <p>
                    DueDate:- <input type="date" ref={inputDate} />
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
