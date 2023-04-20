import React from 'react';
import './UserProfileRoot.css'
import NavbarDirectoryManager from '../EventsManager/NavbarDirectoryManager'
import UserService from '../services/User.service'
import { useNavigate, useParams } from 'react-router-dom';
import { RootContext } from '../shared/GlobalContext';

function UserProfileRoot(props) {
    const navigate = useNavigate()
    const { isAuthorized } = React.useContext(RootContext)
    const [currentUser, setCurrentUser] = React.useState({})
    const { id } = useParams()
    const [user, setUser] = React.useState({})

    const [selectedContentPanel, setSelectedContentPanel] = React.useState(1)


    React.useEffect(() => {
        console.log(id)
        isAuthorized()
            .then(user => {
                setCurrentUser(user)
            })
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
                {currentUser.id === user.id && <div className="operationsContainer card">
                    <div onClick={() => {
                        navigate('createContest')
                    }} className="operationTab">
                        <p>+ Create a contest</p>
                    </div>
                </div>}
            </div>
            <div className="contentsPanel card">
                <div className="contentsPanelHeadingContainer">
                    <div onClick={() => {
                        setSelectedContentPanel(1)
                    }} className={`contentsPanelHeading ${selectedContentPanel === 1 ? 'selectedPanel' : ''}`}>Submissions</div>
                    <div onClick={() => {
                        setSelectedContentPanel(2)
                    }} className={`contentsPanelHeading ${selectedContentPanel === 2 ? 'selectedPanel' : ''}`}>Contests Hosted</div>
                    <div onClick={() => {
                        setSelectedContentPanel(3)
                    }} className={`contentsPanelHeading ${selectedContentPanel === 3 ? 'selectedPanel' : ''}`}>Contests Participated</div>

                </div>
            </div>
        </div>
    );
}

export default UserProfileRoot;