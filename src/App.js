import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CategoryCard from "./components/CategoryCard";
import TestimonialCard from "./components/TestimonialCard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <CategoryCard />
      <TestimonialCard />
    </div>
  );
}

export default App;
