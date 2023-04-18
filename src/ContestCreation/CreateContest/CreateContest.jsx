import React from 'react';
import CreateProblem from './CreateProblem/CreateProblem';
// import ContestService from '../../services/Contest.service';
// import EventSubscriptionManager from '../../EventsManager/EventSubscriptionManager'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './CreateContest.css'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager'
function CreateContest(props) {
    setTimeout(() => { NavbarDirectoryManager.setDitectory('createContest') }, 100)

    const [contestInfo, setContestInfo] = React.useState({
        title: "",
        startTime: new Date(),
        endTime: new Date((new Date()) * 1 + 3600 * 1000),
        hostId: 1
    })
    React.useEffect(() => { }, [])
    const [problemCount, setProblemCount] = React.useState([1, 2, 3, 4, 5, 6, 7, 8])
    return (
        <div className="container_createContest">
            <div className="dashboardContainer">
                <div className="leftPanel">
                    <div className="contestDetailsPanel">

                        <div className="card" style={{ height: "30vh" }}>
                            <h2 className="title">Create a contest</h2>
                            <div className='formContainer'>
                                <label htmlFor="text">Text Input:</label>
                                <input onChange={e => {
                                    setContestInfo({ ...contestInfo, title: e.target.value })
                                }} value={contestInfo.title} type="text" name="text-input" />
                                <label htmlFor="start">Start Time:</label>
                                <input onChange={e => {
                                    setContestInfo({ ...contestInfo, startTime: e.target.value })
                                }} value={contestInfo.startTime} type="datetime-local" name="trip-start" />


                                <label htmlFor="end">End Time:</label>
                                <input onChange={e => {
                                    setContestInfo({ ...contestInfo, endTime: e.target.value })
                                }} value={contestInfo.endTime} type="datetime-local" name="trip-end" />

                            </div>
                        </div>
                    </div>
                    <div className="problemsLabelPanel">
                        <div className="card">
                            <div className="titleContainer">
                                <h3 className="title">Problems</h3>
                                <button className="addProblemBtn">
                                    <AddIcon />
                                </button>
                            </div>
                            <div className="problemsContainer">
                                {problemCount.map((problem, index) => {
                                    return <div key={index} className="problemItem">
                                        <div className="problemLabel">Problem{problem}</div>
                                        <div className="deleteBtn"> <DeleteIcon /></div>

                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="problemDetailsPanels">
                    <div className="card" style={{ height: "inherit" }}>
                        <CreateProblem problemNum={1} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CreateContest;