import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./global-components/Navbar/Navbar";
import Footer from "./global-components/Footer/Footer";
import "./App.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import ModalAuth from "./global-components/ModalAuth/ModalAuth";

function App() {
  const [modalWin, setModalWin] = useState([false, null]);
  const toggleModal = (modalOpen, type) => {
    setModalWin([modalOpen, type]);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar toggleModal={toggleModal} />

        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} toggleModal={toggleModal} />}
          ></Route>
          <Route
            exact
            path="/dashboard"
            render={props => <Dashboard {...props} />}
          ></Route>
          <Route
            exact
            path="/course/:id"
            render={props => <CoursePage {...props} />}
          ></Route>
        </Switch>

        <ModalAuth
          modalOpen={modalWin[0]}
          type={modalWin[1]}
          setModalWin={setModalWin}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
