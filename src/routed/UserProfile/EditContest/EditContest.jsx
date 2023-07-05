import React from 'react'
import { useParams } from 'react-router-dom'
import ContestService from '../../../services/Contest.service'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './EditContest.css'
import ReplayIcon from '@mui/icons-material/Replay';
import NavbarDirectoryManager from '../../../EventsManager/NavbarDirectoryManager'
import EditProblem from './EditProblem/EditProblem';
import Global from '../../../services/Global';

import UpdateContestEventManager from '../../../EventsManager/UpdateContestEventManager';
import SubmissionService from '../../../services/Submission.service';
export default function EditContest({ currentUser }) {
    const { contestId } = useParams()
    const [problemCount, setProblemCount] = React.useState([])
    const [selectedProblemForPreview, setSelectedProblemForPreview] = React.useState(0)
    const [contestInfo, setContestInfo] = React.useState({
        title: "",
        startTime: new Date(),
        endTime: new Date((new Date()) * 1 + 3600 * 1000),
        hostId: currentUser.id,
        code: ""
    })
    function insertNewProblem() {
        let problems = structuredClone(problemCount)
        let newProblem = {
            title: "new problem",
            code: "",
            statementFileURL: "",
            points: "",
            testcaseFileURL: "",
            outputFileURL: "",
            isExisting: false,
            index: problems.length,
            isNew: true,
            contestId
        }
        problems.push(newProblem)
        setSelectedProblemForPreview(problems.length - 1)
        setProblemCount(problems)
    }

    function updateContest() {
        ContestService.updateContestInfo(contestInfo)

        UpdateContestEventManager.sendMessage(contestInfo)
            .then(({ status, errorMessage }) => {
                if (!status) {
                    alert(errorMessage)
                    return
                }
                SubmissionService.rejudgeContestSubmissions(contestId)
                    .then(() => {
                        window.location.href = (`${Global.CLIENT_URL}/contest/${contestId}`)

                    })
            })

    }

    React.useEffect(() => {
        document.title = "Edit Contest"
        ContestService.getFullContestDetails(contestId)
            .then((fullContestDetails) => {
                NavbarDirectoryManager.setDitectory('editContest', {
                    userId: currentUser.id,
                    userName: currentUser.userName,
                    contest: {
                        id: contestId,
                        title: fullContestDetails.title
                    }

                })

                //add validation
                let { problems } = fullContestDetails
                delete fullContestDetails.problems
                problems.forEach((problem) => {
                    problem.isExisting = true
                    problem.isDeleted = false
                    problem.isEdited = false
                    problem.statementFileURL = Global.SERVER_URL + problem.statementFileURL
                    problem.testcaseFileURL = Global.SERVER_URL + problem.testcaseFileURL
                    problem.outputFileURL = Global.SERVER_URL + problem.outputFileURL

                })
                setProblemCount(problems)
                setContestInfo(fullContestDetails)
            })

    }, [currentUser, contestId])
    return (
        <div className="editContest_container">
            <div className="dashboardContainer">
                <div className="lestPanel">

                    <div className="contestDetailsPanel">

                        <div className="card" style={{ height: "35vh" }}>
                            <div className="titleContainer_updateProblem">
                                <h2 className="createContestPage_title">Update contest </h2>
                                <button onClick={updateContest} className="btn confirmContestCreation"  >Update</button>
                            </div>
                            <div className='formContainer'>
                                <label htmlFor="title">Contest title:</label>
                                <input className='updateContestInput' onChange={e => {
                                    setContestInfo({ ...contestInfo, title: e.target.value })
                                }} value={contestInfo.title} type="text" name="title" />

                                <label htmlFor="code">Contest code:</label>
                                <input className='updateContestInput' onChange={e => {
                                    setContestInfo({ ...contestInfo, code: (e.target.value) })
                                }} value={contestInfo.code} type="text" name="code" />

                                <label htmlFor="start">Start Time:</label>
                                <input className='updateContestInput' onChange={e => {
                                    if ((new Date()) * 1 < contestInfo.startTime)
                                        setContestInfo({ ...contestInfo, startTime: (new Date(e.target.value)) * 1 })
                                }} type="datetime-local" name="start" value={new Date(contestInfo.startTime).toISOString().slice(0, 16)} />


                                <label htmlFor="end">End Time:</label>
                                <input className='updateContestInput' onChange={e => {
                                    setContestInfo({ ...contestInfo, endTime: (new Date(e.target.value)) * 1 })
                                }} type="datetime-local" name="ebd" value={new Date(contestInfo.endTime).toISOString().slice(0, 16)} />

                            </div>
                        </div>
                    </div>
                    <div className="problemsLabelPanel">
                        <div className="card">
                            <div className="titleContainer">
                                <h3 className="createContestPage_title">Problems</h3>
                                <button onClick={insertNewProblem} className="addProblemBtn">
                                    <AddIcon />
                                </button>
                            </div>
                            <div className="problemsContainer">
                                {problemCount.map((problem, index) => {
                                    return <div key={index} className="problemItem">
                                        <div onClick={() => {
                                            if (problem.isDeleted) return
                                            setSelectedProblemForPreview(index)
                                        }} className={`problemLabel ${selectedProblemForPreview === index ? "selectedProblemForPreview" : ""}`}>{problem.title}</div>
                                        {!problem.isDeleted && <div onClick={() => {
                                            let problems = structuredClone(problemCount)

                                            if (problem.isExisting) {
                                                problems[index].isDeleted = true

                                            }
                                            else {
                                                problems = problems.filter((_, ind) => {
                                                    return ind !== index;
                                                })
                                            }
                                            setProblemCount(problems)
                                        }} className="deleteBtn"> <DeleteIcon /></div>}
                                        {problem.isDeleted && <div onClick={() => {
                                            let problems = structuredClone(problemCount)

                                            if (problem.isExisting) {
                                                problems[index].isDeleted = false
                                                setProblemCount(problems)
                                            }
                                        }} className="deleteBtn"> <ReplayIcon /></div>}

                                    </div>
                                })}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="problemDetailsPanels">
                    <div className="card" style={{ height: "inherit" }}>
                        {problemCount.map((problem, index) => {
                            return <EditProblem setProblemTitle={(title) => {
                                let problems = [...problemCount]
                                problems[index].title = title
                                setProblemCount(problems)
                            }} key={index} problemNum={index} problemInfo={problem} isFocused={index === selectedProblemForPreview} />

                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
