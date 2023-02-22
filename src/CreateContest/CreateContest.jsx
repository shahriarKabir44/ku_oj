import React from 'react';
import CreateProblem from '../CreateProblem/CreateProblem';
import './CreateContest.css'
function CreateContest(props) {
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
                    <form onSubmit={e => {

                    }}>
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

                    </form>{problemCount.map((num, index) => {
                        return <CreateProblem key={index} />
                    })}
                    <button onClick={() => {
                        setProblemCount([...problemCount, problemCount.length])
                    }}>+</button>
                </div>
            </div>

        </div>
    );
}

export default CreateContest;