import React from 'react';
import './DirectoryIndicator.css'
import NavbarDirectorymanager from '../../../EventsManager/NavbarDirectoryManager'
import { useNavigate } from 'react-router-dom'
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
                    {index !== directory.length - 1 && <p>/</p>}
                </div>
            })}
        </div>
    );
}

export default DirectoryIndicator;



function DirectoryButton({ dir }) {
    const navigate = useNavigate()
    return <div onClick={() => {
        navigate(dir.path)
    }} className="directoryElementContainer">{dir.label} </div>
}