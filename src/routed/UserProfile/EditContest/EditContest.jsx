import React from 'react'
import { useParams } from 'react-router-dom'
import ContestService from '../../../services/Contest.service'
import ContestCreationEventManager from '../../../EventsManager/ContestCreationEventManager'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './EditContest.css'
import NavbarDirectoryManager from '../../../EventsManager/NavbarDirectoryManager'
import { useNavigate } from 'react-router-dom';
export default function EditContest({ currentUser }) {
    const { contestId } = useParams()
    const [problemCount, setProblemCount] = React.useState([])
    const [contestInfo, setContestInfo] = React.useState({
        title: "",
        startTime: new Date(),
        endTime: new Date((new Date()) * 1 + 3600 * 1000),
        hostId: currentUser.id,
        code: ""
    })
    React.useEffect(() => {
        ContestService.getFullContestDetails(contestId)
            .then(({ contestInfo, problems }) => {
                setContestInfo(contestInfo)
            })

    }, [currentUser, contestId])
    return (
        <div className="editContest_container">
            <div className="dashboardContainer">
                <div className="lestPanel">

                    <div className="contestDetailsPanel">

                        <div className="card" style={{ height: "35vh" }}>
                            <div className="titleContainer_updateProblem">
                                <h2 className="title">Update contest</h2>
                                <button className="btn confirmContestCreation"  >Update</button>
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
                                <h3 className="title">Problems</h3>
                                <button onClick={() => {

                                }} className="addProblemBtn">
                                    <AddIcon />
                                </button>
                            </div>
                            <div className="problemsContainer">
                                {problemCount.map((problem, index) => {
                                    return <div key={index} className="problemItem">
                                        <div onClick={() => {

                                        }} className={`problemLabel selectedProblemForPreview`}>{problem.title}</div>
                                        <div onClick={() => {
                                        }} className="deleteBtn"> <DeleteIcon /></div>

                                    </div>
                                })}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="problemsContainer"></div>
            </div>
        </div>
    )
}
