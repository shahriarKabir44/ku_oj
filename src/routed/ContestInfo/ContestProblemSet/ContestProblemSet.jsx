import React from 'react'
import './ContestProblemSet.css'
import PersonIcon from '@mui/icons-material/Person';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Link } from 'react-router-dom';
import Global from '../../../services/Global';
export default function ContestProblemSet({ problems }) {
    return (
        <div className="problemListContainer">
            {problems.map((problem, index) => {
                return <Link style={{
                    textDecoration: 'none',
                    color: 'black'
                }} to={`/problem/${problem.id}`} key={index}>
                    <div className="problemListItem">
                        <h2 className="problemLabelContainer">{problem.title}</h2>

                        <div className="extraInfoContainer">
                            <div className="pointsContainer problemDesc_contest">
                                <WorkspacePremiumIcon />
                                <p>{problem.point} pts </p>
                            </div>
                            <div className="submissionCounter problemDesc_contest  ">
                                <PersonIcon /> <p>x{problem.numSolutions}</p>

                            </div>
                        </div>
                    </div>
                </Link>
            })}

        </div>
    );
}
