import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Global from '../../services/Global';
import ContestService from '../../services/Contest.service'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager';
import './ContestInfo.css'
import UserService from '../../services/User.service';
import ContestProblemSet from './ContestProblemSet/ContestProblemSet';
import ContestRankings from './ContestRankings/ContestRankings';
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
                setTimeout(() => {
                    NavbarDirectoryManager.setDitectory('contestInfo', {
                        contest: {
                            id,
                            title: contestInfo.code
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
        <div className='contestinfo_container'>

            <div className="gridContainer">
                <div className="leftPanel_contest">
                    <div className="card basicInfoContainer">
                        <h3>{contest.title}</h3>
                        <p>Organised by: <span>{contest.hostName}</span> </p>
                        <h5>Time left:</h5>
                        <h3>1 hr 3 mins</h3>
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
                        {selectedTab === 3 && <ContestRankings currentUser={currentUser} problems={problems} contestId={id} />}

                    </div>
                </div>
            </div>

        </div>
    );
}

function MySubmissionsContainer({ contest, user }) {
    const [mySubmissions, setMySubmissions] = React.useState([])
    React.useEffect(() => {
        if (user)
            UserService.getContestSubmissions(user.id, contest.id)
                .then(submissions => {
                    setMySubmissions(submissions)
                })

    }, [contest, user])
    return <div className="submissionsListContainer">
        {!user && <h4>You need to log in to see your submissions</h4>}
        {user && <>
            {mySubmissions.length === 0 && <h4>You haven't made any submission</h4>}
        </>}
        {user && mySubmissions.length !== 0 && <div style={{ height: 'inherit' }}>
            <h2 style={{ margin: 0 }}>Your submisions</h2>

            <div className="contestSubmissionContainer">
                <table>
                    <thead style={{
                        position: 'sticky',
                        top: '0'
                    }}>
                        <tr>
                            <th>Time</th>
                            <th>Problem</th>
                            <th>Language</th>
                            <th>Verdict</th>
                            <th>Exec. time</th>
                        </tr>

                    </thead>
                    <tbody>
                        {mySubmissions.map((submission, index) => {
                            return <tr key={index}>
                                <td>
                                    <Link style={{
                                        fontSize: '12px'
                                    }} to={`${Global.CLIENT_URL}/submission/${user.id}/${contest.id}/${submission.id}`}>{(new Date(submission.time)).toLocaleString()} </Link>
                                </td>
                                <td>
                                    <Link style={{
                                        fontSize: '12px'
                                    }} to={`${Global.CLIENT_URL}/problem/${submission.problemId}`}>{submission.problemName} </Link>
                                </td>
                                <td>
                                    {submission.language}
                                </td>
                                <td>
                                    {submission.verdict}
                                </td>
                                <td>
                                    {submission.execTime} (ms)
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        </div>}
    </div>
}


export default ContestInfo;