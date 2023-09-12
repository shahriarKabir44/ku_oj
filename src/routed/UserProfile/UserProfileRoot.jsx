import React from 'react';
import './UserProfileRoot.css'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager'
import UserService from '../../services/User.service'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Global from '../../services/Global';
import UserSubmissions from './UserSubmissions/UserSubmissions';
import ParticipatedContests from './ParticipatedContests';

export default function UserProfileRoot({ currentUser }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const [user, setUser] = React.useState({})

    const [selectedContentPanel, setSelectedContentPanel] = React.useState(1)


    React.useEffect(() => {

        UserService.findUser(id)
            .then(user => {
                setTimeout(() => {
                    NavbarDirectoryManager.setDitectory('profile', {
                        userId: user.id, userName: user.userName
                    })
                }, 100)
                setUser(user)
            })
    }, [id])

    return (
        <div className='container_userProfile'>
            <div className="leftPanel">
                <div className="userInfoCard card">
                    Name:  {user.userName}
                </div>
                {currentUser?.id === user?.id && <div className="operationsContainer card">
                    <div onClick={() => {
                        navigate('createContest')
                    }} className="operationTab">
                        <p>+ Create a contest</p>
                    </div>
                </div>}
            </div>
            <div className="contentsPanel card">
                <div className="tabSelectionContainer_profile">
                    <div onClick={() => {
                        setSelectedContentPanel(1)
                    }} className={`tabSelectorBtn btn ${selectedContentPanel === 1 ? 'selectedTab' : ''}`}>Submissions</div>
                    <div onClick={() => {
                        setSelectedContentPanel(2)
                    }} className={`tabSelectorBtn btn ${selectedContentPanel === 2 ? 'selectedTab' : ''}`}>Contests Participated</div>
                    <div onClick={() => {
                        setSelectedContentPanel(3)
                    }} className={`tabSelectorBtn btn ${selectedContentPanel === 3 ? 'selectedTab' : ''}`}>Contests Hosted</div>
                </div>
                <UserSubmissions userId={id} isShowing={selectedContentPanel === 1} />
                <ParticipatedContests userId={id} isShowing={selectedContentPanel === 2} />
                <HostedContestsContainer user={user} currentUser={currentUser} isShowing={selectedContentPanel === 3} />
            </div>
        </div>
    );
}


function HostedContestsContainer({ user, currentUser, isShowing }) {
    const isCurrentUser = (user?.id === currentUser?.id)
    const [hostedContests, setHostedContestsList] = React.useState([])
    function hasEnded(endTime) {
        return endTime < (new Date()) * 1
    }
    React.useEffect(() => {
        UserService.getHostedContests(user.id)
            .then(contests => {
                setHostedContestsList(contests)
            })
    }, [user])
    return <div style={{
        display: `${isShowing ? 'block' : 'none'}`,
        overflowY: 'auto'
    }} className="hostedContestsListContainer">
        <table style={{
            width: '100%'
        }} className="hostedContestTable">
            <thead style={{
                position: 'sticky',
                top: 0
            }}>
                <tr className="hostedContestTable">
                    <th>Title</th>
                    <th>Start</th>
                    <th>End</th>
                    {isCurrentUser && <th>
                        Action
                    </th>}
                </tr>
            </thead>
            <tbody>
                {hostedContests.map((contest, index) => {
                    return <tr key={index} className="hostedContestTable">
                        <td>
                            <Link to={`${Global.CLIENT_URL}/contest/${contest.id}`} > {contest.title} </Link>
                        </td>
                        <td>
                            {(new Date(contest.startTime)).toLocaleString()}
                        </td>
                        <td>
                            {(new Date(contest.endTime)).toLocaleString()}
                        </td>
                        {isCurrentUser && <td>
                            {(!hasEnded(contest.endTime) || true) && <Link to={`${Global.CLIENT_URL}/user/${currentUser.id}/editContest/${contest.id}`}>
                                <button className="btn success" >edit</button>
                            </Link>}
                        </td>}
                    </tr>
                })}

            </tbody>
        </table>
    </div>
}