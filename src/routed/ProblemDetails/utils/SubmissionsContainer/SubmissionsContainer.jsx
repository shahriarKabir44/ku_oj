import SubmitCode from "../SubmitCode/SubmitCode"
import React from "react"
import SubmissionService from "../../../../services/Submission.service"
import { Link } from "react-router-dom"
import Global from "../../../../services/Global"
export default function SubmissionsContainer({ currentUser, problem, contest }) {
    const [submissions, setPreviousSubmissionList] = React.useState([])
    const [codeSubmissionModalVisibility, setCodeSubmissionModalVisibility] = React.useState(false)
    React.useEffect(() => {


    }, [currentUser, problem])



    React.useEffect(() => {
        if (currentUser)
            SubmissionService.getPreviousSubmissionsOfProblem(problem?.id, currentUser?.id)
                .then(({ previousSubmissions }) => {
                    setPreviousSubmissionList(previousSubmissions)
                })
    }, [currentUser, problem])
    return <div className="submissionsContainer card">
        <h3 style={{
            margin: 0
        }}>Submit?</h3>
        {/* add registration  checker during contest */}
        {/* to-do: add file checker */}
        <div className="submissionContainer">

            <button style={{
                flex: 1,
                margin: "5px"
            }} onClick={() => {
                setCodeSubmissionModalVisibility(true)
            }} className="btn" >Submit</button>
        </div>
        {currentUser && <div className="previousSubmissionsContainer">
            <table>
                <thead style={{
                    position: 'sticky',
                    top: '0'
                }}>
                    <tr>
                        <th>Time</th>
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
                                }} to={`${Global.CLIENT_URL}/viewSubmission/${problem.contestId}/${submission.id}`}>{(new Date(submission.time)).toLocaleString()} </Link>
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
        </div>}
        {!currentUser && <h4>Log in to see your submissions</h4>}
        <SubmitCode contestTitle={contest.title} open={codeSubmissionModalVisibility} handleClose={() => {
            setCodeSubmissionModalVisibility(false)
        }}
            setSubmissionList={(submissionList) => {
                setPreviousSubmissionList(submissionList)
            }}
            isOfficial={contest.endTime >= (new Date()) * 1 ? true : false}
            problem={problem}
            currentUser={currentUser}
            setPreviousSubmissionList={(newSubmission) => {
                setPreviousSubmissionList([newSubmission, ...submissions])
            }}
        />
    </div>

}
