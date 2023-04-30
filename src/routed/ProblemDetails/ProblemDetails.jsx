import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContestService from '../../services/Contest.service'
import SubmissionService from '../../services/Submission.service'
import './ProblemDetails.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Global from '../../services/Global'
import { Link } from 'react-router-dom'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade'; export default function ProblemDetails({ currentUser }) {
    const nav = useNavigate()
    const [contest, setContestInfo] = React.useState({})
    const [canSubmit, setSubmissionCapability] = React.useState()

    const { problemId } = useParams()


    const [problemInfo, setProblemInfo] = React.useState({})


    React.useEffect(() => {
        if (!currentUser) setSubmissionCapability(false)
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
                    document.title = problemInfo.title
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
    const [submissionFileURI, setSubmissionFileURI] = React.useState("")
    const [fileExtension, setFileExtension] = React.useState('')
    const [languageName, setLanguageName] = React.useState('')
    const [submissions, setPreviousSubmissionList] = React.useState([])
    const fileUploadRef = React.useRef(null), extSelectionRef = React.useRef(null)
    const [codePreviewModalVisibility, setCodePreviewModalVisibility] = React.useState(false)
    const [hasRegistered, setRegistrationStatus] = React.useState(false)
    React.useEffect(() => {

        if (currentUser) {
            ContestService.isRegistered(contest.id, currentUser.id)
                .then(({ isRegistered }) => {
                    setRegistrationStatus(isRegistered)
                })
        }
    }, [currentUser, problem])
    function submitSolution() {
        if (!currentUser) {
            alert('Please log in or sign up!')
            return
        }
        let isOfficial = hasRegistered ? (contest.endTime >= (new Date()) * 1 ? true : false) : false
        const data = {
            time: (new Date()) * 1,
            fileExtension,
            problemId: problem.id,
            submittedBy: currentUser.id,
            contestId: problem.contestId,
            languageName,
            points: problem.points,
            isOfficial
        }
        let newSubmission = {
            ...data,
            execTime: '--',
            verdict: '--',
            id: 0
        }

        setPreviousSubmissionList([newSubmission, ...submissions])

        SubmissionService.submit(data, submissionFileURI)
            .then((response) => {


                fileUploadRef.current.value = null
                extSelectionRef.current.value = ''
                SubmissionService.getPreviousSubmissionsOfProblem(problem?.id, currentUser?.id)
                    .then(({ previousSubmissions }) => {
                        setPreviousSubmissionList(previousSubmissions)
                    })
            })

    }
    function onfileChange(event) {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        return (URL.createObjectURL(fileObj))
    }

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
            <select ref={extSelectionRef} required onChange={e => {
                let extName = e.target.value
                setFileExtension(extName)
                if (extName === '') return
                if (extName === 'py') setLanguageName('python')

            }} className='createSubmissionInput' name="" id=""  >
                <option value=""> Select Language </option>
                <option value="py">Python3</option>
            </select>
            <input ref={fileUploadRef} required className='createSubmissionInput' type="file" name="" id="" onChange={e => {
                setSubmissionFileURI(onfileChange(e))
            }} />
            <button onClick={() => {
                setCodePreviewModalVisibility(true)
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
                                }} to={`${Global.CLIENT_URL}/viewSubmission/${currentUser.id}/${problem.contestId}/${submission.id}/${submission.problemId}`}>{(new Date(submission.time)).toLocaleString()} </Link>
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
        <CodePreviewModal onSubmit={submitSolution} languageName={languageName} submissionFileURI={submissionFileURI} title={problem.title} open={codePreviewModalVisibility} handleClose={setCodePreviewModalVisibility} />
    </div>

}


function CodePreviewModal({ languageName, submissionFileURI, title, open, handleClose, onSubmit }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        maxHeight: '50vh',
        height: '50vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto'
    };
    return <Modal aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
            handleClose()
        }}
        closeAfterTransition
        slotProps={{
            backdrop: {
                timeout: 500,
            },
        }}>
        <Fade in={open}>
            <Box sx={style}>
                <div className="codePreviewModalContainer">
                    <h4 style={{
                        fontFamily: "serif",
                        fontWeight: 100
                    }}>Before you submit</h4>
                    <button className="btn btn-primary  " onClick={() => {
                        handleClose()
                        onSubmit()
                    }} >Submit</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Problem title</th>
                            <th>Language</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{title}</td>
                            <td>{languageName}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Code:</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <iframe src={submissionFileURI} title='Code preview' frameBorder="0"></iframe>
                            </td>
                        </tr>

                    </tbody>
                </table>

            </Box>
        </Fade>
    </Modal>
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


