import React from 'react';
import './NavBar.css'
import DirectoryIndicator from './DirectoryIndicator/DirectoryIndicator';
function NavBar(props) {
    React.useEffect(() => {

    }, [])
    return (
        <div className='navBarContainer'>
            <div className="logoContainer">
                <button className="logobtn">KU_OJ</button>
            </div>
            <DirectoryIndicator />
            <div className="menuContainer">
                <button className="menuBtn">menu</button>
            </div>
        </div>
    );
}

export default NavBar;