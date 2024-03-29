import React from 'react'
import ContestService from '../../services/Contest.service';
import './Home.css'
import ContestCard from '../shared/ContestCard/ContestCard';
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager';
import LoaderManager from '../../EventsManager/LoaderManager';
export default function Home({ currentUser }) {
    const [contestList, setContestList] = React.useState([])

    React.useEffect(() => {
        LoaderManager.toggle()
        setTimeout(() => { NavbarDirectoryManager.setDitectory('home', {}) }, 100)
        ContestService.getUpcomingContests()
            .then((contests) => {

                LoaderManager.toggle()

                setContestList(contests)
            })

    }, [])



    return (
        <div className="homeContainer">
            <div className="contestsContainer ">
                <p className="contestsCardHeading">Upcoming contests</p>
                <div className="contestList">
                    {contestList.length > 0 && contestList.map((contest, index) => {
                        return <ContestCard key={index} contest={contest} currentUser={currentUser} />
                    })}

                    {contestList.length === 0 && <h3>No upcoming contests</h3>}

                </div>

            </div>


        </div>
    )
}





