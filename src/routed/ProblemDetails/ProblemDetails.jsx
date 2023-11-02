import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContestService from '../../services/Contest.service'
import SubmissionsContainer from './utils/SubmissionsContainer/SubmissionsContainer'
import './ProblemDetails.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Global from '../../services/Global'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager'
import CountDown from '../shared/CountDown/CountDown'
import ContestMessenger from '../ContestMessenger/ContestMessenger'

export default function ProblemDetails({ currentUser }) {
    const nav = useNavigate()
    const [contest, setContestInfo] = React.useState({})

    const { problemId } = useParams()
    const [hasSolved, setSolvedFlag] = React.useState(2)
    const [problemInfo, setProblemInfo] = React.useState({})

    React.useEffect(() => {
        ContestService.searchContestByProblem(problemId)
            .then(contest => {
                if (!contest) {
                    nav('/')
                }

                if (contest.endTime >= (new Date()) * 1) {
                    contest.isRunning = true

                }
                setContestInfo(contest)
            })
        try {
            if (currentUser !== null) {
                ContestService.hasSolvedProblem_(currentUser.id, problemId)
                    .then((data) => {
                        const { official, unofficial } = data
                        if (!official && !unofficial) {
                            setSolvedFlag(0)
                            return
                        }
                        if (official && unofficial) {
                            setSolvedFlag(Math.max(official, unofficial))
                            return
                        }
                        if (official && !unofficial) {
                            setSolvedFlag((official))
                            return
                        }
                        setSolvedFlag(unofficial)
                    })

            }
            ContestService.getProblemInfo(problemId)
                .then(({ problemInfo }) => {
                    if (!problemInfo) {
                        nav('/')
                    }
                    NavbarDirectoryManager.setDitectory('problemDescription', {
                        contest: {
                            title: problemInfo.contestCode,
                            id: problemInfo.contestId
                        }, problem: {
                            ...problemInfo
                        }
                    })
                    setProblemInfo(problemInfo)
                })

        } catch (error) {
            console.error('oh no')
        }



    }, [problemId, currentUser])

    return (
        <div className="container_problemDetails">
            <div className="leftPanelsContainer">
                <ContestInfoContainer contest={contest} currentUser={currentUser} />
                <SubmissionsContainer problem={problemInfo} contest={contest} currentUser={currentUser} />
            </div>
            <div className="problemBodyContainer card">
                <div className="problemExtraInfoContainer">
                    <h2 className='problemTitle'>{problemInfo.title}</h2>
                    <div className="pointsContainer">
                        <WorkspacePremiumIcon />
                        <h4>{problemInfo.points} pts</h4>
                        {hasSolved === 1 ? '✅' : hasSolved === -1 ? '❌' : ''}
                    </div>

                </div>
                <div className="problemStatementContainer">
                    <iframe src={Global.SERVER_URL + "/" + problemId + ".pdf"}
                        title="Problem"
                        height={"10%%"}
                        width={"100%"}></iframe>
                </div>
            </div>
            <ContestMessenger currentUser={currentUser} contest={contest} />
        </div>
    );

}





function ContestInfoContainer({ contest }) {

    return <div className="contestInfoContainer card">
        <h2>{contest.title}</h2>
        <p style={{
            fontSize: "12px"
        }}>Start Time: {(new Date(contest.startTime)).toLocaleString()}</p>
        {contest.endTime < (new Date()) * 1 && <b>Contest has ended</b>}
        {contest.endTime >= (new Date()) * 1 && <CountDown content={"Remaining Time"} endTime={contest.endTime} />}




    </div>

}


