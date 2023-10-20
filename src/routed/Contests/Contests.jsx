import React from 'react';
import ContestService from '../../services/Contest.service';
import ContestCard from '../shared/ContestCard/ContestCard';
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager';
import LoaderManager from '../../EventsManager/LoaderManager';
function Contests({ currentUser }) {
    const [contestList, setContestList] = React.useState([])
    const [previousContests, setPreviousContesList] = React.useState([])
    React.useEffect(() => {
        setTimeout(() => { NavbarDirectoryManager.setDitectory('Contests', {}) }, 100)
        LoaderManager.toggle()
        Promise.all([
            ContestService.getUpcomingContests()
                .then((contests) => {
                    setContestList(contests)
                }),
            ContestService.getContests()
                .then(previousContestList => {
                    setPreviousContesList(previousContestList)
                })
        ]).then(() => {
            LoaderManager.toggle()

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
                <p className="contestsCardHeading">Previous contests</p>
                <div className="contestList">
                    {previousContests.map((contest, index) => {
                        return <ContestCard key={index} contest={contest} currentUser={currentUser} />
                    })}
                </div>
            </div>


        </div>
    )
}

export default Contests;