import React from 'react';
import './UserProfileRoot.css'
import NavbarDirectoryManager from '../EventsManager/NavbarDirectoryManager'
import UserService from '../services/User.service'
import { useParams } from 'react-router-dom';

function UserProfileRoot(props) {
    const { id } = useParams()
    const [user, setUser] = React.useState({})
    React.useEffect(() => {

        UserService.findUser(id)
            .then(user => {
                setTimeout(() => { NavbarDirectoryManager.setDitectory(user.userName, '/user/' + id) }, 100)
                setUser(user)
            })
    }, [])

    return (
        <div>

        </div>
    );
}

export default UserProfileRoot;