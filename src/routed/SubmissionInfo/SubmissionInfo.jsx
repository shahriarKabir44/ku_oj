import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SubmissionService from '../../services/Submission.service';
import Global from '../../services/Global';
import './SubmissionInfo.css'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager';
function SubmissionInfo({ currentUser }) {
    const params = useParams()
    const [submissionInfo, setSubmissionInfo] = React.useState({})
    const [submittedCode, setSubmittedCode] = React.useState([])
    React.useEffect(() => {
        document.title = "Submission"
        SubmissionService.getSubmissionInfo({ ...params, viewer: currentUser?.id })
            .then((submissionInfo) => {
                if (submissionInfo.success) {
                    let { submission } = submissionInfo
                    console.log(submission)
                    NavbarDirectoryManager.setDitectory('submissionDetails', {
                        contest: { id: submission.contest?.id, title: submission.contest?.code },
                        problem: { id: submission.problemId, title: submission.problemCode },
                        submission: { id: submission.id }
                    })
                    setSubmissionInfo(submission)
                    setSubmittedCode(submissionInfo.code.split('\n'))
                }
            })

    }, [currentUser])
    return (
        <div className='submissionViewContainer '>
            <div className="card submissionInfoCard">
                <table>
                    <thead>
                        <tr>
                            <th>Contest</th>
                            <th>Problem</th>
                            <th>Language</th>
                            <th>Time</th>
                            <th>Verdict</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Link to={`${Global.CLIENT_URL}/contest/${submissionInfo.contest?.id}`}>{submissionInfo.contest?.title}</Link>
                            </td>
                            <td>
                                <Link to={`${Global.CLIENT_URL}/problem/${submissionInfo.problemId}`}>{submissionInfo.problemName}</Link>
                            </td>
                            <td>
                                {submissionInfo.language}
                            </td>
                            <td>
                                {(new Date(submissionInfo.time)).toLocaleString()}
                            </td>
                            <td>
                                {submissionInfo.verdict}
                            </td>
                            <td>
                                <Link to={`${Global.CLIENT_URL}/user/${submissionInfo.submittedBy}`}>{submissionInfo.authorName}</Link>

                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6}>Code</td>
                        </tr>
                        <tr>
                            <td colSpan={6}>
                                <div className="codeContainer">
                                    <ol>
                                        {submittedCode.map((line, lineNum) => {
                                            return <li key={lineNum}>
                                                <code>{line} </code>
                                            </li>
                                        })}
                                    </ol>

                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default SubmissionInfo;