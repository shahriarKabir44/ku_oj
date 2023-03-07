import React from 'react';
import { useParams } from 'react-router-dom';

function SubmissionInfo(props) {
    const { id } = useParams()
    React.useEffect(() => {

    }, [id])
    return (
        <div>
            yo
        </div>
    );
}

export default SubmissionInfo;