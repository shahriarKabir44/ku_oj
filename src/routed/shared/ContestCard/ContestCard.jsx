import React from "react"
import ContestService from "../../../services/Contest.service"
import { Link } from "react-router-dom"
import Global from "../../../services/Global"
export default function ContestCard({ contest, currentUser }) {
    function calculateDuration({ startTime, endTime }) {
        let duration = endTime * 1 - startTime * 1
        duration = Math.floor(duration / 60000)
        return `${Math.floor(duration / 60)} Hours, ${duration % 60} minutes`
    }

    return <Link to={`${Global.CLIENT_URL}/contest/${contest.id}`} style={{
        textDecoration: 'none'
    }}>
        <div className="card contestCard">

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

            </div>


        </div>
    </Link>
}
