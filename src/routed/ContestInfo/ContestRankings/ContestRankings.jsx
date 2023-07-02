import React from "react";
import ContestService from "../../../services/Contest.service";
import "./ContestRankings.css";

function RankingItem({ problems, rank }) {
  return (
    <div className="table-row">
      <div className="participants-container">{rank.contestantName}</div>
      <div className="problems-container">
        {problems.map((problem, index) => {
          let data = rank.official_description[problems.id];

          if (data === 0) {
            return <div className="not-submitted">N/A</div>;
          } else if (data > 0) {
            return <div className="passed-submit">Passed</div>;
          } else {
            return <div className="failed-submit">Failed</div>;
          }
        })}
      </div>
      <div className="points-container">{rank.official_points}</div>
    </div>
  );
}

export default function ContestRankings({ contestId, currentUser, problems }) {
  const [pageNumber, setPageNumber] = React.useState(0);
  const [rankings, setRankingList] = React.useState([]);
  const [isOfficial, toggleOfficialValue] = React.useState(true);
  function gerContestStandings() {
    ContestService.getContestStandings(contestId, pageNumber, isOfficial).then(
      (standings) => {
        standings.forEach((ranking) => {
          ranking.official_description = JSON.parse(
            ranking.official_description
          );
          ranking.description = JSON.parse(ranking.description);
          ranking.official_description = isOfficial
            ? ranking.official_description
            : ranking.description;
          ranking.official_points = isOfficial
            ? ranking.official_points
            : ranking.points;
        });
        let filteredStandingInfo = [];
        console.log(standings);
        standings.forEach((ranking) => {
          if (isOfficial && ranking.official_description == null) return;
          filteredStandingInfo.push(ranking);
        });
        // console.log(filteredStandingInfo)
        setRankingList(filteredStandingInfo);
      }
    );
  }
  React.useEffect(() => {
    gerContestStandings();
  }, [contestId, currentUser, isOfficial]);

  return (
    <div className="contestStantingsContainer">
      <label htmlFor="showOfficial">show official</label>
      <input
        checked={isOfficial}
        type="checkbox"
        onChange={(e) => {
          toggleOfficialValue(1 ^ isOfficial);
        }}
        name="showOfficial"
        id=""
      />

      <div className="main-container">
        <div className="table-row">
            <div className="participants-container">Participants</div>
            <div className="problems-container">
                {
                    problems.map((_,index)=>(
                        <div className="problem-title"> {String.fromCharCode(65+index)} </div>
                    ))
                }

            </div>
            <div className="points-container">points</div>

        </div>
        {rankings.map((rank, index) => (
          <RankingItem key={index} problems={problems} rank={rank} />
        ))}
      </div>
      {/* <table>
                <thead>
                    <tr>
                        <th>
                            <p>Participants</p>
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
            </table> */}
    </div>
  );
}
