import React from "react";
import ContestService from "../../../services/Contest.service";
import "./ContestRankings.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import LoaderManager from "../../../EventsManager/LoaderManager";


const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'fit-content',
	maxHeight: '70vh',
	height: '70vh',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	overflowY: 'auto',
	zIndex: 100
};
export default function ContestRankings({ contestId, currentUser, problems, open, handleClose }) {
	const [rankings, setRankingList] = React.useState([]);
	const [isOfficial, toggleOfficialValue] = React.useState(true);
	function gerContestStandings() {
		LoaderManager.toggle()
		ContestService.getContestStandings(contestId, isOfficial).then(
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
					ranking.official_ac_time = isOfficial ?
						JSON.parse(ranking.official_ac_time) :
						JSON.parse(ranking.unofficial_ac_time)

				});
				let filteredStandingInfo = [];
				standings.forEach((ranking) => {
					if (ranking.official_description == null) return;

					filteredStandingInfo.push(ranking);
				});
				LoaderManager.toggle()

				setRankingList(filteredStandingInfo);
			}
		);
	}
	React.useEffect(() => {
		gerContestStandings();
	}, [open, isOfficial]);
	function convertMillisecondsToDHMS(milliseconds) {
		const seconds = Math.floor((milliseconds / 1000) % 60);
		const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
		const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
		const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

		const formattedString = `${days}:${hours}:${minutes}:${seconds}`;
		return formattedString;
	}
	return (
		<div className="contestStantingsContainer">



			<Modal aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={() => {
					handleClose()
				}}

				closeAfterTransition
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}>
				<Box sx={modalStyle}>
					<h2 style={{
						display: "flex",
						justifyContent: "center"
					}}>Contest Rankings</h2>
					<div style={{
						display: "flex",
						alignItems: "center",
						margin: " 10px",
						justifyContent: "space-between"
					}}>
						<div>
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
						</div>
						<button className="btn" style={{
							background: " #04AA6D",
							color: "white",
							border: " 1px solid #04AA6D",
							cursor: "pointer"
						}} onClick={() => {
							gerContestStandings()
						}}>Reload</button>
					</div>
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
										{time && <b>{convertMillisecondsToDHMS(time)}</b>}
										{value > 0 && <i>(-{value})</i>}
									</div>
								})}
							</React.Fragment>
						})}

					</div>

				</Box>
			</Modal>

		</div>
	);
}
