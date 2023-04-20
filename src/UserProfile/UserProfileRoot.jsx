import React from 'react';
import './UserProfileRoot.css'
import NavbarDirectoryManager from '../EventsManager/NavbarDirectoryManager'
import UserService from '../services/User.service'
import { useNavigate, useParams } from 'react-router-dom';
import { RootContext } from '../shared/GlobalContext';

function UserProfileRoot(props) {
    const navigate = useNavigate()
    const { currentUser } = React.useContext(RootContext)
    const { id } = useParams()
    const [user, setUser] = React.useState({})
    React.useEffect(() => {
        console.log(id)
        UserService.findUser(id)
            .then(user => {
                setTimeout(() => {
                    NavbarDirectoryManager.setDitectory('profile', {
                        userId: user.id, userName: user.userName
                    })
                }, 100)
                setUser(user)
            })
    }, [])

    return (
        <div className='container_userProfile'>
            <div className="leftPanel">
                <div className="userInfoCard card">
                    <table>

                        <th>Name:</th>
                        <td>{user.userName}</td>

                    </table>
                </div>
                {currentUser.id === user.id && <div className="operationsContainer card">
                    <div onClick={() => {
                        navigate('createContest')
                    }} className="operationTab">
                        <p>+ Create a contest</p>
                    </div>
                </div>}
            </div>
            <div className="contentsPanel"></div>
        </div>
    );
}

export default UserProfileRoot;