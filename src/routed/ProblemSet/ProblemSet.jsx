import React from "react";
import "./ProblemSet.css";
import { Link } from "react-router-dom";
import Global from "../../services/Global";
import ContestService from "../../services/Contest.service";
import NavbarDirectoryManager from "../../EventsManager/NavbarDirectoryManager";


export default function ProblemSet() {
	const [problems, setProblemList] = React.useState([])
	const [pageNumber, setPageNumber] = React.useState(0)
	function getProblems() {
		ContestService.getProblems(pageNumber)
			.then(problemList => {
				setProblemList(problemList)
			})
	}
	React.useEffect(() => {
		setTimeout(() => { NavbarDirectoryManager.setDitectory('problemset', {}) }, 100)

		getProblems()
	}, [])

	return (
		<div className="problemset_container">
			<p className="contestsCardHeading">Problems</p>
			<table className="problemset" style={{
				background: 'white'
			}}>
				<thead>
					<tr>
						<th>Problem</th>
						<th>Contest</th>
						<th>Points</th>
						<th>Solved by:</th>
					</tr>
				</thead>
				<tbody>
					{problems.map((problem, index) => {
						return <tr key={index}>
							<td>
								<Link to={`${Global.CLIENT_URL}/problem/${problem.id}`}>{problem.title}</Link>
							</td>
							<td>
								<Link to={`${Global.CLIENT_URL}/contest/${problem.contestId}`}> {problem.contestTitle} </Link>
							</td>
							<td>
								{problem.points}
							</td>
							<td>{problem.numSolutions}</td>
						</tr>
					})}



					<tr>
						<td colSpan={4}>
							<div style={{
								display: 'flex',
								justifyContent: 'center',
								gap: "10px"
							}} >
								<button onClick={() => {
									setPageNumber(Math.max(0, pageNumber - 10))
									setTimeout(() => {
										getProblems()
									}, 500)
								}} className="btn">prev</button>
								<button className="btn" onClick={() => {
									setPageNumber(pageNumber + 10)
									setTimeout(() => {
										getProblems()
									}, 500)
								}}>next</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>




		</div>
	);
}
