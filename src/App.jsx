import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ContestInfo from "./routed/ContestInfo/ContestInfo";
import Contests from "./routed/Contests/Contests";
import Home from "./routed/Home/Home";
import ProblemDetails from "./routed/ProblemDetails/ProblemDetails";
import ProblemSet from "./routed/ProblemSet/ProblemSet";
import SubmissionInfo from "./routed/SubmissionInfo/SubmissionInfo";
import CreateContest from "./routed/UserProfile/ContestCreation/CreateContest";
import EditContest from "./routed/UserProfile/EditContest/EditContest";
import UserProfileRoot from "./routed/UserProfile/UserProfileRoot";
import UserService from "./services/User.service";
import ConfirmationModal from "./shared/ConfirmationModal/ConfirmationModal";
import Loader from "./shared/Loader/Loader";
import NavBar from "./shared/NavBar/NavBar";
import Toast from "./shared/Toast/Toast";
function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    UserService.isAuthorized().then(({ user }) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <div className="App">
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Loader />
      <Toast />
      <ConfirmationModal />
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route
            path="/contest/:id"
            element={<ContestInfo currentUser={currentUser} />}
          />
          <Route
            path="/viewSubmission/:contestId/:submissionId/"
            element={<SubmissionInfo currentUser={currentUser} />}
          />
          <Route path="/user/:id">
            <Route
              path=""
              element={<UserProfileRoot currentUser={currentUser} />}
            />
            {currentUser && (
              <Route
                path="createContest"
                element={<CreateContest currentUser={currentUser} />}
              />
            )}
            {currentUser && (
              <Route
                path="editContest/:contestId"
                element={<EditContest currentUser={currentUser} />}
              />
            )}
          </Route>
          <Route
            path="/contests"
            element={<Contests currentUser={currentUser} />}
          />
          <Route
            path="/problem/:problemId"
            element={<ProblemDetails currentUser={currentUser} />}
          />
          <Route
            path="/problemset"
            element={<ProblemSet currentUser={currentUser} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
