import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";
import React from "react";
import { useParams } from "react-router-dom";
import NavbarDirectoryManager from "../../../EventsManager/NavbarDirectoryManager";
import ContestService from "../../../services/Contest.service";
import Global from "../../../services/Global";

import "../ContestCreation/CreateProblem/CreateProblem.css";

import ToastManager from "../../../EventsManager/ToastManager";
import SubmissionService from "../../../services/Submission.service";
import "./EditContest.css";
import EditProblem from "./EditProblem/EditProblem";

export default function EditContest({ currentUser }) {
  const { contestId } = useParams();
  const [problemCount, setProblemCount] = React.useState([]);
  const [selectedProblemForPreview, setSelectedProblemForPreview] =
    React.useState(0);
  const [contestInfo, setContestInfo] = React.useState({
    title: "",
    startTime: new Date(),
    endTime: new Date(new Date() * 1 + 3600 * 1000),
    hostId: currentUser.id,
    code: "",
  });
  function insertNewProblem() {
    let problems = structuredClone(problemCount);
    let newProblem = {
      title: "new problem",
      code: "",
      statementFileURL: "",
      points: "",
      testcaseFileURL: "",
      outputFileURL: "",
      isExisting: false,
      index: problems.length,
      isNew: true,
      contestId,
    };
    problems.push(newProblem);
    setSelectedProblemForPreview(problems.length - 1);
    setProblemCount(problems);
  }

  function updateContest(force = false) {
    if (force) {
      if (
        !window.confirm(
          "Force updating the contest will update the time and delete all the submissions. Are you sure you want to continue?",
        )
      ) {
        return;
      }
    }
    ContestService.updateContestInfo(contestInfo, force).then((response) => {
      if (response == null) {
        return;
      }
      ToastManager.showSuccess("Contest updated successfully");
      loadContestInfo(contestId);
    });
  }
  function toLocalInputValue(utcString) {
    const date = new Date(utcString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16);
  }

  function trashUntrashProblemById(problem) {
    if (
      !window.confirm(
        `Are you sure you want to ${problem.isAvailable ? "Trash" : "Untrash"} this problem?`,
      )
    ) {
      return;
    }
    ContestService.trashUntrashProblemId(problem.id, !problem.isAvailable).then(
      (resp) => {
        if (!resp.errorMsg) {
          ToastManager.showSuccess("Problem set updated!");
          loadContestInfo(contestId);
        }
      },
    );
  }

  function loadContestInfo(contestId) {
    ContestService.getFullContestDetailsForEdit(contestId).then((data) => {
      if (data == null) {
        return;
      }
      let fullContestDetails = data.data;
      NavbarDirectoryManager.setDitectory("editContest", {
        userId: currentUser.id,
        userName: currentUser.userName,
        contest: {
          id: contestId,
          title: fullContestDetails.title,
        },
      });
      fullContestDetails.startTime = toLocalInputValue(
        fullContestDetails.startTime,
      );
      fullContestDetails.endTime = toLocalInputValue(
        fullContestDetails.endTime,
      );
      // fullContestDetails.endTime = new Date(fullContestDetails.endTime)
      //add validation
      let { problems } = fullContestDetails;
      delete fullContestDetails.problems;
      problems.forEach((problem) => {
        problem.isExisting = true;
        problem.isDeleted = false;
        problem.isEdited = false;
        problem.statementFileURL =
          Global.SERVER_URL + "/" + problem.id + ".pdf";
        problem.testcaseFileURL = Global.SERVER_URL + problem.testcaseFileURL;
        problem.outputFileURL = Global.SERVER_URL + problem.outputFileURL;
      });
      setProblemCount(problems);
      setContestInfo(fullContestDetails);
    });
  }
  function rejudgeAllProblems() {
    if (!window.confirm("Are you sure? This is a heavy process!")) return;
    SubmissionService.rejudgeContestSubmissions(contestId).then((resp) => {
      if (resp.errorMsg) return;
      ToastManager.showSuccess("Rejudged Successfully!");
    });
  }
  React.useEffect(() => {
    loadContestInfo(contestId);
  }, [currentUser, contestId]);
  return (
    <div
      className="editContest_container"
      style={{
        height: "inherit",
      }}
    >
      <div className="dashboardContainer" style={{}}>
        <div className="lestPanel">
          <div className="contestDetailsPanel">
            <div className="card" style={{ height: "35vh" }}>
              <div className="titleContainer_updateProblem">
                <h2 className="createContestPage_title">Update contest </h2>
                <div>
                  <button
                    onClick={() => {
                      updateContest(false);
                    }}
                    className="btn confirmContestCreation"
                  >
                    Update
                  </button>

                  <div class="dropdown btn">
                    <button class="dropbtn">Options</button>
                    <div class="dropdown-content">
                      <a
                        href="#"
                        onClick={() => {
                          updateContest(true);
                        }}
                      >
                        Force Update
                      </a>
                      <a
                        href="#"
                        onClick={() => {
                          rejudgeAllProblems();
                        }}
                      >
                        Rejudge All Submissions
                      </a>
                      <a href="#">View Contest</a>
                      <a href="#">
                        {contestInfo.isPublished ? "Draft" : "Publish"} Contest
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="formContainer">
                <label htmlFor="title">Contest title:</label>
                <input
                  className="updateContestInput"
                  onChange={(e) => {
                    setContestInfo({ ...contestInfo, title: e.target.value });
                  }}
                  value={contestInfo.title}
                  type="text"
                  name="title"
                />

                <label htmlFor="code">Contest code:</label>
                <input
                  className="updateContestInput"
                  onChange={(e) => {
                    setContestInfo({ ...contestInfo, code: e.target.value });
                  }}
                  value={contestInfo.code}
                  type="text"
                  name="code"
                />

                <label htmlFor="start">Start Time:</label>
                <input
                  className="updateContestInput"
                  onChange={(e) => {
                    // if ((new Date()) * 1 < contestInfo.startTime)
                    setContestInfo({
                      ...contestInfo,
                      startTime: e.target.value,
                    });
                  }}
                  type="datetime-local"
                  name="start"
                  value={contestInfo.startTime}
                />

                <label htmlFor="end">End Time:</label>
                <input
                  className="updateContestInput"
                  onChange={(e) => {
                    setContestInfo({ ...contestInfo, endTime: e.target.value });
                  }}
                  type="datetime-local"
                  name="end"
                  value={contestInfo.endTime}
                />
              </div>
            </div>
          </div>
          <div className="problemsLabelPanel">
            <div className="card">
              <div className="titleContainer">
                <h3 className="createContestPage_title">Problems</h3>
                <button onClick={insertNewProblem} className="addProblemBtn">
                  <AddIcon />
                </button>
              </div>
              <div className="problemsContainer">
                {problemCount.map((problem, index) => {
                  return (
                    <div key={index} className="problemItem">
                      <div
                        onClick={() => {
                          if (problem.isDeleted) return;
                          setSelectedProblemForPreview(index);
                        }}
                        className={`problemLabel ${selectedProblemForPreview === index ? "selectedProblemForPreview" : ""}`}
                      >
                        {problem.title}
                      </div>
                      <div
                        onClick={() => {
                          trashUntrashProblemById(problem);
                        }}
                        className="deleteBtn"
                      >
                        {" "}
                        {problem.isAvailable == 1 && <DeleteIcon />}
                        {problem.isAvailable == 0 && <ReplayIcon />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="problemDetailsPanels">
          <div className="card" style={{ height: "inherit" }}>
            {problemCount.map((problem, index) => {
              if (!problem.isDeleted) {
                return (
                  <EditProblem
                    setProblemTitle={(title) => {
                      let problems = [...problemCount];
                      problems[index].title = title;
                      setProblemCount(problems);
                    }}
                    key={index}
                    problemNum={index}
                    contestId={contestId}
                    problemInfo={problem}
                    isFocused={index === selectedProblemForPreview}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
