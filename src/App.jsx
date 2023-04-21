import './App.css';
import React from 'react'

import { Route, Routes } from 'react-router-dom';
import CreateContest from './routed/UserProfile/ContestCreation/CreateContest';
import ContestInfo from './routed/ContestInfo/ContestInfo';
import ProblemInfo from './routed/ProblemInfo/ProblemInfo';
import GlobalContext from './shared/GlobalContext';
import SubmissionInfo from './routed/SubmissionInfo/SubmissionInfo';
import NavBar from './shared/NavBar/NavBar';
import Home from './routed/Home/Home';
import UserProfileRoot from './routed/UserProfile/UserProfileRoot';
function App() {

	React.useEffect(() => {


	}, [])
	return (
		<GlobalContext>

			<div className="App">
				<NavBar />
				<div className='mainContainer'>

					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/contest/:id' element={< ContestInfo />} />
						<Route path='/viewProblem/:id' element={<ProblemInfo />} />
						<Route path='/viewSubmission/:id' element={<SubmissionInfo />} />
						<Route path='/user/:id'>
							<Route path='' element={<UserProfileRoot />} />
							<Route path='createContest' element={<CreateContest />} />

						</Route>
					</Routes>
				</div>

			</div>
		</GlobalContext>

	);
}

export default App;
