import React from "react"
import UserService from "../../../services/User.service"
import Global from "../../../services/Global"
import { Link } from "react-router-dom"
export default function MySubmissionsContainer({ contest, user }) {
    const [mySubmissions, setMySubmissions] = React.useState([])
    React.useEffect(() => {
        if (user)
            UserService.getContestSubmissions(user.id, contest.id)
                .then(submissions => {
                    setMySubmissions(submissions)
                })

    }, [contest, user])
    return <div className="submissionsListContainer">
        {!user && <h4>You need to log in to see your submissions</h4>}
        {user && <>
            {mySubmissions.length === 0 && <h4>You haven't made any submission</h4>}
        </>}
        {user && mySubmissions.length !== 0 && <div style={{ height: 'inherit' }}>
            <h2 style={{ margin: 0 }}>Your submisions</h2>

            <div className="contestSubmissionContainer">
                <table>
                    <thead style={{
                        position: 'sticky',
                        top: '0'
                    }}>
                        <tr>
                            <th>Time</th>
                            <th>Problem</th>
                            <th>Language</th>
                            <th>Verdict</th>
                            <th>Exec. time</th>
                        </tr>

                    </thead>
                    <tbody>
                        {mySubmissions.map((submission, index) => {
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
        </div>}
    </div>
}