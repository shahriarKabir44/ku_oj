import './App.css';
import React from 'react'
import Contests from './routed/Contests/Contests';
import { Route, Routes } from 'react-router-dom';
import CreateContest from './routed/UserProfile/ContestCreation/CreateContest';
import ContestInfo from './routed/ContestInfo/ContestInfo';
import SubmissionInfo from './routed/SubmissionInfo/SubmissionInfo';
import NavBar from './shared/NavBar/NavBar';
import Home from './routed/Home/Home';
import UserProfileRoot from './routed/UserProfile/UserProfileRoot';
import UserService from './services/User.service';
import ProblemDetails from './routed/ProblemDetails/ProblemDetails';
import EditContest from './routed/UserProfile/EditContest/EditContest';
import ProblemSet from './routed/ProblemSet/ProblemSet';
import Loader from './shared/Loader/Loader';
function App() {
	const [currentUser, setCurrentUser] = React.useState(null)
	React.useEffect(() => {
		console.log(process.env)
		UserService.isAuthorized()
			.then(({ user }) => {
				setCurrentUser(user)
			})

	}, [])
	return (

		<div className="App">
			<NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
			<Loader />
			<div className='mainContainer'>

				<Routes>
					<Route path='/' element={<Home currentUser={currentUser} />} />
					<Route path='/contest/:id' element={< ContestInfo currentUser={currentUser} />} />
					<Route path='/viewSubmission/:contestId/:submissionId/' element={<SubmissionInfo currentUser={currentUser} />} />
					<Route path='/user/:id'>
						<Route path='' element={<UserProfileRoot currentUser={currentUser} />} />
						{currentUser && <Route path='createContest' element={<CreateContest currentUser={currentUser} />} />}
						{currentUser && <Route path='editContest/:contestId' element={<EditContest currentUser={currentUser} />} />}

					</Route>
					<Route path='/contests' element={<Contests currentUser={currentUser} />} />
					<Route path='/problem/:problemId' element={<ProblemDetails currentUser={currentUser} />} />
					<Route path='/problemset' element={<ProblemSet currentUser={currentUser} />} />
				</Routes>
			</div>

		</div>

	);
}

export default App;
