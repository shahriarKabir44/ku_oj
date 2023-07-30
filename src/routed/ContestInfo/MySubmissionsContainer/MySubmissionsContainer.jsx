import React from "react"
import UserService from "../../../services/User.service"

import ContestSubmissionTable from "../ContestSubmissionTable/ContestSubmissionTable"
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

            <ContestSubmissionTable submissions={mySubmissions} contest={contest} />
        </div>}
    </div>
}