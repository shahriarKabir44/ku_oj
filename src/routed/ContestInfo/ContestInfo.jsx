import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ContestService from '../../services/Contest.service'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager';
import './ContestInfo.css'
import UserService from '../../services/User.service';
function ContestInfo(props) {
    const { id } = useParams()
    const [contest, setContestInfo] = React.useState({
        title: "",
        startTime: (new Date()).toLocaleString(),
        endTime: (new Date()).toLocaleString(),
        hostName: ""
    })
    const [problems, setProblemList] = React.useState([])
    const [currentUser, setCurrentUser] = React.useState(null)
    React.useEffect(() => {
        UserService.isAuthorized()
            .then(({ user }) => {
                setCurrentUser(user)
            })
        ContestService.getContestInfo(id)
            .then(({ contestInfo }) => {
                setTimeout(() => {
                    NavbarDirectoryManager.setDitectory('contestInfo', {
                        contest: {
                            id,
                            title: contestInfo.title
                        }
                    })
                }, 100)
                setContestInfo(contestInfo)
            })
        ContestService.getContestProblems(id)
            .then(({ contestProblems }) => {
                setProblemList(contestProblems)
            })
    }, [])
    return (
        <div className='contestinfo_container'>

            <div className="gridContainer">
                <div className="leftPanel_contest">
                    <div className="card basicInfoContainer">
                        <h3>{contest.title}</h3>
                        <p>Organised by: <span>{contest.hostName}</span> </p>
                        <h5>Time left:</h5>
                        <h3>1 hr 3 mins</h3>
                    </div>
                    <div className="card mySubmissionsContainer">
                        <MySubmissionsContainer contestId={id} user={currentUser} />
                    </div>
                </div>
                <div className="problemSetContainer">
                    <div className="card">
                        <div className="tabSelectionContainer">
                            <div className="tabSelectorBtn">Problems</div>
                            <div className="tabSelectorBtn">Global Submissions</div>
                            <div className="tabSelectorBtn">Rankings</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

function MySubmissionsContainer({ contestId, user }) {
    const [mySubmissions, setMySubmissions] = React.useState([])
    React.useEffect(() => {
        setMySubmissions([])
    }, [])
    return <div className="submissionsListContainer">
        {!user && <h4>You need to log in to see your submissions</h4>}
        {user && <>
            {mySubmissions.length === 0 && <h4>You haven't made any submission</h4>}
        </>}
    </div>
}

export default ContestInfo;