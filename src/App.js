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
      <div className="testimonial-section">
        <TestimonialCard />
      </div>
    </div>
  );
}

export default App;
