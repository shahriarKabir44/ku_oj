import React from 'react';
import { useParams } from 'react-router-dom';
import ContestService from '../services/Contest.service';
import Global from '../services/Global';

function ProblemInfo(props) {
    const { id } = useParams()
    const [problemInfo, setProblemInfo] = React.useState({
        contestId: 0,
        id: 0,
        outputFileURL: "",
        point: 0,
        statementFileURL: "",
        testcaseFileURL: "",
        title: "",
    })
    React.useEffect(() => {
        ContestService.getProblemInfo(id)
            .then(({ problemInfo }) => {
                setProblemInfo(problemInfo)
            })
    }, [])
    return (
        <div>
            <h2>{problemInfo.title}</h2>
            <iframe style={{
                width: "70vw",
                height: "70vh"
            }} src={Global.SERVER_URL + problemInfo.statementFileURL}
                title="Problem"
                height={"10%%"}
                width={"100%"}
                frameBorder="1"></iframe>
        </div>
    );
}

export default ProblemInfo;