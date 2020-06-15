import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./global-components/Navbar/Navbar";
import Footer from "./global-components/Footer/Footer";
import ProtectedRoute from "./global-components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import ModalAuth from "./global-components/ModalAuth/ModalAuth";
import UserPage from "./pages/UserPage";
import AuthService from "./auth/AuthService";

function App() {
  const [modalWin, setModalWin] = useState([false, null]);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const toggleModal = (modalOpen, type) => {
    setModalWin([modalOpen, type]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    AuthService.logout();
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          toggleModal={toggleModal}
          currentUser={currentUser}
          handleLogout={handleLogout}
        />

        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} toggleModal={toggleModal} />}
          ></Route>
          {/* <Route
            exact
            path="/dashboard"
            render={props => <Dashboard {...props} />}
          ></Route> */}
          <ProtectedRoute
            name="dashboard"
            exact
            path="/dashboard"
            component={Dashboard}
          />
          <Route
            exact
            path="/course/:id"
            render={props => <CoursePage {...props} />}
          ></Route>
          <ProtectedRoute
            name="userpage"
            exact
            path="/userprofile"
            component={UserPage}
          />
        </Switch>
        <Route
          exact
          path="*"
          render={() => (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )}
        ></Route>
        <ModalAuth
          modalOpen={modalWin[0]}
          type={modalWin[1]}
          setModalWin={setModalWin}
          setCurrentUser={setCurrentUser}
        />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
