import React from 'react';
import CreateProblem from './CreateProblem/CreateProblem';
import ContestService from '../../../services/Contest.service';
import ContestCreationEventManager from '../../../EventsManager/ContestCreationEventManager'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './CreateContest.css'
import NavbarDirectoryManager from '../../../EventsManager/NavbarDirectoryManager'
import { useNavigate } from 'react-router-dom';
import Global from '../../../services/Global';
import LoaderManager from '../../../EventsManager/LoaderManager';
function CreateContest({ currentUser }) {
    const [selectedProblemForPreview, setSelectedProblemForPreview] = React.useState(0)
    const navigate = useNavigate()
    const [problemCount, setProblemCount] = React.useState([])

    const [contestInfo, setContestInfo] = React.useState({
        title: "",
        startTime: new Date(),
        endTime: new Date((new Date()) * 1 + 3600 * 1000),
        hostId: currentUser.id,
        code: ""
    })
    function createContest() {

        if (contestInfo.startTime * 1 > contestInfo.endTime * 1) {
            alert("Invalid input")
            return
        }
        LoaderManager.toggle()
        ContestService.createContest({
            ...contestInfo,
            startTime: contestInfo.startTime * 1,
            endTime: contestInfo.endTime * 1
        })
            .then((contestId) => {
                if (contestId === null) {
                    alert('Contest name already exists!')
                    LoaderManager.toggle()
                    return
                }
                ContestCreationEventManager.sendMessage({
                    ...contestInfo,
                    startTime: contestInfo.startTime * 1,
                    endTime: contestInfo.endTime * 1,
                    id: contestId
                })
                    .then(({ status, errorMessage }) => {
                        if (!status) {
                            alert(errorMessage)
                            return
                        }
                        LoaderManager.toggle()

                        window.location.href = `${Global.CLIENT_URL}/contest/${contestId}`
                    })
            })

    }
    React.useEffect(() => {


        if (!currentUser) {
            navigate('/')
        }

        setTimeout(() => {

            NavbarDirectoryManager.setDitectory('createContest', {
                userId: currentUser.id, userName: currentUser.userName
            })
        }, 100)



    }, [])
    return (
        <div className="container_createContest">
            <div className="dashboardContainer">
                <div className="leftPanel">
                    <div className="contestDetailsPanel">

                        <div className="card" style={{ height: "35vh" }}>
                            <div className="titleContainer_createProblem">
                                <h2 className="createContestPage_title">Create a contest</h2>
                                <button className="btn confirmContestCreation" onClick={createContest}>Create</button>
                            </div>
                            <div className='formContainer'>
                                <label htmlFor="title">Contest title:</label>
                                <input className='createContestInput' onChange={e => {
                                    setContestInfo({ ...contestInfo, title: e.target.value })
                                }} type="text" name="title" />

                                <label htmlFor="code">Contest code:</label>
                                <input className='createContestInput' onChange={e => {
                                    setContestInfo({ ...contestInfo, code: (e.target.value) })
                                }} type="text" name="trip-start" />

                                <label htmlFor="start">Start Time:</label>
                                <input className='createContestInput' onChange={e => {
                                    setContestInfo({ ...contestInfo, startTime: (new Date(e.target.value)) * 1 })
                                }} type="datetime-local" name="start" />


                                <label htmlFor="end">End Time:</label>
                                <input className='createContestInput' onChange={e => {
                                    setContestInfo({ ...contestInfo, endTime: (new Date(e.target.value)) * 1 })
                                }} type="datetime-local" name="trip-end" />

                            </div>
                        </div>
                    </div>
                    <div className="problemsLabelPanel">
                        <div className="card">
                            <div className="titleContainer">
                                <h3 className="createContestPage_title">Problems</h3>
                                <button onClick={() => {
                                    setProblemCount([...problemCount, {
                                        index: problemCount.length,
                                        title: `Problem ${problemCount.length + 1}`
                                    }])
                                    setSelectedProblemForPreview(problemCount.length)
                                }} className="addProblemBtn">
                                    <AddIcon />
                                </button>
                            </div>
                            <div className="problemsContainer">
                                {problemCount.map((problem, index) => {
                                    return <div key={index} className="problemItem">
                                        <div onClick={() => {
                                            setSelectedProblemForPreview(problem.index)
                                        }} className={`problemLabel ${problem.index === selectedProblemForPreview ? "selectedProblemForPreview" : ""}`}>{problem.title}</div>
                                        <div onClick={() => {

                                            setProblemCount(problemCount.filter(p => p.index !== problem.index))
                                        }} className="deleteBtn"> <DeleteIcon /></div>

                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="problemDetailsPanels">
                    <div className="card" style={{ height: "inherit" }}>
                        {problemCount.map((problem, index) => {
                            return <CreateProblem setProblemTitle={(title) => {
                                let problems = [...problemCount]
                                problems[index].title = title
                                setProblemCount(problems)
                            }} key={index} problemNum={index} isFocused={problem.index === selectedProblemForPreview} />

                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CreateContest;