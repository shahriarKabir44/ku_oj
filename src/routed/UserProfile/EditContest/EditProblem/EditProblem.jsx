import React from 'react';
import ContestCreationEventManager from '../../../../EventsManager/ContestCreationEventManager';
import ContestService from '../../../../services/Contest.service';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './EditProblem.css'
function EditProblem({ problemNum, isFocused, setProblemTitle, problemInfo }) {
    const problemStatementUploadRef = React.useRef(null)
    const problemCreationFormRef = React.useRef(null)
    const [statementFileURL, setStatementFileURL] = React.useState(problemInfo.statementFileURL)
    const [mainFileContent, setMainFileContent] = React.useState({
        testcase: "",
        output: "",
        statement: ""
    })
    const [tempFileContent, setTempFileContent] = React.useState({
        testcase: "",
        output: "",
        statement: ""
    })
    const [contentPreviewType, setContentPreviewType] = React.useState({
        testcase: 0,
        output: 0
    })
    const [fileForPreview, setFileForPreview] = React.useState({
        file: null,
        label: ""
    })
    const [problem, setProblemInfo] = React.useState(structuredClone(problemInfo))
    React.useEffect(() => {
        // ContestCreationEventManager.subscribe({
        //     id: problemNum,
        //     onMessage: (contestId) => {
        //         return ContestService.createProblem({ ...problemInfo, contestId })


        //     }
        // })
        setTempFileContent({ ...tempFileContent, statement: problem.statementFileURL })
        setMainFileContent({ ...mainFileContent, statement: problem.statementFileURL })

        ContestService.getProblemFiles(problemInfo.id)
            .then(({ testcase, output }) => {
                setTempFileContent({ ...tempFileContent, testcase, output })
                setMainFileContent({ ...mainFileContent, testcase, output })
            })
        return () => {
            // ContestCreationEventManager.unsubscribe(problemNum)
        }
    }, [problemNum, problemInfo])





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
            return <iframe style={{
                height: "50vh",
                width: "100%"
            }} src={tempFileContent.statement} title='Problem statement' frameBorder="1" ></iframe >
        }

        if (fileForPreview.label.toLowerCase() === 'testcase') {
            return <div className="originalTestcaseView">
                <textarea style={{
                    height: "50vh",
                    width: "100%"
                }} name="" onChange={(e) => {
                    setTempFileContent({ testcase: e.target.value })
                }} cols="30" rows="10" value={tempFileContent.testcase} ></textarea>

            </div>

        }
        if (fileForPreview.label.toLowerCase() === 'output') {
            return <div className="originalTestcaseView">
                <textarea style={{
                    height: "50vh",
                    width: "100%"
                }} name="" id="" cols="30" rows="10" onChange={(e) => {
                    setTempFileContent({ output: e.target.value })
                }} value={tempFileContent.output} ></textarea>

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
                            problemStatementUploadRef.current.click()
                        }} className="uploadbtn"><CloudUploadIcon /></div>
                        <input style={{ display: "none" }}
                            onChange={e => {
                                let fileURL = onfileChange(e, "Statement.pdf")
                                console.log(fileURL)
                                setTempFileContent({ ...tempFileContent, statement: fileURL })
                                setFileForPreview({ file: fileURL, label: "statement" })

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
                            setTempFileContent({ ...mainFileContent })
                            setStatementFileURL(problemInfo.statementFileURL)
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