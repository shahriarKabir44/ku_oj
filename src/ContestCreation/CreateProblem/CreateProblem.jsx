import React from 'react';
import EventSubscriptionManager from '../../EventsManager/EventSubscriptionManager';
import ContestService from '../../services/Contest.service';
import './CreateProblem.css'
function CreateProblem({ problemNum }) {
    const [problemInfo, setProblemInfo] = React.useState({
        statementFileURL: "",
        testcaseFileURL: "",
        outputFileURL: "",
        title: "",
        point: 0,
        contestId: 0,
        authorId: 1,
    })
    React.useEffect(() => {
        EventSubscriptionManager.subscribe({
            id: problemNum,
            onMessage: ({ contestId }) => {


                ContestService.createProblem({ ...problemInfo, contestId: contestId })
                    .then(data => {
                    })
            }
        })
        return () => {
            EventSubscriptionManager.unsubscribe(problemNum)
        }
    }, [problemNum, problemInfo])
    function onfileChange(event) {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        return (URL.createObjectURL(fileObj))
    }
    return (
        <div style={{
            margin: "10px"
        }}>
            <form  >
                <div>
                    <label htmlFor="contestTitle">Title</label>
                    <input value={problemInfo.title} onChange={e => {
                        setProblemInfo({ ...problemInfo, title: e.target.value })

                    }} type="text" name="contestTitle" />
                </div>
                <div>
                    <label htmlFor="statementFileURL">Problem statement</label>
                    <input onChange={e => {
                        setProblemInfo({ ...problemInfo, statementFileURL: onfileChange(e) })

                    }} type="file" name="statementFileURL" />
                </div>
                <div>
                    <label htmlFor="testcaseFileURL">testcase</label>
                    <input onChange={e => {
                        setProblemInfo({ ...problemInfo, testcaseFileURL: onfileChange(e) })

                    }} type="file" name="testcaseFileURL" />
                </div>
                <div>
                    <label htmlFor="outputFileURL">output</label>
                    <input onChange={e => {
                        setProblemInfo({ ...problemInfo, outputFileURL: onfileChange(e) })
                    }} type="file" name="outputFileURL" />
                </div>


                <div>
                    <label htmlFor="point">point</label>
                    <input value={problemInfo.point} onChange={e => {
                        setProblemInfo({ ...problemInfo, point: e.target.value })
                    }} type="text" name="point" />
                </div>


            </form>
        </div>
    );
}

export default CreateProblem;