import React from 'react'
import { useParams } from 'react-router-dom'
import ContestService from '../../../services/Contest.service'

export default function EditContest({ currentUser }) {
    const { contestId } = useParams()
    React.useEffect(() => {
        ContestService.getContestFullDetails(contestId)

    }, [currentUser, contestId])
    return (
        <div>EditContest</div>
    )
}
