import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/Intro";
import CoursesDisplay from "./components/CoursesDisplay/CoursesDisplay";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Intro />
      <CoursesDisplay title="hello World" />
    </div>
  );
}

export default App;
