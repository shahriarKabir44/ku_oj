import React from 'react'
import './ContestProblemSet.css'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Link } from 'react-router-dom';
import Global from '../../../services/Global';
export default function ContestProblemSet({ problems, contestResult, isContestRunning }) {

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
                                <WorkspacePremiumIcon />
                                <p>{problem.points} pts </p>
                            </div>
                            <div className="submissionCounter problemDesc_contest  ">
                                {(() => {
                                    if (contestResult) {
                                        if (isContestRunning) {
                                            return <p>{contestResult.officialVerdicts[problem.id] === 1 ? '✅' :
                                                contestResult.officialVerdicts[problem.id] === -1 ? '❌' : ''
                                            }</p>
                                        }
                                        else {
                                            return <p>{contestResult.verdicts[problem.id] === 1 ? '✅' :
                                                contestResult.verdicts[problem.id] === -1 ? '❌' : ''
                                            }</p>
                                        }
                                    }
                                    else {
                                        return <></>
                                    }
                                })()}

                            </div>
                        </div>
                    </div>
                </Link>
            })}

        </div>
    );
}
