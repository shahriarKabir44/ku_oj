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
    return (
        <div className="homeContainer">
            <div className="container">
                <div>
                    <div className="contestsContainer ">
                        <h2 className="contestsCardHeading">Upcoming contest</h2>
                        <div className="contestList">
                            {contestList.map((contest, index) => {
                                return <div key={index} className="card contestCard">
                                    <h4 className="contestTitle">{contest.title}</h4>
                                </div>
                            })}
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}



