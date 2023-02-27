import './App.css';
import React from 'react'

import { Link, Route, Routes } from 'react-router-dom';
import CreateContest from './CreateContest/CreateContest';
import ContestService from './services/Contest.service';
function App() {
	const [contestList, setContestList] = React.useState([])
	React.useEffect(() => {
		ContestService.getContests()
			.then(({ contests }) => {
				setContestList(contests)
			})
	}, [])
	return (
		<div className="App">
			<h2>Contests</h2>


			<Routes>
				<Route path='/' element={<table border={1}>
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
				</table>} />
				<Route path='/createContest' element={<CreateContest />} />
			</Routes>
		</div>
	);
}

export default App;
