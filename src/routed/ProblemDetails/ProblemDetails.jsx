import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContestService from '../../services/Contest.service'
import SubmissionService from '../../services/Submission.service'
import './ProblemDetails.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Global from '../../services/Global'
import { Link } from 'react-router-dom'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager'
import SubmitCode from './SubmitCode/SubmitCode'


export default function ProblemDetails({ currentUser }) {
    const nav = useNavigate()
    const [contest, setContestInfo] = React.useState({})

    const { problemId } = useParams()


    const [problemInfo, setProblemInfo] = React.useState({})


    React.useEffect(() => {
        ContestService.searchContestByProblem(problemId)
            .then(contest => {
                if (!contest) {
                    nav('/')
                }

                if (contest.endTime >= (new Date()) * 1) {
                    contest.isRunning = true

                }
                setContestInfo(contest)
            })
        try {
            ContestService.getProblemInfo(problemId)
                .then(({ problemInfo }) => {
                    if (!problemInfo) {
                        nav('/')
                    }
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



    }, [problemId])

    return (
        <div className="container_problemDetails">
            <div className="leftPanelsContainer">
                <ContestInfoContainer contest={contest} currentUser={currentUser} />
                <SubmissionsContainer problem={problemInfo} contest={contest} currentUser={currentUser} />
            </div>
            <div className="problemBodyContainer card">
                <div className="problemExtraInfoContainer">
                    <h2 className='problemTitle'>{problemInfo.title}</h2>
                    <div className="pointsContainer">
                        <WorkspacePremiumIcon />
                        <h4>{problemInfo.points} pts</h4>
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

function SubmissionsContainer({ currentUser, problem, contest }) {
    const [submissions, setPreviousSubmissionList] = React.useState([])
    const [codeSubmissionModalVisibility, setCodeSubmissionModalVisibility] = React.useState(false)
    const [hasRegistered, setRegistrationStatus] = React.useState(false)
    React.useEffect(() => {

        if (currentUser) {
            ContestService.isRegistered(contest.id, currentUser.id)
                .then(({ isRegistered }) => {
                    setRegistrationStatus(isRegistered)
                })
        }
    }, [currentUser, problem])



    React.useEffect(() => {
        if (currentUser)
            SubmissionService.getPreviousSubmissionsOfProblem(problem?.id, currentUser?.id)
                .then(({ previousSubmissions }) => {
                    setPreviousSubmissionList(previousSubmissions)
                })
    }, [currentUser, problem])
    return <div className="submissionsContainer card">
        <h3 style={{
            margin: 0
        }}>Submit?</h3>
        {/* add registration  checker during contest */}
        {/* to-do: add file checker */}
        <div className="submissionContainer">

            <button style={{
                flex: 1,
                margin: "5px"
            }} onClick={() => {
                setCodeSubmissionModalVisibility(true)
            }} className="btn" >Submit</button>
        </div>
        {currentUser && <div className="previousSubmissionsContainer">
            <table>
                <thead style={{
                    position: 'sticky',
                    top: '0'
                }}>
                    <tr>
                        <th>Time</th>
                        <th>Language</th>
                        <th>Verdict</th>
                        <th>Exec. time</th>
                    </tr>

                </thead>
                <tbody>
                    {submissions.map((submission, index) => {
                        return <tr key={index}>
                            <td>
                                <Link style={{
                                    fontSize: '12px'
                                }} to={`${Global.CLIENT_URL}/viewSubmission/${problem.contestId}/${submission.id}`}>{(new Date(submission.time)).toLocaleString()} </Link>
                            </td>
                            <td>
                                {submission.language}
                            </td>
                            <td>
                                {submission.verdict}
                            </td>
                            <td>
                                {submission.execTime} (ms)
                            </td>
                        </tr>
                    })}

                </tbody>
            </table>
        </div>}
        {!currentUser && <h4>Log in to see your submissions</h4>}
        <SubmitCode contestTitle={contest.title} open={codeSubmissionModalVisibility} handleClose={() => {
            setCodeSubmissionModalVisibility(false)
        }}
            setSubmissionList={(submissionList) => {
                setPreviousSubmissionList(submissionList)
            }}
            isOfficial={hasRegistered ? (contest.endTime >= (new Date()) * 1 ? true : false) : false}
            problem={problem}
            currentUser={currentUser}
            setPreviousSubmissionList={(newSubmission) => {
                setPreviousSubmissionList([newSubmission, ...submissions])
            }}
        />
    </div>

}




function ContestInfoContainer({ contest, currentUser }) {
    const isContestRunning = contest.endTime >= (new Date()) * 1

    return <div className="contestInfoContainer card">
        <h3 style={{
            margin: 0
        }}>{contest.title}</h3>
        {isContestRunning && <div style={{
            display: 'flex',
            gap: "10px"
        }}><h5>Time left:</h5>  <h3>1 hr 3 mins</h3> </div>}
        {!isContestRunning && <div style={{
            display: 'flex',
            gap: "10px"
        }}>   <h3>Contest ended</h3> </div>}

    </div>

}


