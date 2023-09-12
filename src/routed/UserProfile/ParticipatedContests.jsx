import React from 'react';
import ContestService from '../../services/Contest.service';
import { Link } from 'react-router-dom';
import Global from '../../services/Global';
function ParticipatedContests({ userId, isShowing }) {
    const [pageNumber, setPageNumber] = React.useState(0)
    const [participatedContests, setParticipatedContestList] = React.useState([])
    function getParticipatedContestList() {
        ContestService.getParticipatedContestList(userId, pageNumber)
            .then(data => {
                setParticipatedContestList(data)
            })
    }
    React.useEffect(() => {
        getParticipatedContestList()
    }, [])
    return (
        <div>
            <div style={{
                display: `${isShowing ? 'block' : 'none'}`
            }} className="contestSubmissionContainer">
                <table>
                    <thead style={{
                        position: 'sticky',
                        top: '0'
                    }}>
                        <tr>
                            <th>Time</th>
                            <th>Contest</th>
                            <th>Position</th>
                            <th>Points</th>
                        </tr>

                    </thead>
                    <tbody>
                        {participatedContests.map((participation, index) => {
                            return <tr key={index}>
                                <td>
                                    {(new Date(participation.participationTime)).toLocaleString()}
                                </td>
                                <td>
                                    <Link style={{
                                        fontSize: '12px'
                                    }} to={`${Global.CLIENT_URL}/contest/${participation.contestId}`}>{participation.contestTitle} </Link>
                                </td>


                                <td>
                                    {participation.position}
                                </td>
                                <td>
                                    {participation.official_points}
                                </td>
                            </tr>
                        })}
                        <tr>
                            <td colSpan={6}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center'
                                }} >
                                    <button className="btn" onClick={() => {
                                        setPageNumber(pageNumber + 10)
                                        setTimeout(() => {
                                            getParticipatedContestList()
                                        }, 500)
                                    }}>Load more</button>
                                </div>

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ParticipatedContests;