import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SubmissionService from '../../services/Submission.service';
import Global from '../../services/Global';
import './SubmissionInfo.css'
function SubmissionInfo({ currentUser }) {
    const params = useParams()
    const [submissionInfo, setSubmissionInfo] = React.useState({})
    const [submittedCode, setSubmittedCode] = React.useState([])
    React.useEffect(() => {
        document.title = "Submission"
        console.log(params, currentUser?.id)
        SubmissionService.getSubmissionInfo({ ...params, viewer: currentUser?.id })
            .then((submissionInfo) => {
                console.log(submissionInfo)
                if (submissionInfo.success) {

                    setSubmissionInfo(submissionInfo.submission)
                    setSubmittedCode(submissionInfo.code.split('\n'))
                }
            })

    }, [currentUser])
    return (
        <div>
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
    );
}

export default SubmissionInfo;