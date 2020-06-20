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
import CreateCourse from "./global-components/CreateCourse/CreateCourse";
import Lesson from "./pages/CoursePage/components/Lesson/Lesson";

function App() {
  const [modalWin, setModalWin] = useState([false, null]);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [dashboard, setDashboard] = useState(false);

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
          dashboard={dashboard}
        />

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} toggleModal={toggleModal} />}
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
            setDashboard={setDashboard}
          />
          <Route
            exact
            path="/courses/:id"
            render={(props) => <CoursePage {...props} />}
          ></Route>
          <ProtectedRoute
            name="lessons"
            exact
            path="/courses/:id/lessons"
            component={Lesson}
          />
          <ProtectedRoute
            name="userpage"
            exact
            path="/userprofile"
            component={UserPage}
          />
          <ProtectedRoute
            name="createcourse"
            exact
            path="/createcourse"
            component={CreateCourse}
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
        <Footer dashboard={dashboard} />
      </BrowserRouter>
    </div>
  );
}

export default App;
