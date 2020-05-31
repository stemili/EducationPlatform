import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CategoryCard from "./components/CategoryCard";
const categoriesList = [
  { id: "1", name: "Programming" },
  { id: "2", name: "Bussiness" },
  { id: "3", name: "Photography" },
];

function App() {
  return (
    <div className="App">
      <Navbar />
      <CategoryCard categories={categoriesList} />
    </div>
  );
}

export default App;
