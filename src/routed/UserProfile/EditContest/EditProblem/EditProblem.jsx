import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";
import ToastManager from "../../../../EventsManager/ToastManager";
import UpdateContestEventManager from "../../../../EventsManager/UpdateContestEventManager";
import ContestService from "../../../../services/Contest.service";
import SubmissionService from "../../../../services/Submission.service";
import UploadManager from "../../../../services/UploadManager";
import "./EditProblem.css";
function EditProblem({
  problemNum,
  isFocused,
  setProblemTitle,
  problemInfo,
  contestId,
}) {
  const problemStatementUploadRef = React.useRef(null);
  const problemCreationFormRef = React.useRef(null);
  const testcaseInputRef = React.useRef(null);
  const outputInputRef = React.useRef(null);
  const [mainFileContent, setMainFileContent] = React.useState({
    testcase: "",
    output: "",
    statement: "",
  });
  const [temFileContent, setTempFileContent] = React.useState({
    testcase: "",
    output: "",
    statement: "",
  });

  const [fileForPreview, setFileForPreview] = React.useState({
    file: null,
    label: "statement",
  });
  const [problem, setProblemInfo] = React.useState(problemInfo);

  React.useEffect(() => {
    setMainFileContent({
      ...mainFileContent,
      statement: problem.statementFileURL,
    });
    setTempFileContent({
      ...temFileContent,
      statement: problem.statementFileURL,
    });
    if (problem.id)
      ContestService.getProblemFiles(problemInfo.id).then(
        ({ testcase, output }) => {
          setTempFileContent({ ...temFileContent, testcase, output });
          setMainFileContent({ ...mainFileContent, testcase, output });
        },
      );

    UpdateContestEventManager.subscribe({
      id: "editProblem" + problemNum,
      onErrorCheking: async function () {
        //todo: error checking
        return { code: 1 };
      },
    });

    return () => {
      UpdateContestEventManager.unsubscribe("editProblem" + problemNum);
    };
  }, [problemNum, problem]);

  const submitData = async function () {
    if (problem.isNew) {
      await ContestService.addNewProblem({
        statementFile: await UploadManager.convertBlobToBase64(
          problemStatementUploadRef.current?.files[0],
        ),
        testcaseFileContent: await UploadManager.convertTextToBase64(
          testcaseInputRef.current?.value,
        ),
        outputFileContent: await UploadManager.convertTextToBase64(
          outputInputRef.current?.value,
        ),
        createdOn: new Date() * 1,
        ...problem,
      });
    } else {
      if (!problemStatementUploadRef.current.files[0]) {
        await ContestService.updateProblem({
          testcaseFileContent: await UploadManager.convertTextToBase64(
            testcaseInputRef.current?.value,
          ),
          outputFileContent: await UploadManager.convertTextToBase64(
            outputInputRef.current?.value,
          ),
          ...problem,
        });
      } else {
        await ContestService.updateProblem({
          statementFile: await UploadManager.convertBlobToBase64(
            problemStatementUploadRef.current?.files[0],
          ),
          testcaseFileContent: await UploadManager.convertTextToBase64(
            testcaseInputRef.current?.value,
          ),
          outputFileContent: await UploadManager.convertTextToBase64(
            outputInputRef.current?.value,
          ),
          ...problem,
        });
      }
    }
  };

  function rejudgeSubmissionsOfThisProblem() {
    SubmissionService.rejudgeContestSubmissions(contestId, problem.id).then(
      () => {
        ToastManager.showSuccess("Rejudged Successfully!");
      },
    );
  }

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @returns
   */
  function onfileChange(event, fileName) {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    return URL.createObjectURL(fileObj);
  }

  function showPreview() {
    let file = problem.statementFileURL;

    if (fileForPreview.label.toLowerCase() === "statement") {
      if (problemStatementUploadRef.current?.files[0]) {
        file = URL.createObjectURL(problemStatementUploadRef.current?.files[0]);
      } else if (!problem.isNew) file = problem.statementFileURL;
    }

    return (
      <>
        <textarea
          style={{
            height: "50vh",
            width: "100%",
            display: `${fileForPreview.label.toLowerCase() === "output" ? "block" : "none"}`,
          }}
          name=""
          id=""
          ref={outputInputRef}
          cols="30"
          rows="10"
          onChange={(e) => {
            setTempFileContent({ ...temFileContent, output: e.target.value });
          }}
          value={temFileContent.output}
        ></textarea>
        <textarea
          style={{
            height: "50vh",
            width: "100%",
            display: `${fileForPreview.label.toLowerCase() === "testcase" ? "block" : "none"}`,
          }}
          name=""
          id=""
          ref={testcaseInputRef}
          cols="30"
          rows="10"
          onChange={(e) => {
            setTempFileContent({ ...temFileContent, testcase: e.target.value });
          }}
          value={temFileContent.testcase}
        ></textarea>
        <iframe
          style={{
            height: "50vh",
            width: "100%",
            display: `${fileForPreview.label.toLowerCase() === "statement" ? "block" : "none"}`,
          }}
          src={file}
          title="Problem statement"
          frameBorder="1"
        ></iframe>
      </>
    );
  }

  return (
    <div
      style={{
        display: `${isFocused ? "block" : "none"}`,
      }}
    >
      <div ref={problemCreationFormRef} className="createProblem">
        <div className="createProblemlableContainer">
          <div className="textInputContainer">
            <label htmlFor="contestTitle">Title </label>
            <input
              className="createContestInput"
              autoComplete="off"
              value={problem.title}
              onChange={(e) => {
                setProblemInfo({ ...problem, title: e.target.value });
                setProblemTitle(e.target.value);
              }}
              type="text"
              name="contestTitle"
            />
          </div>
          <div className="textInputContainer">
            <label htmlFor="contestTitle">Points </label>
            <input
              placeholder="x100"
              className="createContestInput"
              autoComplete="off"
              value={problem.points}
              onChange={(e) => {
                setProblemInfo({ ...problem, points: e.target.value });
              }}
              type="text"
              name="contestTitle"
            />
          </div>
          <div className="textInputContainer">
            <label htmlFor="contestTitle">Code </label>
            <input
              placeholder="Code"
              className="createContestInput"
              autoComplete="off"
              value={problem.code}
              onChange={(e) => {
                setProblemInfo({ ...problem, code: e.target.value });
              }}
              type="text"
              name="contestTitle"
            />
          </div>
        </div>
        <div className="uplodsContainer">
          <div className="uploadBtnContainer">
            <button
              className={`previewBtn ${fileForPreview.label === "statement" ? "previewing" : ""} `}
              onClick={(e) => {
                setFileForPreview({ label: "statement" });
              }}
            >
              Problem statement
            </button>
            <div
              onClick={() => {
                problemStatementUploadRef.current.value = null;

                problemStatementUploadRef.current.click();
              }}
              className="uploadbtn"
            >
              <CloudUploadIcon />
            </div>
            <input
              style={{ display: "none" }}
              onChange={(e) => {
                let fileURL = onfileChange(e, "Statement.pdf");

                setFileForPreview({ label: "statement", file: fileURL });
              }}
              type="file"
              name=""
              ref={problemStatementUploadRef}
            />
          </div>
          <div className="uploadBtnContainer">
            <button
              onClick={() => {
                setFileForPreview({ label: "Testcase" });
              }}
              className={`previewBtn ${fileForPreview.label === "Testcase" ? "previewing" : ""} `}
            >
              Test Inputs
            </button>
          </div>
          <div className="uploadBtnContainer">
            <button
              onClick={() => {
                setFileForPreview({ label: "Output" });
              }}
              className={`previewBtn ${fileForPreview.label === "Output" ? "previewing" : ""} `}
            >
              Test Outputs
            </button>
          </div>
          <div className="uploadBtnContainer">
            <button
              onClick={() => {
                problemStatementUploadRef.current.value = null;

                setTempFileContent({ ...mainFileContent });
              }}
              className={`previewBtn`}
            >
              Reset
            </button>
          </div>
          <div className="uploadBtnContainer">
            <button
              onClick={() => {
                submitData();
              }}
              className={`previewBtn`}
            >
              Save
            </button>
          </div>
          {!problem.isNew && (
            <div className="uploadBtnContainer">
              <button
                onClick={() => {
                  rejudgeSubmissionsOfThisProblem();
                }}
                className={`previewBtn`}
              >
                Rejudge Submissions
              </button>
            </div>
          )}
        </div>
        <div className="previewContainer">
          <h3>Preview</h3>
          <div className="preview">{showPreview()}</div>
        </div>
      </div>
    </div>
  );
}

export default EditProblem;
