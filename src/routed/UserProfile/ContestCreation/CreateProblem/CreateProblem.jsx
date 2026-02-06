import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";
import ContestCreationEventManager from "../../../../EventsManager/ContestCreationEventManager";
import ContestService from "../../../../services/Contest.service";
import UploadManager from "../../../../services/UploadManager";
import "./CreateProblem.css";
function CreateProblem({ problemNum, isFocused, setProblemTitle }) {
  const problemStatementUploadRef = React.useRef(null);
  const testcaseInputRef = React.useRef(null);
  const outputInputRef = React.useRef(null);
  const problemCreationFormRef = React.useRef(null);

  const [fileForPreview, setFileForPreview] = React.useState({
    file: null,
    label: "",
  });
  const [problemInfo, setProblemInfo] = React.useState({
    statementFileURL: "",
    testcaseFileURL: "",
    outputFileURL: "",
    title: "",
    points: "",
    contestId: 0,
    authorId: 1,
    code: "",
  });
  React.useEffect(() => {
    ContestCreationEventManager.subscribe({
      id: problemNum,
      submitData: async (contestInfo) => {
        return ContestService.addNewProblem({
          statementFile: await UploadManager.convertBlobToBase64(
            problemStatementUploadRef.current?.files[0],
          ),
          testcaseFileContent: await UploadManager.convertTextToBase64(
            testcaseInputRef.current?.value,
          ),
          outputFileContent: await UploadManager.convertTextToBase64(
            outputInputRef.current?.value,
          ),
          contestId: contestInfo.id,
          createdOn: contestInfo.startTime,
          code: problemInfo.code,
          title: problemInfo.title,
          points: problemInfo.points,
        });
      },
      onErrorCheking: async (contestId) => {
        return {
          status: 1,
          errorMessage: "",
        };
      },
    });
    return () => {
      ContestCreationEventManager.unsubscribe(problemNum);
    };
  }, [problemNum, problemInfo]);

  function isValidFileType(file) {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ];
    return allowedTypes.includes(file.type);
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

    const MAX_BYTES = 50 * 1024 * 1024;
    if (fileObj.size > MAX_BYTES) {
      alert("File too large (max 10MB)");
      event.target.value = "";
      return;
    }

    // Validate file type
    if (!isValidFileType(fileObj)) {
      alert(
        "Only PDF and image files (JPEG, PNG, GIF, SVG, WebP) are allowed.",
      );
      event.target.value = ""; // Clear the input
      return;
    }

    return URL.createObjectURL(fileObj);
  }

  function showPreview() {
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
        ></textarea>
        <iframe
          style={{
            height: "50vh",
            width: "100%",
            display: `${fileForPreview.label.toLowerCase() === "statement" ? "block" : "none"}`,
          }}
          src={fileForPreview.file}
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
              value={problemInfo.title}
              onChange={(e) => {
                setProblemInfo({ ...problemInfo, title: e.target.value });
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
              value={problemInfo.points}
              onChange={(e) => {
                setProblemInfo({ ...problemInfo, points: e.target.value });
              }}
              type="number"
              name="contestTitle"
            />
          </div>
          <div className="textInputContainer">
            <label htmlFor="contestTitle">Code </label>
            <input
              placeholder="Code"
              className="createContestInput"
              autoComplete="off"
              value={problemInfo.code}
              onChange={(e) => {
                setProblemInfo({ ...problemInfo, code: e.target.value });
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
                setFileForPreview({
                  file: problemInfo.statementFileURL,
                  label: "statement",
                });
              }}
            >
              Problem statement
            </button>

            <div
              onClick={() => {
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
                if (fileURL) {
                  setFileForPreview({ file: fileURL, label: "statement" });
                  setProblemInfo({ ...problemInfo, statementFileURL: fileURL });
                }
              }}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.gif,.svg,.webp,image/*,application/pdf"
              name=""
              ref={problemStatementUploadRef}
            />
          </div>
          <div className="uploadBtnContainer">
            <button
              onClick={() => {
                setFileForPreview({
                  file: problemInfo.testcaseFileURL,
                  label: "Testcase",
                });
              }}
              className={`previewBtn ${fileForPreview.label === "Testcase" ? "previewing" : ""} `}
            >
              Test Inputs
            </button>
          </div>
          <div className="uploadBtnContainer">
            <button
              onClick={() => {
                setFileForPreview({
                  file: problemInfo.outputFileURL,
                  label: "Output",
                });
              }}
              className={`previewBtn ${fileForPreview.label === "Output" ? "previewing" : ""} `}
            >
              Test Outputs
            </button>
          </div>
        </div>
        <div className="previewContainer">
          <h3>Preview</h3>
          {showPreview()}
        </div>
      </div>
    </div>
  );
}

export default CreateProblem;
