import React from 'react';
import SubmissionService from '../../../services/Submission.service';
import ContestSubmissionTable from '../ContestSubmissionTable/ContestSubmissionTable';
import './ContestSubmissions.css'
function ContestSubmissions({ contest, currentUser }) {
    const [submissions, setSubmissionList] = React.useState([])
    React.useEffect(() => {
        SubmissionService.getContestSubmissions(contest.id, 0)
            .then(submissions => {
                setSubmissionList([...submissions])
            })
    })
    return (
        <div className='tableContainer'>
            <ContestSubmissionTable contest={contest} submissions={submissions} />
        </div>
    );
}

export default ContestSubmissions;