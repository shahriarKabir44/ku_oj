import './App.css';
import React from 'react'

import { Route, Routes } from 'react-router-dom';
import CreateContest from './CreateContest/CreateContest';
import ContestInfo from './ContestInfo/ContestInfo';
import ProblemInfo from './ProblemInfo/ProblemInfo';
import SubmissionInfo from './SubmissionInfo/SubmissionInfo';
import NavBar from './shared/NavBar/NavBar';
import Home from './Home/Home';
function App() {

	React.useEffect(() => {


	}, [])
	return (
		<div className="App">
			<NavBar />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/contest/:id' element={< ContestInfo />} />
				<Route path='/createContest' element={<CreateContest />} />
				<Route path='/viewProblem/:id' element={<ProblemInfo />} />
				<Route path='/viewSubmission/:id' element={<SubmissionInfo />} />
			</Routes>
		</div>
	);
}

export default App;
