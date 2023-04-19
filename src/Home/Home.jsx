import React from 'react'
import ContestService from '../services/Contest.service';
import { Link, } from 'react-router-dom';
import NavbarDirectoryManager from '../EventsManager/NavbarDirectoryManager';
export default function Home(props) {
    const [contestList, setContestList] = React.useState([])

    React.useEffect(() => {
        setTimeout(() => { NavbarDirectoryManager.setDitectory('home') }, 100)
        ContestService.getContests()
            .then(({ contests }) => {
                setContestList(contests)
            })

    }, [])
    return (
        <div>
            <h2>Contests</h2>
            <h3>
                <Link to="/createContest">Create Contest</Link>
            </h3>
            <table border={1}>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>Begin</th>
                        <th>end</th>
                    </tr>

                </thead>
                <tbody>
                    {contestList.map((contest, index) => {
                        return <tr key={index}>

                            <td> <Link to={`/contest/${contest.id}`}>{contest.title}</Link>
                            </td>
                            <td> {contest.hostName} </td>
                            <td> {new Date(contest.startTime).toLocaleString()} </td>
                            <td> {new Date(contest.endTime).toLocaleString()} </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
