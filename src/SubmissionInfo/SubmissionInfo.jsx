import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SubmissionService from '../services/Submission.service';

function SubmissionInfo(props) {
    const { id } = useParams()
    const [submissionInfo, setSubmissionInfo] = React.useState({
        id: "",
        time: "",
        execTime: "",
        verdict: "",
        language: "",
        submissionFileURL: "",
        problemId: "",
        submittedBy: "",
        code: ""
    })
    React.useEffect(() => {
        SubmissionService.getSubmissionInfo(id)
            .then(({ submissionInfo }) => {
                setSubmissionInfo(submissionInfo)
            })

    }, [id])
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <p>Problem</p>
                            <p> <Link to={`/viewProblem/${submissionInfo.problemId}`}>
                                {submissionInfo.problemName}
                            </Link> </p>
                        </td>
                        <td>
                            <p>Submitted by</p>
                            <p> <Link  >
                                {submissionInfo.user}
                            </Link> </p>
                        </td>
                        <td>
                            <p>Verdict</p>
                            <p>{submissionInfo.verdict}</p>
                        </td>
                        <td>
                            <p>Submitted on</p>
                            <p>{new Date(submissionInfo.time).toLocaleString()} </p>
                        </td>
                        <td>
                            <p>Language</p>
                            <p>{submissionInfo.language}</p>
                        </td>
                    </tr>
                </tbody>

            </table>
            <code>
                <ol>
                    {submissionInfo.code.split('\n').map((line, lineNum) => {
                        return <li key={lineNum}>
                            <pre>
                                {line}
                            </pre>
                        </li>
                    })}
                </ol>

            </code>
        </div>
    );
}

export default SubmissionInfo;