import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContestService from '../../services/Contest.service'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager';
import './ContestInfo.css'
import MySubmissionsContainer from './MySubmissionsContainer/MySubmissionsContainer';
import ContestProblemSet from './ContestProblemSet/ContestProblemSet';
import ContestRankings from './ContestRankings/ContestRankings';
import ContestSubmissions from './ContestSubmissions/ContestSubmissions';
function ContestInfo({ currentUser }) {
    const [selectedTab, setSelectedTab] = React.useState(1)
    const navigate = useNavigate()
    const { id } = useParams()
    const [contest, setContestInfo] = React.useState({
        title: "",
        startTime: (new Date()).toLocaleString(),
        endTime: (new Date()).toLocaleString(),
        hostName: "",
        code: ""
    })

    const [problems, setProblemList] = React.useState([])
    React.useEffect(() => {
        ContestService.getContestInfo(id)
            .then(({ contestInfo }) => {
                if (!contestInfo) {
                    navigate('/')
                }
                if (contestInfo.beginTime <= (new Date()) * 1) {
                    ContestService.getContestProblems(id)
                        .then(({ contestProblems }) => {

                            setProblemList(contestProblems)
                        })
                }
                setTimeout(() => {
                    NavbarDirectoryManager.setDitectory('contestInfo', {
                        contest: {
                            id,
                            code: contestInfo.code,
                            title: contestInfo.title
                        }
                    })
                }, 100)
                setContestInfo(contestInfo)
            })


    }, [id, navigate])
    return (
        <div className='contestinfo_container'>

            <div className="gridContainer">
                <div className="leftPanel_contest">
                    <div className="card basicInfoContainer">
                        <h2>{contest.title}</h2>
                        <p>Organised by: <span>{contest.hostName}</span> </p>
                        <p>Start Time: {(new Date(contest.startTime)).toLocaleString()}</p>
                        {contest.startTime < (new Date()) * 1 && <>
                            {contest.endTime < (new Date()) * 1 && <b>Contest has ended</b>}
                            {contest.endTime >= (new Date()) * 1 && <CountDown endTime={contest.endTime} />}


                        </>}
                        {contest.startTime > (new Date()) * 1 && <b>Contest hasn't started yet</b>}
                    </div>
                    <div className="card mySubmissionsContainer">
                        <MySubmissionsContainer contest={contest} user={currentUser} />
                    </div>
                </div>
                <div className="problemSetContainer card">
                    <div className='content_subcontainer' style={{ height: 'inherit' }}>
                        <div className="tabSelectionContainer">
                            <div onClick={() => {
                                setSelectedTab(1)
                            }} className={`tabSelectorBtn btn ${selectedTab === 1 ? 'selectedTab' : ''}`}>Problems</div>
                            <div onClick={() => {
                                setSelectedTab(2)
                            }} className={`tabSelectorBtn btn ${selectedTab === 2 ? 'selectedTab' : ''}`}>Global Submissions</div>
                            <div onClick={() => {
                                setSelectedTab(3)
                            }} className={`tabSelectorBtn btn ${selectedTab === 3 ? 'selectedTab' : ''}`}>Rankings</div>
                        </div>
                        {selectedTab === 1 && <ContestProblemSet problems={problems} />}
                        {selectedTab === 2 && <ContestSubmissions contest={contest} currentUser={currentUser} />}
                        {selectedTab === 3 && <ContestRankings currentUser={currentUser} problems={problems} contestId={id} />}

                    </div>
                </div>
            </div>

        </div>
    );
}
function convertMinutesToDHM(minutes) {
    if (typeof minutes !== 'number' || minutes < 0) {
        throw new Error('Invalid input. Please provide a non-negative number of minutes.');
    }

    const oneDayInMinutes = 1440; // 24 hours * 60 minutes
    const oneHourInMinutes = 60;

    const days = Math.floor(minutes / oneDayInMinutes);
    const remainingMinutesAfterDays = minutes % oneDayInMinutes;
    const hours = Math.floor(remainingMinutesAfterDays / oneHourInMinutes);
    const remainingMinutes = remainingMinutesAfterDays % oneHourInMinutes;

    let result = '';
    if (days > 0) {
        result += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
        result += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (remainingMinutes > 0) {
        result += `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''} `;
    }

    return result.trim();
}
const CountDown = React.memo((props) => {
    const [timeRemaining, setTimeRemaining] = React.useState(calculateTimeRemaining());

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 60 * 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    function calculateTimeRemaining() {

        const targetDate = new Date(props.endTime);
        const now = new Date();
        const difference = (targetDate - now);
        const minutesRemaining = Math.ceil(difference / (1000 * 60));
        return minutesRemaining > 0 ? minutesRemaining : 0;
    }
    return (
        <div>

            <p style={{
                fontSize: "12px"
            }}>Time Remaining: {convertMinutesToDHM(timeRemaining)}</p>
        </div>
    );

})


export default ContestInfo;