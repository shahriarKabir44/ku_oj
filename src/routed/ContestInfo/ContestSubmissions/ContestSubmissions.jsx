import React from 'react';
import SubmissionService from '../../../services/Submission.service';
import ContestSubmissionTable from '../ContestSubmissionTable/ContestSubmissionTable';
import './ContestSubmissions.css'
function ContestSubmissions({ contest, currentUser }) {
    const [submissions, setSubmissionList] = React.useState([])
    const [pageNumber, setPageNumber] = React.useState(0)
    function getContestSubmissions() {
        SubmissionService.getContestSubmissions(contest.id, pageNumber)
            .then(submissionList => {
                setSubmissionList([...submissions, ...submissionList])
            })
    }
    React.useEffect(() => {
        getContestSubmissions()
    }, [])
    return (
        <div className='tableContainer'>
            <ContestSubmissionTable contest={contest} shouldLoadMore={true} submissions={submissions} loadMore={() => {
                setPageNumber(pageNumber + 10)
                setTimeout(() => {
                    getContestSubmissions()
                }, 500)
            }} />
        </div>
    );
}

export default ContestSubmissions;