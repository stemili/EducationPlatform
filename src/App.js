import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import CategoryCard from "./components/CategoryCard";
import TestimonialCards from "./components/TestimonialCard";
import Footer from "./components/Footer";
import Intro from "./components/Intro/Intro";
import CoursesDisplay from "./components/CoursesDisplay/CoursesDisplay";
import AboutUs from "./components/AboutUs/AboutUs";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Intro />
      <CoursesDisplay title="hello World" />
      <AboutUs />
      <CategoryCard />
      <TestimonialCards />
      <Footer />
    </div>
  );
}

export default App;
