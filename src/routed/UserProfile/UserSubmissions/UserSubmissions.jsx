import React from 'react';
import Global from '../../../services/Global';
import { Link } from 'react-router-dom';
import SubmissionService from '../../../services/Submission.service';
function UserSubmissions({ userId, isShowing }) {
    const [submissions, setSubmissionList] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0)
    function getSubmissions() {
        SubmissionService.getUserSubmissions(userId, pageNumber)
            .then(submissionList => {
                setSubmissionList([...submissions, ...submissionList])
            })
    }
    React.useEffect(() => {
        getSubmissions()
    }, [])
    return (
        <div style={{
            display: `${isShowing ? 'block' : 'none'}`
        }} className="contestSubmissionContainer">
            <table>
                <thead style={{
                    position: 'sticky',
                    top: '0'
                }}>
                    <tr>
                        <th>Time</th>
                        <th>Problem</th>
                        <th>Contest</th>
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
                                }} to={`${Global.CLIENT_URL}/viewSubmission/${submission.contestId}/${submission.id}`}>{(new Date(submission.time)).toLocaleString()} </Link>
                            </td>
                            <td>
                                <Link style={{
                                    fontSize: '12px'
                                }} to={`${Global.CLIENT_URL}/problem/${submission.problemId}`}>{submission.problemName} </Link>
                            </td>
                            {submission.author && <td>
                                <Link style={{
                                    fontSize: '12px'
                                }} to={`${Global.CLIENT_URL}/user/${submission.submittedBy}`}>{submission.author} </Link>

                            </td>}
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
                    <tr>
                        <td colSpan={6}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center'
                            }} >
                                <button className="btn" onClick={() => {
                                    setPageNumber(pageNumber + 10)
                                    setTimeout(() => {
                                        getSubmissions()
                                    }, 500)
                                }}>Load more</button>
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserSubmissions;