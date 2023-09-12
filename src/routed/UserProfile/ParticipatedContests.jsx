import React from 'react';

function ParticipatedContests({ userId, isShowing }) {
    const [pageNumber, setPageNumber] = React.useState(0)
    const [participatedContests, setParticipatedContestList] = React.useState([])
    function getParticipatedContestList() {

    }
    React.useEffect(() => {
        getParticipatedContestList()
    }, [])
    return (
        <div>

        </div>
    );
}

export default ParticipatedContests;