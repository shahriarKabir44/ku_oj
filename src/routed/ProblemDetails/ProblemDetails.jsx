import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContestService from '../../services/Contest.service'
import SubmissionsContainer from './utils/SubmissionsContainer/SubmissionsContainer'
import './ProblemDetails.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Global from '../../services/Global'
import NavbarDirectoryManager from '../../EventsManager/NavbarDirectoryManager'


export default function ProblemDetails({ currentUser }) {
    const nav = useNavigate()
    const [contest, setContestInfo] = React.useState({})

    const { problemId } = useParams()


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



    }, [problemId])

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
                    </div>

                </div>
                <div className="problemStatementContainer">
                    <iframe src={Global.SERVER_URL + problemInfo.statementFileURL}
                        title="Problem"
                        height={"10%%"}
                        width={"100%"}></iframe>
                </div>
            </div>
        </div>
    );

}





function ContestInfoContainer({ contest }) {
    const isContestRunning = contest.endTime >= (new Date()) * 1

    return <div className="contestInfoContainer card">
        <h3 style={{
            margin: 0
        }}>{contest.title}</h3>
        {isContestRunning && <div style={{
            display: 'flex',
            gap: "10px"
        }}><h5>Time left:</h5>  <h3>1 hr 3 mins</h3> </div>}
        {!isContestRunning && <div style={{
            display: 'flex',
            gap: "10px"
        }}>   <h3>Contest ended</h3> </div>}

    </div>

}


