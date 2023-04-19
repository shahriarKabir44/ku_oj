import React from 'react';
import './NavBar.css'
import DirectoryIndicator from './DirectoryIndicator/DirectoryIndicator';
import { RootContext } from '../GlobalContext';
function NavBar(props) {
    const { currentUser } = React.useContext(RootContext)
    React.useEffect(() => {
        console.log(currentUser)
    }, [])
    return (
        <div className='navBarContainer'>
            <div className="logoContainer">
                <button className="logobtn">KU_OJ</button>
            </div>
            <DirectoryIndicator />
            {currentUser === null && <div className="menuContainer">
                <button className="menuBtn btn">Login</button>
                <button className="menuBtn btn">Sign up</button>

            </div>}
            {currentUser !== null && <div className="menuContainer">
                <button className="menuBtn btn">{currentUser.name}</button>

            </div>}
        </div>
    );
}

export default NavBar;