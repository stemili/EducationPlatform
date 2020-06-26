import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

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
import NotFound from "./global-components/NotFound/NotFound";

function App() {
  const [modalWin, setModalWin] = useState([false, null]);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [dashboard, setDashboard] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [focusSearch, setFocusSearch] = useState(false);
  const toggleModal = (modalOpen, type) => {
    setModalWin([modalOpen, type]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    AuthService.logout();
    window.location.reload();
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          toggleModal={toggleModal}
          currentUser={currentUser}
          handleLogout={handleLogout}
          dashboard={dashboard}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          focusSearch={focusSearch}
          setFocusSearch={setFocusSearch}
        />

        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                toggleModal={toggleModal}
                setSelectedCategory={setSelectedCategory}
                setFocusSearch={setFocusSearch}
              />
            )}
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
            render={props => (
              <CoursePage {...props} toggleModal={toggleModal} />
            )}
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
          <Route path="*" component={NotFound}></Route>
        </Switch>

        <ModalAuth
          modalOpen={modalWin[0]}
          type={modalWin[1]}
          setModalWin={setModalWin}
          setCurrentUser={setCurrentUser}
        />
        <Footer dashboard={dashboard} />
      </Router>
    </div>
  );
}

export default App;
