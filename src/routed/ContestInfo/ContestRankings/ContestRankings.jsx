import React from "react";
import ContestService from "../../../services/Contest.service";
import "./ContestRankings.css";



export default function ContestRankings({ contestId, currentUser, problems }) {
	const [pageNumber, setPageNumber] = React.useState(0);
	const [rankings, setRankingList] = React.useState([]);
	const [isOfficial, toggleOfficialValue] = React.useState(true);
	function gerContestStandings() {
		ContestService.getContestStandings(contestId, pageNumber, isOfficial).then(
			(standings) => {
				standings.forEach((ranking) => {

					ranking.description = JSON.parse(ranking.description);
					ranking.verdicts = JSON.parse(ranking.verdicts)
					ranking.official_description = JSON.parse(ranking.official_description)
					ranking.officialVerdicts = JSON.parse(ranking.officialVerdicts)
					ranking.official_description = isOfficial
						? ranking.official_description
						: ranking.description;
					ranking.official_points = isOfficial
						? ranking.official_points
						: ranking.points;
					ranking.officialVerdicts = isOfficial
						? ranking.officialVerdicts :
						ranking.verdicts
				});
				let filteredStandingInfo = [];
				standings.forEach((ranking) => {
					if (ranking.official_description == null) return;

					filteredStandingInfo.push(ranking);
				});
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

			{/* <div className="main-container">
				<div className="table-row">
					<div className="participants-container">Participants</div>
					<div className="problems-container">
						{
							problems.map((_, index) => (
								<div key={index} className="problem-title"> {String.fromCharCode(65 + index)} </div>
							))
						}

					</div>
					<div className="points-container">Points</div>

				</div>
				{rankings.map((rank, index) => (
					<RankingItem key={index} serial={index + 1} problems={problems} rank={rank} />
				))}
			</div> */}
			{/* <table className="styled-table">
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
			<div className="rankingContainerGrid" style={{
				gridTemplateColumns: `repeat( ${2 + problems.length}, 200px)`
			}}>
				<h3 className="scoreboardHeader">Participant</h3>
				<h3 className="scoreboardHeader">Score</h3>
				{problems.map((_, index) => (
					<h3 key={index} className="scoreboardHeader"> {String.fromCharCode(65 + index)} </h3>
				))}
				{rankings.map((rank, index) => {
					return <React.Fragment key={index}>
						<h3 className="contestantNameTD">{rank.contestantName}</h3>
						<h4> {rank.official_points} </h4>
						{problems.map((problem, index1) => {
							let data = rank.official_description[problem.id]
							let value = data ? (data > 0 ? "✅" : "❌") : ""
							return <p key={index1}>{value}</p>
						})}
					</React.Fragment>
				})}

			</div>
		</div>
	);
}
