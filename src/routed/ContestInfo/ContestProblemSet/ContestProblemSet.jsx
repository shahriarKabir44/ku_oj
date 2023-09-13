import React from 'react'
import './ContestProblemSet.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import Global from '../../../services/Global';
export default function ContestProblemSet({ problems, contestResult, isContestRunning }) {
    function getAcceptanceStatus(official, unofficial) {
        if (!official && !unofficial) {

            return ""
        }
        if (official && unofficial) {
            return getEmoji(Math.max(official, unofficial))

        }
        if (official && !unofficial) {
            return getEmoji((official))

        }
        if (unofficial)
            return getEmoji(unofficial)
        return 1
    }
    function getEmoji(flag) {
        return flag === 1 ? '✅' : flag === -1 ? '❌' : ''
    }
    return (
        <div className="problemListContainer">
            {problems.map((problem, index) => {
                return <Link style={{
                    textDecoration: 'none',
                    color: 'black'
                }} to={`${Global.CLIENT_URL}/problem/${problem.id}`} key={index}>
                    <div className="problemListItem">
                        <h2 className="problemLabelContainer">{problem.title}</h2>

                        <div className="extraInfoContainer">
                            <div className="pointsContainer problemDesc_contest">
                                <div className='flex'><WorkspacePremiumIcon />
                                    <p>{problem.points} pts </p>
                                </div>
                                <div className="flex">
                                    <PersonIcon />
                                    <p>x {problem.numSolutions}</p>
                                </div>
                                <div className="submissionCounter problemDesc_contest  ">
                                    {getAcceptanceStatus(contestResult?.officialVerdicts[problem.id], contestResult?.verdicts[problem.id])}

                                </div>
                            </div>

                        </div>
                    </div>
                </Link>
            })}

        </div>
    );
}
