import React from 'react'
import ContestService from '../../../services/Contest.service'
import './ContestRankings.css'
export default function ContestRankings({ contestId, currentUser, problems }) {
    const [pageNumber, setPageNumber] = React.useState(0)
    const [rankings, setRankingList] = React.useState([])
    function gerContestStandings() {
        ContestService.getContestStandings(contestId, pageNumber)
            .then(standings => {
                standings.forEach((ranking) => {
                    ranking.official_description = JSON.parse(ranking.official_description)
                    ranking.description = JSON.parse(ranking.description)

                })

                setRankingList(standings)
            })
    }
    React.useEffect(() => {
        gerContestStandings()
    }, [contestId, currentUser])

    return (
        <div className="contestStantingsContainer">
            <table style={{
                width: 'auto',
                borderCollapse: 'unset',
                whiteSpace: 'nowrap'
            }}>
                <thead>
                    <tr>
                        <th>Participant</th>
                        {problems.map((problem, index) => {
                            return <th key={index}>{problem.title}</th>
                        })}

                    </tr>
                </thead>
                <tbody>
                    {rankings.map((rank, index) => {
                        return <tr key={index}>
                            <td>
                                <h3 className="contestantNameTD">{rank.contestantName}</h3>
                            </td>
                            {problems.map((problem, index1) => {
                                let data = rank.official_description[problem.id]
                                let value = data ? (data > 0 ? "✅" : "❌") : ""
                                return <td key={index1}>{value}</td>
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
