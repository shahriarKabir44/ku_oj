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
					console.log(ranking)
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
					ranking.official_ac_time = isOfficial ?
						JSON.parse(ranking.official_ac_time) :
						JSON.parse(ranking.unofficial_ac_time)

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
	function processTime(time) {

	}
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

			<div className="rankingContainerGrid" style={{
				gridTemplateColumns: `repeat( ${2 + problems.length}, 200px)`
			}}>
				<h3 className="scoreboardHeader scoreboardCell">Participant</h3>
				<h3 className="scoreboardHeader scoreboardCell">Score</h3>
				{problems.map((_, index) => (
					<h3 key={index} className="scoreboardHeader scoreboardCell"> {String.fromCharCode(65 + index)} </h3>
				))}
				{rankings.map((rank, index) => {
					return <React.Fragment key={index}>
						<h3 className="contestantNameTD scoreboardCell">{rank.contestantName}</h3>
						<h4 className=" scoreboardCell"> {rank.official_points} </h4>
						{problems.map((problem, index1) => {
							let data = rank.official_description[problem.id]
							let time = rank.official_ac_time[problem.id]

							if (!data) return <div className="scoreboardCell"></div>
							let value = data ? data[1] : ""
							return <div className={`${data[0] ? 'AC_cell' : 'err_cell'} scoreboardCell scoreCell`} key={index1}>
								{time && <b>{new Date(time * 1000).toISOString().substr(11, 8)}</b>}
								{value > 0 && <i>(-{value})</i>}
							</div>
						})}
					</React.Fragment>
				})}

			</div>
		</div>
	);
}
