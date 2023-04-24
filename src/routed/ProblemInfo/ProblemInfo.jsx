import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ContestService from '../../services/Contest.service';
import Global from '../../services/Global';
import SubmissionService from '../../services/Submission.service';
import UploadManager from '../../services/UploadManager';
import './ProblemInfo.css'

function ProblemInfo(props) {
    const { id } = useParams()
    const [submissionFileURI, setSubmissionFileURI] = React.useState("")
    const [fileExtension, setFileExtension] = React.useState('')
    const [languageName, setLanguageName] = React.useState('')
    const [previousSubmissions, setPreviousSubmissionList] = React.useState([])
    const [problemInfo, setProblemInfo] = React.useState({
        contestId: 0,
        id: 0,
        outputFileURL: "",
        point: 0,
        statementFileURL: "",
        testcaseFileURL: "",
        title: "",
    })
    function getLanguageName(extName) {
        if (extName === 'py') setLanguageName('python3')
    }
    React.useEffect(() => {
        try {
            ContestService.getProblemInfo(id)
                .then(({ problemInfo }) => {
                    setProblemInfo(problemInfo)
                })
        } catch (error) {
            console.error('oh no')
        }


        SubmissionService.getPreviousSubmissions(id, 1)
            .then(({ previousSubmissions }) => {
                setPreviousSubmissionList(previousSubmissions)
            })
    }, [id])
    function submitSolution() {
        const data = {
            time: (new Date()) * 1,
            fileExtension,
            problemId: id,
            submittedBy: 1,
            contestId: problemInfo.contestId,
            languageName
        }
        SubmissionService.submit(data, submissionFileURI)
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
            <div className="mainContainer">
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
                                getLanguageName(e.target.value)
                                setFileExtension(e.target.value)

                            }} name="language" id="">
                                <option value={''}>Choose</option>
                                <option value={'py'}>python 3</option>

                            </select>
                        </div>
                        <button type="submit">submit</button>
                    </form>
                </div>
                <div className="submissionsContai">
                    <h3>Previous submissions</h3>
                    {previousSubmissions.map((submission, index) => {
                        return <div key={index}>
                            <div className="flex">
                                <Link to={`/viewSubmission/${submission.id}`}>
                                    {(new Date(submission.time)).toLocaleString()}
                                </Link>
                                <p>language:{submission.language}</p>
                                <p>verdict:{submission.verdict}</p>
                            </div>

                        </div>
                    })}
                </div>
            </div>

        </div>
    );
}

export default ProblemInfo;