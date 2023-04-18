import React from 'react';
import EventSubscriptionManager from '../../EventsManager/EventSubscriptionManager';
import ContestService from '../../services/Contest.service';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './CreateProblem.css'
function CreateProblem({ problemNum }) {
    const problemStatementUploadRef = React.useRef(null)
    const testcaseUploadRef = React.useRef(null)
    const outputUploadRef = React.useRef(null)



    const [fileForPreview, setFileForPreview] = React.useState({
        file: null,
        label: ""
    })
    const [problemInfo, setProblemInfo] = React.useState({
        statementFileURL: "",
        testcaseFileURL: "",
        outputFileURL: "",
        title: "",
        point: 0,
        contestId: 0,
        authorId: 1,
    })
    React.useEffect(() => {
        EventSubscriptionManager.subscribe({
            id: problemNum,
            onMessage: ({ contestId }) => {


                ContestService.createProblem({ ...problemInfo, contestId: contestId })
                    .then(data => {
                    })
            }
        })
        return () => {
            EventSubscriptionManager.unsubscribe(problemNum)
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

        }}>
            <div className='createProble' >
                <div className="lableContainer">
                    <label htmlFor="contestTitle">Title</label>
                    <input value={problemInfo.title} onChange={e => {
                        setProblemInfo({ ...problemInfo, title: e.target.value })

                    }} type="text" name="contestTitle" />

                </div>
                <div className="uplodsContainer">
                    <div className="uploadBtnContainer">
                        <button className="previewBtn" onClick={(e) => {
                            e.preventDefault()
                            setFileForPreview(problemInfo.statementFileURL)
                        }} >Problem statement</button>
                        <div onClick={() => {
                            problemStatementUploadRef.current.click()
                        }} className="uploadbtn"><CloudUploadIcon /></div>
                        <input style={{ display: "none" }}
                            onChange={e => {
                                let fileURL = onfileChange(e, "Statement.pdf")
                                console.log(fileURL)
                                setFileForPreview(fileURL)

                                setProblemInfo({ ...problemInfo, statementFileURL: fileURL })
                            }}
                            type="file" name="" ref={problemStatementUploadRef} />
                    </div>
                    <div className="uploadBtnContainer">
                        <button onClick={() => {
                            setFileForPreview(problemInfo.testcaseFileURL)
                        }} className="previewBtn">Test Inputs</button>
                        <div onClick={() => {
                            testcaseUploadRef.current.click()
                        }} className="uploadbtn"><CloudUploadIcon /></div>
                        <input style={{ display: "none" }}
                            onChange={e => {
                                let fileURL = onfileChange(e, "Testcase.txt")
                                setFileForPreview(fileURL)

                                setProblemInfo({ ...problemInfo, statementFileURL: fileURL })
                            }}
                            type="file" name="" ref={testcaseUploadRef} />


                    </div>
                    <div className="uploadBtnContainer">
                        <button onClick={() => {
                            setFileForPreview(problemInfo.outputFileURL)
                        }} className="previewBtn">Test Outputs</button>
                        <div onClick={() => {
                            outputUploadRef.current.click()
                        }} className="uploadbtn"><CloudUploadIcon /></div>
                        <input style={{ display: "none" }}
                            onChange={e => {
                                let fileURL = onfileChange(e, "Testcase.txt")
                                setFileForPreview(fileURL)

                                setProblemInfo({ ...problemInfo, statementFileURL: fileURL })
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