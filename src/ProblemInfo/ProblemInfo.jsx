import React from 'react';
import { useParams } from 'react-router-dom';
import ContestService from '../services/Contest.service';
import Global from '../services/Global';
import UploadManager from '../services/UploadManager';

function ProblemInfo(props) {
    const { id } = useParams()
    const [submissionFileURI, setSubmissionFileURI] = React.useState("")
    const [fileExtension, setFileExtension] = React.useState('')
    const [problemInfo, setProblemInfo] = React.useState({
        contestId: 0,
        id: 0,
        outputFileURL: "",
        point: 0,
        statementFileURL: "",
        testcaseFileURL: "",
        title: "",
    })
    React.useEffect(() => {
        ContestService.getProblemInfo(id)
            .then(({ problemInfo }) => {
                setProblemInfo(problemInfo)
            })
    }, [])
    function submitSolution() {
        const data = {
            time: (new Date()) * 1,
            language: fileExtension,
            problemId: id,
            submittedBy: 1,
            contestId: problemInfo.contestId
        }
        ContestService.submit(data, submissionFileURI)
            .then(({ fileURL, submissionId }) => {
                ContestService.judgeSubmission({
                    fileURL,
                    submissionId,
                    problemInfo
                })
            })

    }
    return (
        <div>
            <h2>{problemInfo.title}</h2>
            <iframe style={{
                width: "70vw",
                height: "70vh"
            }} src={Global.SERVER_URL + problemInfo.statementFileURL}
                title="Problem"
                height={"10%%"}
                width={"100%"}></iframe>

            <div>
                <h4>Submit</h4>
                <form onSubmit={e => {
                    e.preventDefault()
                    submitSolution()
                }} >
                    <div>
                        <label htmlFor="submission">Code file</label>
                        <input onChange={e => {
                            setSubmissionFileURI(UploadManager.getFileURI(e))
                        }} type="file" name="submission" />
                    </div>
                    <div>
                        <label htmlFor="language"></label>
                        <select value={fileExtension} onChange={e => {
                            setFileExtension(e.target.value)
                        }} name="language" id="">
                            <option value={''}>Choose</option>
                            <option value={'py'}>python 3</option>

                        </select>
                    </div>
                    <button type="submit">submit</button>
                </form>
            </div>

        </div>
    );
}

export default ProblemInfo;