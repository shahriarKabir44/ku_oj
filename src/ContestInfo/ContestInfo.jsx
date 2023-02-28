import React from 'react';
import { useParams } from 'react-router-dom';
import ContestService from '../services/Contest.service'
function ContestInfo(props) {
    const { id } = useParams()
    const [contestInfo, setContestInfo] = React.useState({
        title: "",
        startTime: (new Date()).toLocaleString(),
        endTime: (new Date()).toLocaleString(),
        hostName: ""
    })
    React.useEffect(() => {
        ContestService.getContestInfo(id)
            .then(({ contestInfo }) => {
                console.log(contestInfo)
                setContestInfo(contestInfo)
            })
        ContestService.getContestProblems(id)
            .then(({ contestProblems }) => {

            })
    }, [])
    return (
        <div>
            <h2> {contestInfo.title} </h2>
        </div>
    );
}

export default ContestInfo;