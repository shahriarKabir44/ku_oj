import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import ToastManager from "../../../../EventsManager/ToastManager";
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
   const problemCreationFormRef = React.useRef(null);

  
  
  const [tempstatementText,setTempstatementText]=React.useState('')
  const [statementText,setstatementText]=React.useState('')

  const [mainFileContent, setMainFileContent] = React.useState({
    testcases: [{ input: "", output: "" }],
    statement: "",
  });
  const [temFileContent, setTempFileContent] = React.useState({
    testcases: [{ input: "", output: "" }],
    statement: "",
  });
  const [selectedTestcaseIndex, setSelectedTestcaseIndex] = React.useState(0);

  const [fileForPreview, setFileForPreview] = React.useState({
    file: null,
    label: "statement",
  });
  const [problem, setProblemInfo] = React.useState(problemInfo);

  React.useEffect(() => {
    // setMainFileContent((prev) => ({
    //   ...prev,
    //   statement: problem.statementFileURL,
    // }));
    // setTempFileContent((prev) => ({
    //   ...prev,
    //   statement: problem.statementFileURL,
    // }));
    if (problem.id)
      ContestService.getProblemFiles(problem.id).then((data) => {
        if (data == null) {
          return;
        }
        let { testcases  } = data.data;
        setTempstatementText( problem. statementText);
        setstatementText(problem. statementText);
        if (!testcases || testcases.length === 0) {
          testcases = [{ input: "", output: "" }];
        }
        setTempFileContent((prev) => ({ ...prev, testcases }));
        setMainFileContent((prev) => ({ ...prev, testcases }));
        setSelectedTestcaseIndex(0);
      });

    return () => {
      // UpdateContestEventManager.unsubscribe("editProblem" + problemNum);
    };
  }, [problemNum, problem]);

  const submitData = async function () {
    try {
      let testcaseFiles = [];
        for (let i = 0; i < temFileContent.testcases.length; i++) {
        let tc = temFileContent.testcases[i];
        let input = await UploadManager.convertTextToBase64(tc.input);
        let output = await UploadManager.convertTextToBase64(tc.output);
        if (!input) {
          ToastManager.showError(`Testcase ${i + 1} Input Is Invalid!`);
          return;
        }
        if (!output) {
          ToastManager.showError(`Testcase ${i + 1} Output Is Invalid!`);
          return;
        }
        testcaseFiles.push({ input, output });
      }
      if (tempstatementText.length < 4) {
          ToastManager.showError(`Problem Statement Is Invalid!`);
          return;
      }

      problem.statementText = tempstatementText;

      if (problem.isNew) {
        await ContestService.addNewProblem({
           testcaseFiles,
          createdOn: new Date() * 1,
          ...problem,
        }).then((problemId) => {
          setProblemInfo({ ...problem, id: problemId, isNew: false });
          ToastManager.showSuccess("Problem updated successfully!");
        });
      } else {
          
           
          await ContestService.updateProblem({
             testcaseFiles,
            ...problem,
          }).then(() => {
            ToastManager.showSuccess("Problem updated successfully!");
          });
        
      }
    } catch (error) {}
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
  

  function showPreview() {
    // let file = problem.statementFileURL;

    // if (fileForPreview.label.toLowerCase() === "statement") {
    //   if (problemStatementUploadRef.current?.files[0]) {
    //     file = URL.createObjectURL(problemStatementUploadRef.current?.files[0]);
    //   } else if (!problem.isNew) file = problem.statementFileURL;
    // }

    return (
      <>
        
         <textarea
          style={{
            height: "50vh",
            width: "100%",
            display: `${fileForPreview.label.toLowerCase() === "statement" ? "block" : "none"}`,
          }}
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(e) => {
            setTempstatementText(e.target.value);
          }}
          value={tempstatementText}
        ></textarea>
        <textarea
          style={{
            height: "50vh",
            width: "100%",
            display: `${fileForPreview.label.toLowerCase() === "output" ? "block" : "none"}`,
          }}
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(e) => {
            let updated = [...temFileContent.testcases];
            updated[selectedTestcaseIndex] = {
              ...updated[selectedTestcaseIndex],
              output: e.target.value,
            };
            setTempFileContent({ ...temFileContent, testcases: updated });
          }}
          value={temFileContent.testcases[selectedTestcaseIndex]?.output || ""}
        ></textarea>
        <textarea
          style={{
            height: "50vh",
            width: "100%",
            display: `${fileForPreview.label.toLowerCase() === "testcase" ? "block" : "none"}`,
          }}
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(e) => {
            let updated = [...temFileContent.testcases];
            updated[selectedTestcaseIndex] = {
              ...updated[selectedTestcaseIndex],
              input: e.target.value,
            };
            setTempFileContent({ ...temFileContent, testcases: updated });
          }}
          value={temFileContent.testcases[selectedTestcaseIndex]?.input || ""}
        ></textarea>
         
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
            {/* <div
              onClick={() => {
                problemStatementUploadRef.current.value = null;

                problemStatementUploadRef.current.click();
              }}
              className="uploadbtn"
            >
              <CloudUploadIcon />
            </div> */}
            {/* <input
              style={{ display: "none" }}
              onChange={(e) => {
                let fileURL = onfileChange(e, "Statement.pdf");

                setFileForPreview({ label: "statement", file: fileURL });
              }}
              type="file"
              name=""
              ref={problemStatementUploadRef}
            /> */}
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
                 setTempstatementText(statementText);
                setTempFileContent({
                  ...mainFileContent,
                  testcases: mainFileContent.testcases.map((tc) => ({ ...tc })),
                });
                setSelectedTestcaseIndex(0);
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
        <div style={{ display: "flex", gap: "8px" }}>
          <div className="testcaseListSidebar">
            <div className="testcaseListHeader">
              <span>Test Inputs</span>
              <button
                className="testcaseAddBtn"
                onClick={() => {
                  let updated = [
                    ...temFileContent.testcases,
                    { input: "", output: "" },
                  ];
                  setTempFileContent({ ...temFileContent, testcases: updated });
                  setSelectedTestcaseIndex(updated.length - 1);
                }}
                title="Add testcase"
              >
                <AddIcon fontSize="small" />
              </button>
            </div>
            {temFileContent.testcases.map((_, i) => (
              <div
                key={i}
                className={`testcaseListItem ${selectedTestcaseIndex === i ? "testcaseListItemSelected" : ""}`}
                onClick={() => setSelectedTestcaseIndex(i)}
              >
                <span>Test Case {i + 1}</span>
                <button
                  className="testcaseDeleteBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (temFileContent.testcases.length <= 1) return;
                    let updated = temFileContent.testcases.filter(
                      (_, idx) => idx !== i,
                    );
                    setTempFileContent({
                      ...temFileContent,
                      testcases: updated,
                    });
                    setSelectedTestcaseIndex(
                      Math.min(selectedTestcaseIndex, updated.length - 1),
                    );
                  }}
                  title="Remove testcase"
                >
                  <DeleteIcon fontSize="small" />
                </button>
              </div>
            ))}
          </div>
          <div className="previewContainer" style={{ flex: 1 }}>
            <h3>Preview</h3>
            <div className="preview">{showPreview()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProblem;
