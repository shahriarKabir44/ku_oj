import React from 'react';
import UserService from '../services/User.service';
export const RootContext = React.createContext()

function GlobalContext({ children }) {
    const [currentUser, setCurrentUser] = React.useState(null)
    async function isAuthorized() {
        let { user } = await UserService.isAuthorized()
        setCurrentUser(user)
    }

    React.useEffect(() => {
        isAuthorized()
    }, [])
    return (
        <RootContext.Provider value={{
            currentUser,
            setCurrentUser
        }}>
            {children}
        </RootContext.Provider>
    );
}

export default GlobalContext;