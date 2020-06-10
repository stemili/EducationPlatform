import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import CategoryCard from "./components/CategoryCard/CategoryCard";
import TestimonialCards from "./components/TestimonialCard/TestimonialCard";
import Footer from "./components/Footer/Footer";
import Intro from "./components/Intro/Intro";
import CoursesDisplay from "./components/CoursesDisplay/CoursesDisplay";
import AboutUs from "./components/AboutUs/AboutUs";

import ModalAuth from "./components/ModalAuth/ModalAuth";

function App() {
  const [modalWin, setModalWin] = useState([false, null]);
  const toggleModal = (modalOpen, type) => {
    setModalWin([modalOpen, type]);
  };
  return (
    <div className="App">
      <Navbar toggleModal={toggleModal} />

      <Intro />
      <CoursesDisplay title="hello World" />
      <AboutUs />
      <CategoryCard />
      <TestimonialCards />
      <ModalAuth
        modalOpen={modalWin[0]}
        type={modalWin[1]}
        setModalWin={setModalWin}
      />
      <Footer />
    </div>
  );
}

export default App;
