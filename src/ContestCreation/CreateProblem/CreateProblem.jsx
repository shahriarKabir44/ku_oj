import React from 'react';
import EventSubscriptionManager from '../../EventsManager/EventSubscriptionManager';
import ContestService from '../../services/Contest.service';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './CreateProblem.css'
function CreateProblem({ problemNum }) {
    const problemStatementUploadRef = React.useRef(null)
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
    function onfileChange(event) {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        return (URL.createObjectURL(fileObj))
    }
    return (
        <div style={{
            margin: "10px"
        }}>
            <form  >
                <div className="lableContainer">
                    <label htmlFor="contestTitle">Title</label>
                    <input value={problemInfo.title} onChange={e => {
                        setProblemInfo({ ...problemInfo, title: e.target.value })

                    }} type="text" name="contestTitle" />

                </div>
                <div className="uplodsContainer">
                    <div className="uploadBtnContainer">
                        <button className="previewBtn">Preview</button>
                        <div onClick={() => {
                            problemStatementUploadRef.current.click()
                        }} className="uploadbtn"><CloudUploadIcon /></div>
                        <input style={{ display: "none" }} type="file" name="" ref={problemStatementUploadRef} />
                    </div>
                    <div className="uploadBtnContainer">
                        <button className="previewBtn">Preview</button>
                        <div className="uploadbtn"><CloudUploadIcon /></div>
                    </div>
                    <div className="uploadBtnContainer">
                        <button className="previewBtn">Preview</button>
                        <div className="uploadbtn"><CloudUploadIcon /></div>
                    </div>
                </div>
                <div className="previewContainer"></div>


            </form>
        </div>
    );
}

export default CreateProblem;