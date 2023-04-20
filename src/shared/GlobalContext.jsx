import React from 'react';
import UserService from '../services/User.service';
export const RootContext = React.createContext()

function GlobalContext({ children }) {
    const [currentUser, setCurrentUser] = React.useState(null)
    async function isAuthorized() {
        let { user } = await UserService.isAuthorized()
        setCurrentUser(user)
        return user
    }


    return (
        <RootContext.Provider value={{
            currentUser,
            setCurrentUser,
            isAuthorized
        }}>
            {children}
        </RootContext.Provider>
    );
}

export default GlobalContext;