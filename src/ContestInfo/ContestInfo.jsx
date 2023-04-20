import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ContestService from '../services/Contest.service'
import NavbarDirectoryManager from '../EventsManager/NavbarDirectoryManager';
function ContestInfo(props) {
    const { id } = useParams()
    const [contest, setContestInfo] = React.useState({
        title: "",
        startTime: (new Date()).toLocaleString(),
        endTime: (new Date()).toLocaleString(),
        hostName: ""
    })
    const [problems, setProblemList] = React.useState([])
    React.useEffect(() => {

        ContestService.getContestInfo(id)
            .then(({ contestInfo }) => {
                setTimeout(() => {
                    NavbarDirectoryManager.setDitectory('contestInfo', {
                        contest: {
                            id,
                            title: contestInfo.title
                        }
                    })
                }, 100)
                setContestInfo(contestInfo)
            })
        ContestService.getContestProblems(id)
            .then(({ contestProblems }) => {
                setProblemList(contestProblems)
            })
    }, [])
    return (
        <div>
            <h2> {contest.title} </h2>
            Hosted by {contest.hostName}
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