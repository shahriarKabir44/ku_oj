import React from 'react';
import './NavBar.css'
import DirectoryIndicator from './DirectoryIndicator/DirectoryIndicator';
import { RootContext } from '../GlobalContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function NavBar(props) {
    const [loginModalVisibility, setLoginModalVisibility] = React.useState(false)
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
                <button onClick={() => {
                    setLoginModalVisibility(true)
                }} className="menuBtn btn">Login</button>
                <button className="menuBtn btn">Sign up</button>

            </div>}
            {currentUser !== null && <div className="menuContainer">
                <button className="menuBtn btn">{currentUser.name}</button>

            </div>}
            <LoginModal open={loginModalVisibility} handleClose={() => {
                setLoginModalVisibility(false)
            }} />
        </div>
    );
}

function LoginModal({ open, handleClose }) {
    const formRef = React.useRef(null)
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <form ref={formRef} >
                        <label htmlFor="username">Email</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />

                        <button type="submit">Login</button>
                    </form>


                </Box>
            </Fade>
        </Modal>
    </div>
}

export default NavBar;