import React from 'react'
import ContestService from '../../services/Contest.service';
import './Home.css'
import ContestCard from '../shared/ContestCard/ContestCard';
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager';
export default function Home({ currentUser }) {
    const [contestList, setContestList] = React.useState([])

    React.useEffect(() => {
        setTimeout(() => { NavbarDirectoryManager.setDitectory('home', {}) }, 100)
        ContestService.getUpcomingContests()
            .then((contests) => {
                setContestList(contests)
            })

    }, [])



    return (
        <div className="homeContainer">
            <div className="contestsContainer ">
                <p className="contestsCardHeading">Upcoming contests</p>
                <div className="contestList">
                    {contestList.map((contest, index) => {
                        return <ContestCard key={index} contest={contest} currentUser={currentUser} />
                    })}

                </div>

            </div>


        </div>
    )
}





