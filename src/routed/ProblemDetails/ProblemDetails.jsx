import React from 'react'
import { useParams } from 'react-router-dom'
import ContestService from '../../services/Contest.service'
import SubmissionService from '../../services/Submission.service'
import Global from '../../services/Global'
import { Link } from 'react-router-dom'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager'
export default function ProblemDetails({ currentUser }) {
    const { problemId } = useParams()
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
        contestName: ""
    })

    React.useEffect(() => {
        try {
            ContestService.getProblemInfo(problemId)
                .then(({ problemInfo }) => {
                    NavbarDirectoryManager.setDitectory('problemDescription', {
                        contest: {
                            title: problemInfo.contestName,
                            id: problemInfo.contestId
                        }, problem: {
                            ...problemInfo
                        }
                    })
                    setProblemInfo(problemInfo)
                })
        } catch (error) {
            console.error('oh no')
        }


        SubmissionService.getPreviousSubmissions(problemId, currentUser?.id)
            .then(({ previousSubmissions }) => {
                setPreviousSubmissionList(previousSubmissions)
            })
    }, [problemId])
    function submitSolution() {
        const data = {
            time: (new Date()) * 1,
            fileExtension,
            problemId: problemId,
            submittedBy: currentUser.id,
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
