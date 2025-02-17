import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProjectMaker from "./Project";
import Background from "./Background";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProjectMaker />
      <Background />
    </>
  );
}

export default App;
