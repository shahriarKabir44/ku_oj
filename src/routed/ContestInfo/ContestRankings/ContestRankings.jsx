import React from 'react'
import ContestService from '../../../services/Contest.service'
import './ContestRankings.css'
export default function ContestRankings({ contestId, currentUser, problems }) {
    const [pageNumber, setPageNumber] = React.useState(0)
    const [rankings, setRankingList] = React.useState([])
    const [isOfficial, toggleOfficialValue] = React.useState(true)
    function gerContestStandings() {
        ContestService.getContestStandings(contestId, pageNumber, isOfficial)
            .then(standings => {
                standings.forEach((ranking) => {
                    ranking.official_description = JSON.parse(ranking.official_description)
                    ranking.description = JSON.parse(ranking.description)
                    ranking.official_description = isOfficial ? ranking.official_description : ranking.description
                    ranking.official_points = isOfficial ? ranking.official_points : ranking.points
                })

                setRankingList(standings)
            })
    }
    React.useEffect(() => {
        gerContestStandings()
    }, [contestId, currentUser, isOfficial])

    return (
        <div className="contestStantingsContainer">
            <label htmlFor="showOfficial">show official</label>
            <input checked={isOfficial} type="checkbox" onChange={(e) => {
                toggleOfficialValue(1 ^ isOfficial)
            }} name="showOfficial" id="" />
            <table style={{
                width: 'auto',
                borderCollapse: 'unset',
                whiteSpace: 'nowrap'
            }}>
                <thead>
                    <tr>
                        <th>
                            <p>Participant</p>

                        </th>
                        <th>Points</th>
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
                            <td>
                                <h4> {rank.official_points} </h4>
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
