import React from 'react';
import './UserProfileRoot.css'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager'
import UserService from '../../services/User.service'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Global from '../../services/Global';

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
                <HostedContestsContainer user={user} currentUser={currentUser} isShowing={selectedContentPanel === 3} />
            </div>
        </div>
    );
}


function HostedContestsContainer({ user, currentUser, isShowing }) {
    const [hostedContests, setHostedContestsList] = React.useState([])
    React.useEffect(() => {
        UserService.getHostedContests(user.id)
            .then(contests => {
                console.log(contests)
                setHostedContestsList(contests)
            })
    }, [user])
    return <div style={{
        display: `${isShowing ? 'block' : 'none'}`
    }} className="hostedContestsListContainer">
        {hostedContests.map((contest, index) => {
            return <div className="hostedContest" key={index}>
                <Link to={`${Global.CLIENT_URL}/contest/${contest.id}`}>
                    <h3>{contest.title}</h3>

                </Link>
            </div>
        })}
    </div>
}