import React from 'react';
import ContestService from '../../../../services/Contest.service';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './EditProblem.css'
import UpdateContestEventManager from '../../../../EventsManager/UpdateContestEventManager';
function EditProblem({ problemNum, isFocused, setProblemTitle, problemInfo }) {
    const problemStatementUploadRef = React.useRef(null)
    const problemCreationFormRef = React.useRef(null)
    const testcaseInputRef = React.useRef(null)
    const outputInputRef = React.useRef(null)
    const [mainFileContent, setMainFileContent] = React.useState({
        testcase: "",
        output: "",
        statement: ""
    })
    const [temFileContent, setTempFileContent] = React.useState({
        testcase: "",
        output: "",
        statement: ""
    })


    const [fileForPreview, setFileForPreview] = React.useState({
        file: null,
        label: "statement"
    })
    const [problem, setProblemInfo] = React.useState((problemInfo))
    React.useEffect(() => {
        setMainFileContent({ ...mainFileContent, statement: problem.statementFileURL })
        setTempFileContent({ ...temFileContent, statement: problem.statementFileURL })
        if (problem.id)
            ContestService.getProblemFiles(problemInfo.id)
                .then(({ testcase, output }) => {
                    setTempFileContent({ ...temFileContent, testcase, output })
                    setMainFileContent({ ...mainFileContent, testcase, output })
                })

        UpdateContestEventManager.subscribe({
            id: "editProblem" + problemNum,
            onErrorCheking: async function () {

                return { code: 1 }
            },
            submitData: async function () {
                if (problem.isNew) {
                    // await ContestService.addNewProblem({
                    //     statementFileURL: problem.statementFileURL,
                    //     testcaseFileURL: convertContentsToBlob(testcaseInputRef.current?.value),
                    //     outputFileURL: convertContentsToBlob(outputInputRef.current?.value),
                    //     ...problem
                    // })

                    return 1
                }
            }
        })

        return () => {
            UpdateContestEventManager.unsubscribe("editProblem" + problemNum,)
        }
    }, [problemNum, problem])


    function convertContentsToBlob(content) {
        let newFile = new File([content], 'abcd,txt', { type: 'text/plain' })
        return new Blob([newFile], { type: 'text/plain' })
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
        return (URL.createObjectURL(fileObj))
    }

    function showPreview() {
        if (fileForPreview.label.toLowerCase() === 'statement') {
            let file = problem.statementFileURL
            if (problemStatementUploadRef.current?.files[0]) {
                file = URL.createObjectURL(problemStatementUploadRef.current?.files[0])
            }
            else if (!problem.isNew)
                file = problem.statementFileURL
            return <iframe style={{
                height: "50vh",
                width: "100%"
            }} src={file} title='Problem statement' frameBorder="1" ></iframe >
        }

        if (fileForPreview.label.toLowerCase() === 'testcase') {
            return <div className="originalTestcaseView">
                <textarea style={{
                    height: "50vh",
                    width: "100%"
                }} name="" ref={testcaseInputRef} onChange={(e) => {
                    setTempFileContent({ ...temFileContent, testcase: e.target.value })
                }} cols="30" rows="10" value={temFileContent.testcase} ></textarea>

            </div>

        }
        if (fileForPreview.label.toLowerCase() === 'output') {
            return <div className="originalTestcaseView">
                <textarea style={{
                    height: "50vh",
                    width: "100%"
                }} name="" id="" ref={outputInputRef} cols="30" rows="10" onChange={(e) => {
                    setTempFileContent({ ...temFileContent, output: e.target.value })

                }} value={temFileContent.output} ></textarea>

            </div>

        }
    }

    return (
        <div style={{
            display: `${isFocused ? 'block' : 'none'}`
        }}>
            <div ref={problemCreationFormRef} className='createProblem' >
                <div className="createProblemlableContainer">
                    <div className='textInputContainer'><label htmlFor="contestTitle">Title </label>
                        <input className='createContestInput' autoComplete='off' value={problem.title} onChange={e => {
                            setProblemInfo({ ...problem, title: e.target.value })
                            setProblemTitle(e.target.value)
                        }} type="text" name="contestTitle" /></div>
                    <div className='textInputContainer'>
                        <label htmlFor="contestTitle">Points </label>
                        <input placeholder='x100' className='createContestInput' autoComplete='off' value={problem.points} onChange={e => {
                            setProblemInfo({ ...problem, points: e.target.value })

                        }} type="text" name="contestTitle" />
                    </div>
                    <div className='textInputContainer'>
                        <label htmlFor="contestTitle">Code </label>
                        <input placeholder='Code' className='createContestInput' autoComplete='off' value={problem.code} onChange={e => {
                            setProblemInfo({ ...problem, code: e.target.value })

                        }} type="text" name="contestTitle" />
                    </div>

                </div>
                <div className="uplodsContainer">
                    <div className="uploadBtnContainer">
                        <button className={`previewBtn ${fileForPreview.label === 'statement' ? "previewing" : ""} `} onClick={(e) => {
                            setFileForPreview({ label: "statement" })
                        }} >Problem statement</button>
                        <div onClick={() => {
                            problemStatementUploadRef.current.value = null

                            problemStatementUploadRef.current.click()
                        }} className="uploadbtn"><CloudUploadIcon /></div>
                        <input style={{ display: "none" }}
                            onChange={e => {
                                let fileURL = onfileChange(e, "Statement.pdf")


                                setFileForPreview({ label: "statement", file: fileURL })
                            }}
                            type="file" name="" ref={problemStatementUploadRef} />
                    </div>
                    <div className="uploadBtnContainer">
                        <button onClick={() => {
                            setFileForPreview({ label: "Testcase" })
                        }} className={`previewBtn ${fileForPreview.label === 'Testcase' ? "previewing" : ""} `}>Test Inputs</button>

                    </div>
                    <div className="uploadBtnContainer">
                        <button onClick={() => {
                            setFileForPreview({ label: "Output" })
                        }} className={`previewBtn ${fileForPreview.label === 'Output' ? "previewing" : ""} `}>Test Outputs</button>

                    </div>
                    <div className="uploadBtnContainer">
                        <button onClick={() => {
                            problemStatementUploadRef.current.value = null

                            setTempFileContent({ ...mainFileContent })
                        }} className={`previewBtn`}>Reset</button>

                    </div>
                </div>
                <div className="previewContainer">
                    <h3>Preview</h3>
                    <div className="preview">

                        {showPreview()}

                    </div>
                </div>


            </div>
        </div>
    );
}

export default EditProblem;