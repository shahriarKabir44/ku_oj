import React from "react";
import { useNavigate } from "react-router-dom";
import ContestCreationEventManager from "../../../EventsManager/ContestCreationEventManager";
 import NavbarDirectoryManager from "../../../EventsManager/NavbarDirectoryManager";
import ToastManager from "../../../EventsManager/ToastManager";
import ContestService from "../../../services/Contest.service";
import "./CreateContest.css";

function CreateContest({ currentUser }) {
  const navigate = useNavigate();

  const [contestInfo, setContestInfo] = React.useState({
    title: "",
    startTime: new Date(),
    endTime: new Date(new Date() * 1 + 3600 * 1000),
    hostId: currentUser.id,
    code: "",
  });
  function createContest() {
    if (
      contestInfo.startTime >= contestInfo.endTime ||
      contestInfo.title.length === 0 ||
      contestInfo.code.length === 0
    ) {
      ToastManager.showError("Invalid input");
      return;
    }
     ContestService.createContest({
      ...contestInfo,
      startTime: contestInfo.startTime.getTime(),
      endTime: contestInfo.endTime.getTime(),
    }).then((contestId) => {
      if (contestId === null) {
        ToastManager.showError("Contest name already exists!");
         return;
      }
      ContestCreationEventManager.sendMessage({
        ...contestInfo,
        startTime: contestInfo.startTime.getTime(),
        endTime: contestInfo.endTime.getTime(),
        id: contestId,
      }).then(({ status, errorMessage }) => {
        if (!status) {
          ToastManager.showError(errorMessage);
          return;
        }
 
        navigate(`/user/${currentUser.id}/editContest/${contestId}`);
      });
    });
  }
  React.useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }

    setTimeout(() => {
      NavbarDirectoryManager.setDitectory("createContest", {
        userId: currentUser.id,
        userName: currentUser.userName,
      });
    }, 100);
  }, []);
  return (
    <div className="container_createContest">
      <div className="dashboardContainer">
        <div className="leftPanel">
          <div className="contestDetailsPanel">
            <div className="card" style={{ minHeight: "50vh" }}>
              <div className="titleContainer_createProblem">
                <h2 className="createContestPage_title">Create a contest</h2>
                <button
                  className="btn confirmContestCreation"
                  onClick={createContest}
                >
                  Create
                </button>
              </div>
              <div className="formContainer">
                <label htmlFor="title">Contest title:</label>
                <input
                  className="createContestInput"
                  onChange={(e) => {
                    setContestInfo({ ...contestInfo, title: e.target.value });
                  }}
                  type="text"
                  name="title"
                  value={contestInfo.title}
                />

                <label htmlFor="code">Contest code:</label>
                <input
                  className="createContestInput"
                  onChange={(e) => {
                    setContestInfo({ ...contestInfo, code: e.target.value });
                  }}
                  type="text"
                  name="code"
                  value={contestInfo.code}
                />

                <label htmlFor="start">Start Time:</label>
                <input
                  className="createContestInput"
                  onChange={(e) => {
                    setContestInfo({
                      ...contestInfo,
                      startTime: new Date(e.target.value),
                    });
                  }}
                  type="datetime-local"
                  name="start"
                  value={
                    contestInfo.startTime instanceof Date
                      ? contestInfo.startTime.toISOString().slice(0, 16)
                      : ""
                  }
                />

                <label htmlFor="end">End Time:</label>
                <input
                  className="createContestInput"
                  onChange={(e) => {
                    setContestInfo({
                      ...contestInfo,
                      endTime: new Date(e.target.value),
                    });
                  }}
                  type="datetime-local"
                  name="end"
                  value={
                    contestInfo.endTime instanceof Date
                      ? contestInfo.endTime.toISOString().slice(0, 16)
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateContest;
