import React from 'react'
import ContestService from '../services/Contest.service';
import { Link, } from 'react-router-dom';
import './Home.css'
import NavbarDirectoryManager from '../EventsManager/NavbarDirectoryManager';
export default function Home(props) {
    const [contestList, setContestList] = React.useState([])

    React.useEffect(() => {
        setTimeout(() => { NavbarDirectoryManager.setDitectory('home', {}) }, 100)
        ContestService.getContests()
            .then(({ contests }) => {
                console.log(contests)
                setContestList(contests)
            })

    }, [])

    function calculateDuration({ startTime, endTime }) {
        let duration = endTime * 1 - startTime * 1
        duration = Math.floor(duration / 60000)
        return `${Math.floor(duration / 60)} Hours, ${duration % 60} minutes`
    }

    return (
        <div className="homeContainer">
            <div className="contestsContainer ">
                <p className="contestsCardHeading">Upcoming contests</p>
                <div className="contestList">
                    {contestList.map((contest, index) => {
                        return <Link to={'http://localhost:3000/contest/' + contest.id} key={index} className="card contestCard">
                            <div  >
                                <h3>{contest.title}</h3>
                                <div>
                                    Starts at:{(new Date(contest.startTime)).toLocaleString()}

                                </div>
                                <div>
                                    Duration: {calculateDuration(contest)}

                                </div>
                            </div>
                        </Link>
                    })}

                </div>

            </div>


        </div>
    )
}



