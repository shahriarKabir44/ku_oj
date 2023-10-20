import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ContestService from '../../services/Contest.service'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager';
import './ContestInfo.css'
import MySubmissionsContainer from './MySubmissionsContainer/MySubmissionsContainer';
import ContestProblemSet from './ContestProblemSet/ContestProblemSet';
import ContestRankings from './ContestRankings/ContestRankings';
import ContestSubmissions from './ContestSubmissions/ContestSubmissions';
import CountDown from '../shared/CountDown/CountDown';
import ContestMessenger from '../ContestMessenger/ContestMessenger';
import LoaderManager from '../../EventsManager/LoaderManager';
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
    const [isContestRunning, setRunningStatus] = React.useState(false)
    const [problems, setProblemList] = React.useState([])
    const [contestResult, setContestResult] = React.useState(null)
    React.useEffect(() => {
        LoaderManager.toggle()

        ContestService.findContestById(id)
            .then(({ contestInfo }) => {
                if (!contestInfo) {
                    navigate('/')
                }
                if (contestInfo.startTime <= (new Date()) * 1) {
                    ContestService.getContestProblems(id)
                        .then(({ contestProblems }) => {
                            LoaderManager.toggle()

                            setProblemList(contestProblems)

                        })
                    if (contestInfo.endTime >= (new Date()) * 1) {
                        setRunningStatus(true)
                    }

                }

                if (currentUser !== null) {
                    ContestService.getContestResult({
                        userId: currentUser.id,
                        contestId: id
                    }).then(_contestResult => {
                        setContestResult(_contestResult)
                    })
                }
                else {
                    setContestResult(null)
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



    }, [currentUser])
    return (
        <div className='contestinfo_container'>

            <div className="gridContainer">
                <div className="leftPanel_contest">
                    <div className="card basicInfoContainer">
                        <h2>{contest.title}</h2>
                        <p style={{
                            fontSize: "12px"
                        }}>Start Time: {(new Date(contest.startTime)).toLocaleString()}</p>
                        {contest.startTime < (new Date()) * 1 && <>
                            {contest.endTime < (new Date()) * 1 && <b>Contest has ended</b>}
                            {contest.endTime >= (new Date()) * 1 && <CountDown content={"Remaining Time"} endTime={contest.endTime} />}


                        </>}
                        {contest.startTime * 1 > (new Date()) * 1 && <CountDown content={"Before Start"} endTime={contest.startTime} />}
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
                        {selectedTab === 1 && <ContestProblemSet isContestRunning={isContestRunning} contestResult={contestResult} problems={problems} />}
                        {selectedTab === 2 && <ContestSubmissions contest={contest} currentUser={currentUser} />}
                        {selectedTab === 3 && <ContestRankings currentUser={currentUser} problems={problems} contestId={id} />}

                    </div>
                </div>
            </div>
            <ContestMessenger currentUser={currentUser} contest={contest} />
        </div>
    );
}



export default ContestInfo;