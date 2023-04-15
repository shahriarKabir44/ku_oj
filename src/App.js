import './App.css';
import React from 'react'

import { Link, Route, Routes } from 'react-router-dom';
import CreateContest from './CreateContest/CreateContest';
import ContestService from './services/Contest.service';
import ContestInfo from './ContestInfo/ContestInfo';
import ProblemInfo from './ProblemInfo/ProblemInfo';
import SubmissionInfo from './SubmissionInfo/SubmissionInfo';
import NavBar from './shared/NavBar/NavBar';
function App() {
	const [contestList, setContestList] = React.useState([])

	React.useEffect(() => {

		ContestService.getContests()
			.then(({ contests }) => {
				setContestList(contests)
			})
		return () => {
		}
	}, [])
	return (
		<div className="App">
			<NavBar />

			<Routes>
				<Route path='/' element={
					<div>
						<h2>Contests</h2>
						<h3>
							<Link to="/createContest">Create Contest</Link>
						</h3>
						<table border={1}>
							<thead>
								<tr>
									<th>title</th>
									<th>author</th>
									<th>Begin</th>
									<th>end</th>
								</tr>

							</thead>
							<tbody>
								{contestList.map((contest, index) => {
									return <tr key={index}>

										<td> <Link to={`/contest/${contest.id}`}>{contest.title}</Link>
										</td>
										<td> {contest.hostName} </td>
										<td> {new Date(contest.startTime).toLocaleString()} </td>
										<td> {new Date(contest.endTime).toLocaleString()} </td>
									</tr>
								})}
							</tbody>
						</table>
					</div>
				} />
				<Route path='/contest/:id' element={< ContestInfo />} />
				<Route path='/createContest' element={<CreateContest />} />
				<Route path='/viewProblem/:id' element={<ProblemInfo />} />
				<Route path='/viewSubmission/:id' element={<SubmissionInfo />} />
			</Routes>
		</div>
	);
}

export default App;
