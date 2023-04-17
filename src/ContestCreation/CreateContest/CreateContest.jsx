import React from 'react';
import CreateProblem from '../CreateProblem/CreateProblem';
import ContestService from '../../services/Contest.service';
import EventSubscriptionManager from '../../EventsManager/EventSubscriptionManager'
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
    const [problemCount, setProblemCount] = React.useState([])
    return (
        <div>
            <div className="container">
                <h3>Create contest</h3>
                <div className="contestInfoContainer">
                    <div>
                        <div>
                            <label htmlFor="title">Contest title</label>
                            <input onChange={e => {
                                setContestInfo({ ...contestInfo, title: e.target.value })
                            }} type="text" name="title" />
                        </div>
                        <div>
                            <label htmlFor="start-time">start time</label>
                            <input onChange={e => {
                                setContestInfo({ ...contestInfo, startTime: e.target.value })
                            }} type="datetime-local" name="start-time" />
                        </div>
                        <div>
                            <label htmlFor="end-time">end time</label>
                            <input onChange={e => {
                                setContestInfo({ ...contestInfo, endTime: e.target.value })
                            }} type="datetime-local" name="end-time" />
                        </div>
                        {problemCount.map((num, index) => {
                            return <CreateProblem key={index} problemNum={num} />
                        })}
                        <button onClick={() => {
                            setProblemCount([...problemCount, problemCount.length])
                        }}>+</button>
                        <button onClick={e => {
                            console.log({
                                ...contestInfo,
                                startTime: new Date(contestInfo.startTime) * 1,
                                endTime: new Date(contestInfo.endTime) * 1
                            })
                            ContestService.createContest({
                                ...contestInfo,
                                startTime: new Date(contestInfo.startTime) * 1,
                                endTime: new Date(contestInfo.endTime) * 1
                            })
                                .then(contestId => {
                                    EventSubscriptionManager.sendMessage({ contestId })
                                })
                        }}>Create</button>
                    </div>

                </div>
            </div>

        </div >
    );
}

export default CreateContest;