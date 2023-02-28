import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ContestService from '../services/Contest.service'
function ContestInfo(props) {
    const { id } = useParams()
    const [contestInfo, setContestInfo] = React.useState({
        title: "",
        startTime: (new Date()).toLocaleString(),
        endTime: (new Date()).toLocaleString(),
        hostName: ""
    })
    const [problems, setProblemList] = React.useState([])
    React.useEffect(() => {
        ContestService.getContestInfo(id)
            .then(({ contestInfo }) => {
                console.log(contestInfo)
                setContestInfo(contestInfo)
            })
        ContestService.getContestProblems(id)
            .then(({ contestProblems }) => {
                setProblemList(contestProblems)
            })
    }, [])
    return (
        <div>
            <h2> {contestInfo.title} </h2>
            Hosted by {contestInfo.hostName}
            <h4>problems</h4>
            <ol>
                {problems.map((problem, index) => {
                    return <li key={index}>
                        <Link to={`/viewProblem/${problem.id}`}  >
                            {problem.title}
                        </Link>
                    </li>
                })}
            </ol>
        </div>
    );
}

export default ContestInfo;