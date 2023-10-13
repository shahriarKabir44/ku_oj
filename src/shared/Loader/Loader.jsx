import React from 'react';
import './Loader.css'
import LoaderManager from '../../EventsManager/LoaderManager';
function Loader(props) {
    const [visibility, toggleVisibility] = React.useState(0)
    React.useEffect(() => {
        LoaderManager.subscribe({
            toggle: function () {
                toggleVisibility(visibility ^ 1)
            }
        })
    }, [])
    return (
        <div>
            {visibility === 1 && <div className="loader-container">
                <div className="loader"></div>
            </div>}
        </div>
    );
}

export default Loader;