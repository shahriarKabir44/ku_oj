import React from 'react';
import Global from '../../../services/Global';
import { Link } from 'react-router-dom';
import './ContestSubmissionTable.css'
function ContestSubmissionTable({ submissions, contest }) {
    return (
        <div className="contestSubmissionContainer">
            <table>
                <thead style={{
                    position: 'sticky',
                    top: '0'
                }}>
                    <tr>
                        <th>Time</th>
                        <th>Problem</th>
                        {submissions[0] && submissions[0].author && <th>Author</th>}
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
                                }} to={`${Global.CLIENT_URL}/viewSubmission/${contest.id}/${submission.id}`}>{(new Date(submission.time)).toLocaleString()} </Link>
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

                </tbody>
            </table>
        </div>
    );
}

export default ContestSubmissionTable;