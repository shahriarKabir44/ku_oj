import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SubmissionService from '../../services/Submission.service';
import Global from '../../services/Global';

function SubmissionInfo({ currentUser }) {
    const params = useParams()
    const [submissionInfo, setSubmissionInfo] = React.useState({})
    React.useEffect(() => {
        document.title = "Submission"
        console.log(params, currentUser?.id)
        SubmissionService.getSubmissionInfo({ ...params, viewer: currentUser?.id })
            .then((submissionInfo) => {
                if (submissionInfo.success) {
                    console.log(submissionInfo)
                    setSubmissionInfo(submissionInfo.submission)

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
                </tbody>
            </table>

        </div>
    );
}

export default SubmissionInfo;