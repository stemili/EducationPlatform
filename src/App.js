import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import CategoryCard from "./components/CategoryCard";
import TestimonialCards from "./components/TestimonialCard";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Navbar />
      <CategoryCard />
      <TestimonialCards />
      <Footer />
    </div>
  );
}

export default App;
