import React from 'react';
import './DirectoryIndicator.css'
import NavbarDirectorymanager from '../../../EventsManager/NavbarDirectoryManager'
import { Link, useNavigate } from 'react-router-dom'
function DirectoryIndicator(props) {
    const [directory, setDitectory] = React.useState([])
    React.useEffect(() => {
        NavbarDirectorymanager.subscribe({
            label: 'navbar',
            handler: (message) => {
                setDitectory(message)
            }
        })
    }, [directory])

    return (
        <div className='directoryIndicatorContainer'>
            {directory.map((dir, index) => {
                return <div key={index} className="directoryBtnElement">
                    <DirectoryButton dir={dir} />

                    {index !== directory.length - 1 && <p style={{
                        margin: 0,
                        padding: 0
                    }}>/</p>}
                </div>
            })}
        </div>
    );
}

export default DirectoryIndicator;



function DirectoryButton({ dir }) {
    return <Link to={dir.path} style={{
        textDecoration: 'none'
    }} className="directoryElementContainer">{dir.label} </Link >
}