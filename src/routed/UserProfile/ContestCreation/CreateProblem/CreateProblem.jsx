import React from 'react';
import ContestCreationEventManager from '../../../../EventsManager/ContestCreationEventManager';
import ContestService from '../../../../services/Contest.service';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './CreateProblem.css'
function CreateProblem({ problemNum, isFocused, setProblemTitle }) {
    const problemStatementUploadRef = React.useRef(null)
    const testcaseUploadRef = React.useRef(null)
    const outputUploadRef = React.useRef(null)

    const problemCreationFormRef = React.useRef(null)

    const [fileForPreview, setFileForPreview] = React.useState({
        file: null,
        label: ""
    })
    const [problemInfo, setProblemInfo] = React.useState({
        statementFileURL: "",
        testcaseFileURL: "",
        outputFileURL: "",
        title: "",
        points: '',
        contestId: 0,
        authorId: 1,
    })
    React.useEffect(() => {
        ContestCreationEventManager.subscribe({
            id: problemNum,
            onMessage: (contestId) => {
                return ContestService.createProblem({ ...problemInfo, contestId })
            },
            onErrorCheking: async(contestId)=>{
                
            }
        })
        return () => {
            ContestCreationEventManager.unsubscribe(problemNum)
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
    return (
        <div style={{
            display: `${isFocused ? 'block' : 'none'}`
        }}>
            <div ref={problemCreationFormRef} className='createProblem' >
                <div className="createProblemlableContainer">
                    <div className='textInputContainer'><label htmlFor="contestTitle">Title </label>
                        <input className='createContestInput' autoComplete='off' value={problemInfo.title} onChange={e => {
                            setProblemInfo({ ...problemInfo, title: e.target.value })
                            setProblemTitle(e.target.value)
                        }} type="text" name="contestTitle" /></div>
                    <div className='textInputContainer'>
                        <label htmlFor="contestTitle">Points </label>
                        <input placeholder='x100' className='createContestInput' autoComplete='off' value={problemInfo.points} onChange={e => {
                            setProblemInfo({ ...problemInfo, points: e.target.value })

                        }} type="text" name="contestTitle" />
                    </div>
                    <div className='textInputContainer'>
                        <label htmlFor="contestTitle">Code </label>
                        <input placeholder='Code' className='createContestInput' autoComplete='off' value={problemInfo.code} onChange={e => {
                            setProblemInfo({ ...problemInfo, code: e.target.value })

                        }} type="text" name="contestTitle" />
                    </div>

                </div>
                <div className="uplodsContainer">
                    <div className="uploadBtnContainer">
                        <button className={`previewBtn ${fileForPreview.label === 'statement' ? "previewing" : ""} `} onClick={(e) => {
                            console.log(problemInfo.statementFileURL)
                            setFileForPreview({ file: problemInfo.statementFileURL, label: "statement" })
                        }} >Problem statement</button>
                        <div onClick={() => {
                            problemStatementUploadRef.current.click()
                        }} className="uploadbtn"><CloudUploadIcon /></div>
                        <input style={{ display: "none" }}
                            onChange={e => {
                                let fileURL = onfileChange(e, "Statement.pdf")
                                console.log(fileURL)
                                setFileForPreview({ file: fileURL, label: "statement" })

                                setProblemInfo({ ...problemInfo, statementFileURL: fileURL })
                            }}
                            type="file" name="" ref={problemStatementUploadRef} />
                    </div>
                    <div className="uploadBtnContainer">
                        <button onClick={() => {
                            setFileForPreview({ file: problemInfo.testcaseFileURL, label: "Testcase" })
                        }} className={`previewBtn ${fileForPreview.label === 'Testcase' ? "previewing" : ""} `}>Test Inputs</button>
                        <div onClick={() => {
                            testcaseUploadRef.current.click()
                        }} className="uploadbtn"><CloudUploadIcon /></div>
                        <input style={{ display: "none" }}
                            onChange={e => {
                                let fileURL = onfileChange(e, "Testcase.txt")
                                setFileForPreview({ file: fileURL, label: "Testcase" })

                                setProblemInfo({ ...problemInfo, testcaseFileURL: fileURL })
                            }}
                            type="file" name="" ref={testcaseUploadRef} />


                    </div>
                    <div className="uploadBtnContainer">
                        <button onClick={() => {
                            setFileForPreview({ file: problemInfo.outputFileURL, label: "Output" })
                        }} className={`previewBtn ${fileForPreview.label === 'Output' ? "previewing" : ""} `}>Test Outputs</button>
                        <div onClick={() => {
                            outputUploadRef.current.click()
                        }} className="uploadbtn"><CloudUploadIcon /></div>
                        <input style={{ display: "none" }}
                            onChange={e => {
                                let fileURL = onfileChange(e, "Testcase.txt")
                                setFileForPreview({ file: fileURL, label: "Output" })

                                setProblemInfo({ ...problemInfo, outputFileURL: fileURL })
                            }}
                            type="file" name="" ref={outputUploadRef} />
                    </div>
                </div>
                <div className="previewContainer">
                    <h3>Preview</h3>
                    <div className="preview">
                        {fileForPreview.file !== null &&
                            <iframe style={{
                                height: "50vh",
                                width: "100%"
                            }} src={fileForPreview.file} title='Problem statement' frameBorder="1"></iframe>
                        }
                    </div>
                </div>


            </div>
        </div>
    );
}

export default CreateProblem;