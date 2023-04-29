import React from 'react'
import ContestService from '../../services/Contest.service';
import './Home.css'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager';
export default function Home({ currentUser }) {
    const [contestList, setContestList] = React.useState([])

    React.useEffect(() => {
        setTimeout(() => { NavbarDirectoryManager.setDitectory('home', {}) }, 100)
        ContestService.getContests()
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
function calculateDuration({ startTime, endTime }) {
    let duration = endTime * 1 - startTime * 1
    duration = Math.floor(duration / 60000)
    return `${Math.floor(duration / 60)} Hours, ${duration % 60} minutes`
}

function ContestCard({ contest, currentUser }) {
    const [hasRegistered, setRegistrationStatus] = React.useState(false)
    React.useEffect(() => {
        if (currentUser) {
            ContestService.isRegistered(contest.id, currentUser.id)
                .then(({ isRegistered }) => {
                    setRegistrationStatus(isRegistered)
                })
        }
    }, [])
    function registerContest() {
        if (!currentUser) { alert('You must log in first'); return }
        ContestService.registerForContest(contest.id, currentUser.id)
            .then(() => {
                setRegistrationStatus(true)
            })
    }
    return <div className="card contestCard">

        <div className="namesContainer">
            <h2>{contest.title}</h2>
            <h4>Hosted by: {contest.hostName}</h4>

        </div>

        <div className="timeContainer">
            <div>
                Starts at:{(new Date(contest.startTime)).toLocaleString()}
            </div>
            <div>
                Duration: {calculateDuration(contest)}
            </div>

            {!hasRegistered && <button className="btn contestRegisterBtn" onClick={registerContest} >Register</button>}
        </div>


    </div>
}


