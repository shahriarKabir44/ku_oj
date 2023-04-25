import React from 'react'
import { useParams } from 'react-router-dom'
import ContestService from '../../services/Contest.service'
import SubmissionService from '../../services/Submission.service'
import './ProblemDetails.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import Global from '../../services/Global'
import { Link } from 'react-router-dom'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager'
export default function ProblemDetails({ currentUser }) {

    const [contest, setContestInfo] = React.useState({})

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
        ContestService.searchContestByProblem(problemId)
            .then(contest => {
                if (contest.endTime >= (new Date()) * 1) {
                    contest.isRunning = true

                }
                setContestInfo(contest)
            })
        try {
            ContestService.getProblemInfo(problemId)
                .then(({ problemInfo }) => {
                    console.log(problemInfo)
                    NavbarDirectoryManager.setDitectory('problemDescription', {
                        contest: {
                            title: problemInfo.contestCode,
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
        <div className="container_problemDetails">
            <div className="leftPanelsContainer">
                <ContestInfoContainer contest={contest} />
                <div className="submissionsContainer card"></div>
            </div>
            <div className="problemBodyContainer card">
                <div className="problemExtraInfoContainer">
                    <h2 className='problemTitle'>{problemInfo.title}</h2>
                    <div className="pointsContainer">
                        <WorkspacePremiumIcon />
                        <h4>{problemInfo.point} pts</h4>
                    </div>

                </div>
                <div className="problemStatementContainer">
                    <iframe src={Global.SERVER_URL + problemInfo.statementFileURL}
                        title="Problem"
                        height={"10%%"}
                        width={"100%"}></iframe>
                </div>
            </div>
        </div>
    );

}

function ContestInfoContainer({ contest }) {

    return <div className="contestInfoContainer card">
        <h3 style={{
            margin: 0
        }}>{contest.title}</h3>
        <div style={{
            display: 'flex',
            gap: "10px"
        }}><h5>Time left:</h5>  <h3>1 hr 3 mins</h3> </div>

    </div>

}



/*
<div>
           
            <div className="mainContainer">
               


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


*/