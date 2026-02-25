import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
  const problemStatementUploadRef = React.useRef(null);
  const problemCreationFormRef = React.useRef(null);
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
	setMainFileContent((prev) => ({
	  ...prev,
	  statement: problem.statementFileURL,
	}));
	setTempFileContent((prev) => ({
	  ...prev,
	  statement: problem.statementFileURL,
	}));
	if (problem.id)
	  ContestService.getProblemFiles(problemInfo.id).then(
		(data) => {
		  if (data == null) {
			return;
		  }
		  let { testcases } = data.data;
		  if (!testcases || testcases.length === 0) {
			testcases = [{ input: "", output: "" }];
		  }
		  setTempFileContent((prev) => ({ ...prev, testcases }));
		  setMainFileContent((prev) => ({ ...prev, testcases }));
		  setSelectedTestcaseIndex(0);
		},
	  );

	

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

			let statementFile = await UploadManager.convertBlobToBase64(
				problemStatementUploadRef.current?.files[0],
			);

			if (problem.isNew) {
				if (statementFile == null) {
					ToastManager.showError("Statement File Is Invalid!");
					return;
				}
				await ContestService.addNewProblem({
					statementFile,
					testcaseFiles,
					createdOn: new Date() * 1,
					...problem,
				}).then(() => {
					ToastManager.showSuccess("Problem updated successfully!");
				});
			} else {
				if (!problemStatementUploadRef.current.files[0]) {
					await ContestService.updateProblem({
						testcaseFiles,
						...problem,
					}).then(() => {
						ToastManager.showSuccess("Problem updated successfully!");
					});
				} else {
					if (statementFile == null) {
					ToastManager.showError("Statement File Is Invalid!");
					return;
				}
					await ContestService.updateProblem({
						statementFile,
						testcaseFiles,
						...problem,
					}).then(() => {
						ToastManager.showSuccess("Problem updated successfully!");
					});
				}
			}
		} catch (error) {
			
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
		  cols="30"
		  rows="10"
		  onChange={(e) => {
			let updated = [...temFileContent.testcases];
			updated[selectedTestcaseIndex] = { ...updated[selectedTestcaseIndex], output: e.target.value };
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
			updated[selectedTestcaseIndex] = { ...updated[selectedTestcaseIndex], input: e.target.value };
			setTempFileContent({ ...temFileContent, testcases: updated });
		  }}
		  value={temFileContent.testcases[selectedTestcaseIndex]?.input || ""}
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
		  <div className="uploadBtnContainer" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
			<label style={{ fontSize: "12px" }}>TC#</label>
			<select
			  value={selectedTestcaseIndex}
			  onChange={(e) => setSelectedTestcaseIndex(Number(e.target.value))}
			  style={{ padding: "4px" }}
			>
			  {temFileContent.testcases.map((_, i) => (
				<option key={i} value={i}>{i + 1}</option>
			  ))}
			</select>
			<button
			  className="previewBtn"
			  onClick={() => {
				let updated = [...temFileContent.testcases, { input: "", output: "" }];
				setTempFileContent({ ...temFileContent, testcases: updated });
				setSelectedTestcaseIndex(updated.length - 1);
			  }}
			  title="Add testcase"
			>
			  +
			</button>
			<button
			  className="previewBtn"
			  onClick={() => {
				if (temFileContent.testcases.length <= 1) return;
				let updated = temFileContent.testcases.filter((_, i) => i !== selectedTestcaseIndex);
				setTempFileContent({ ...temFileContent, testcases: updated });
				setSelectedTestcaseIndex(Math.min(selectedTestcaseIndex, updated.length - 1));
			  }}
			  title="Remove current testcase"
			>
			  -
			</button>
		  </div>
		  <div className="uploadBtnContainer">
			<button
			  onClick={() => {
				problemStatementUploadRef.current.value = null;

				setTempFileContent({ ...mainFileContent, testcases: mainFileContent.testcases.map(tc => ({ ...tc })) });
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
		<div className="previewContainer">
		  <h3>Preview</h3>
		  <div className="preview">{showPreview()}</div>
		</div>
	  </div>
	</div>
  );
}

export default EditProblem;
