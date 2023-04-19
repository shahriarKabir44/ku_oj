import React from 'react';
import UserServiice from '../services/User.service';
export const RootContext = React.createContext()

function GlobalContext({ children }) {
    const [currentUser, setCurrentUser] = React.useState(null)
    async function isAuthorized() {
        let user = await UserServiice.isAuthorized()
        setCurrentUser(user)
    }
    function getCurrentUser() {
        return currentUser
    }
    React.useEffect(() => {
        isAuthorized()
    }, [])
    return (
        <RootContext.Provider value={{
            getCurrentUser
        }}>
            {children}
        </RootContext.Provider>
    );
}

export default GlobalContext;