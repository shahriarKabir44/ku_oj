import React from "react"
import UserService from "../../../services/User.service"

import ContestSubmissionTable from "../ContestSubmissionTable/ContestSubmissionTable"
export default function MySubmissionsContainer({ contest, user }) {
    const [mySubmissions, setMySubmissions] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0)
    function getUsersContestSubmissions() {
        UserService.getUsersContestSubmissions(user.id, contest.id, pageNumber)
            .then(submissions => {
                setMySubmissions([...submissions])
            })
    }
    React.useEffect(() => {

        if (user !== null) {
            getUsersContestSubmissions()
        }


    }, [contest, user])
    return <div className="submissionsListContainer">
        {!user && <h4>You need to log in to see your submissions</h4>}
        {user && <>
            {mySubmissions.length === 0 && <h4>You haven't made any submission</h4>}
        </>}
        {user && mySubmissions.length !== 0 && <div style={{ height: 'inherit' }}>
            <h2 style={{ margin: 0 }}>Your submisions</h2>

            <ContestSubmissionTable submissions={mySubmissions}
                shouldLoadMore={user !== null}
                contest={contest} loadMore={(flag) => {
                    setPageNumber(Math.max(0, pageNumber + 10 * flag))
                    setTimeout(() => {
                        getUsersContestSubmissions()
                    }, 500)
                }} />
        </div>}
    </div>
}