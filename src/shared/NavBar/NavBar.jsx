import React from 'react';
import './NavBar.css'
import DirectoryIndicator from './DirectoryIndicator/DirectoryIndicator';
import { RootContext } from '../GlobalContext';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import UserService from '../../services/User.service';
import { useNavigate } from 'react-router-dom';
function NavBar(props) {
    const [loginModalVisibility, setLoginModalVisibility] = React.useState(false)
    const [registrationModalVisibility, setRegistrationModalVisibility] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState(null)

    const navigate = useNavigate()
    React.useEffect(() => {
        UserService.isAuthorized()
            .then(({ user }) => {
                setCurrentUser(user)
            })
    }, [])
    return (
        <div className='navBarContainer'>
            <div className="logoContainer">
                <button className="logobtn">KU_OJ</button>
                <button className="btn menuBtn">Contests</button>
                <button className="btn menuBtn">Problems</button>

            </div>

            <DirectoryIndicator />
            {currentUser === null && <div className="menuContainer">
                <button onClick={() => {
                    setLoginModalVisibility(true)
                }} className="menuBtn btn">Login</button>
                <button onClick={() => {
                    setRegistrationModalVisibility(true)
                }} className="menuBtn btn">Sign up</button>

            </div>}
            {currentUser !== null && <div className="menuContainer">
                <button className="menuBtn btn" onClick={() => {
                    navigate('/user/' + currentUser.id)
                }}>{currentUser.userName}</button>
                <button className="danger btn  " onClick={() => {
                    localStorage.clear()
                    setCurrentUser(null)
                }}>Log out</button>

            </div>}
            <LoginModal open={loginModalVisibility} onAuthenticated={(user) => {
                setCurrentUser(user)
                setLoginModalVisibility(false)
            }} handleClose={() => {
                setLoginModalVisibility(false)
            }} />
            <RegistrationModal open={registrationModalVisibility} onAuthenticated={(user) => {
                setCurrentUser(user)
                setRegistrationModalVisibility(false)
            }} handleClose={() => {
                setRegistrationModalVisibility(false)
            }} />
        </div>
    );
}

function LoginModal({ open, handleClose, onAuthenticated }) {
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
    function submitLoginForm(e) {
        e.preventDefault()
        let formData = new FormData(formRef.current)
        let data = {}
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        UserService.authenticate(data)
            .then((user) => {
                if (!user) {
                    alert('invalid credentials')
                    return
                }
                onAuthenticated(user)
            })
    }
    return <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => {
                handleClose()
            }}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <h1 style={{
                        fontFamily: "serif",
                        fontWeight: 100
                    }}>Log in</h1>
                    <form onSubmit={submitLoginForm} ref={formRef} >
                        <label htmlFor="username">Username</label>
                        <input autoComplete='off' type="text" id="userName" name="userName" placeholder="Enter your username" />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" />

                        <button type="submit">Login</button>
                    </form>


                </Box>
            </Fade>
        </Modal>
    </div>
}
function RegistrationModal({ open, handleClose, onAuthenticated }) {
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
    function submitRegistrationForm(e) {
        e.preventDefault()
        let formData = new FormData(formRef.current)
        let data = {}
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        UserService.register(data)
            .then((user) => {
                if (!user) {
                    alert('invalid credentials')
                    return
                }
                onAuthenticated(user)
            })
    }
    return <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={() => {
                handleClose()
            }}
            closeAfterTransition
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <h1 style={{
                        fontFamily: "serif",
                        fontWeight: 100
                    }}>Sign up</h1>
                    <form onSubmit={submitRegistrationForm} ref={formRef} >
                        <label htmlFor="username">Username</label>
                        <input autoComplete='off' type="text" id="userName" name="userName" placeholder="Enter your username" />

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