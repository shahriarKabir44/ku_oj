import React from "react";
import "./ProblemSet.css";
import { Link } from "react-router-dom";
import Global from "../../services/Global";
import ContestService from "../../services/Contest.service";


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
		getProblems()
	}, [])

	return (
		<div className="Container">
			<div className="title">Problem Set</div>
			<table>
				<thead>
					<tr>
						<th>Problem</th>
						<th>Contest</th>
						<th>Points</th>
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
						</tr>
					})}
					<tr>
						<td colSpan={3}>
							<div style={{
								display: 'flex',
								justifyContent: 'space-between'
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
