import React from 'react';
import './DirectoryIndicator.css'
function DirectoryIndicator(props) {
    const dirs = [
        {
            label: 'home',
            path: '/'
        }, {
            label: 'create contest',
            path: '/createContest'
        }
    ]
    return (
        <div className='directoryIndicatorContainer'>
            {dirs.map((dir, index) => {
                return <div key={index} className="directoryBtnElement">
                    <DirectoryButton dir={dir} />
                    {index !== dirs.length - 1 && <p>/</p>}
                </div>
            })}
        </div>
    );
}

export default DirectoryIndicator;



function DirectoryButton({ dir }) {
    return <div className="directoryElementContainer">{dir.label} </div>
}