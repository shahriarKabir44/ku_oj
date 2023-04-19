import React from 'react';
import UserServiice from '../services/User.service';
export const RootContext = React.createContext()

function GlobalContext({ children }) {
    const [currentUser, setCurrentUser] = React.useState(null)
    async function isAuthorized() {
        let { user } = await UserServiice.isAuthorized()
        console.log(user)
        setCurrentUser(user)
    }

    React.useEffect(() => {
        isAuthorized()
    }, [])
    return (
        <RootContext.Provider value={{
            currentUser
        }}>
            {children}
        </RootContext.Provider>
    );
}

export default GlobalContext;