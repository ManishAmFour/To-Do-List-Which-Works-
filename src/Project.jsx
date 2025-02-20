import { useState, useRef } from "react";
import Background from "./Background";
import "./Project.css";

let ProjectName;
let taskName;
let TaskDescription;
let DateValue;

let ProjectCart = JSON.parse(localStorage.getItem("project-list")) || [
  "first project",
];
let ToDoCart = JSON.parse(localStorage.getItem("todo-list")) || [
  {
    project: "first project",
    task: "Waking up Early",
    description: "Setting up the alarm and strictly following the schedule",
    dueDate: "Everyday",
    status: "static",
  },
];

let date = new Date();
let Year = date.getFullYear();
let Month = String(date.getMonth() + 1).padStart(2, "0");
let day = String(date.getDate()).padStart(2, "0");

let fulldate = `${Year}-${Month}-${day}`;

function TodoMaker() {
  let [dateChange, setDateChange] = useState(fulldate);

  taskName = useRef("task");
  TaskDescription = useRef("empty");
  DateValue = useRef("");

  function DateChange(value) {
    setDateChange(value);
  }

  return (
    <>
      <div className="input-bar-div">
        <input ref={taskName} placeholder="name of the task"></input>
        <textarea
          ref={TaskDescription}
          className="description-text"
          placeholder="description"
        />
        <input
          value={dateChange}
          onChange={(e) => {
            DateChange(e.target.value);
          }}
          ref={DateValue}
          type="date"
        />

        <select>
          <option>High priority</option>
          <option>Medium priority</option>
          <option>Low priority</option>
        </select>
      </div>
    </>
  );
}

function ProjectDisplay() {
  ProjectName = useRef("initial");
  return (
    <p className="project-input">
      Project Name:- <input className="project-input-class" ref={ProjectName} />
    </p>
  );
}

function ProjectMaker() {
  const [Switch, useSwitch] = useState("project");
  const [CurrentProjectName, setCurrentProjectName] = useState("");
  function changeState() {
    if (Switch === "project") {
      if (ProjectName.current.value !== "") {
        ProjectCart.push(ProjectName.current.value);
        setCurrentProjectName(ProjectName.current.value);
        localStorage.setItem("project-list", JSON.stringify(ProjectCart));
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSwitch("todo");
      }
    } else {
      if (
        taskName.current.value !== "" &&
        TaskDescription.current.value !== ""
      ) {
        let NewTask = {
          project: CurrentProjectName,
          task: taskName.current.value,
          description: TaskDescription.current.value,
          dueDate: DateValue.current.value,
          status: "static",
        };

        ToDoCart.push(NewTask);
        localStorage.setItem("todo-list", JSON.stringify(ToDoCart));
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSwitch("project");
      }
    }
  }

  return (
    <div>
      <div>
        <Background
          Switch={Switch}
          setCurrentProjectName={setCurrentProjectName}
          useSwitch={useSwitch}
          projectList={ProjectCart}
          TodoList={ToDoCart}
        />
      </div>
      <div className="input-query-bar">
        {Switch === "project" ? <ProjectDisplay /> : <TodoMaker />}

        <button className="enter-button-project" onClick={changeState}>
          Enter
        </button>
      </div>
    </div>
  );
}

export default ProjectMaker;
