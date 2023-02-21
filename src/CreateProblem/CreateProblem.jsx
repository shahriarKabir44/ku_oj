import React from 'react';
import ProblemService from '../services/Problems.service';
import './CreateProblem.css'
function CreateProblem(props) {
    const [statementFileURL, setStatementFile] = React.useState("")
    const [testcaseFileURL, setSelectedTestcaseFile] = React.useState('')
    const [outputFileURL, setSelectedOutputFile] = React.useState()
    const [title, setTitle] = React.useState('')
    const [point, setPoints] = React.useState(0)

    function onfileChange(event, handler) {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        handler(URL.createObjectURL(fileObj))
    }
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                const problemInfo = {
                    statementFileURL,
                    testcaseFileURL,
                    outputFileURL,
                    title,
                    point,
                    contestId: 1,
                    authorId: 1,

                }
                ProblemService.createProblem(problemInfo)
                    .then(data => {

                    })
            }}>
                <div>
                    <label htmlFor="contestTitle">Title</label>
                    <input value={title} onChange={e => {
                        setTitle(e.target.value)
                    }} type="text" name="contestTitle" />
                </div>
                <div>
                    <label htmlFor="statementFileURL">Problem statement</label>
                    <input onChange={e => {
                        onfileChange(e.target.files[0], setStatementFile)
                    }} type="file" name="statementFileURL" />
                </div>
                <div>
                    <label htmlFor="testcaseFileURL">testcase</label>
                    <input onChange={e => {
                        onfileChange(e.target.files[0], setSelectedTestcaseFile)
                    }} type="file" name="testcaseFileURL" />
                </div>
                <div>
                    <label htmlFor="outputFileURL">output</label>
                    <input onChange={e => {
                        onfileChange(e.target.files[0], setSelectedOutputFile)
                    }} type="file" name="outputFileURL" />
                </div>


                <div>
                    <label htmlFor="point">point</label>
                    <input value={point} onChange={e => {
                        setPoints(e.target.value)
                    }} type="text" name="point" />
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateProblem;