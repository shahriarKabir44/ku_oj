import React from "react";
import './Standings.css';
import { useParams } from "react-router-dom";



export default function Standings(){
    let {contestId} = useParams();

    return (
        <div className="main-container">
            <div className="title-container">global contest #round 1</div>
            <div className="buttons-container">
                <div className="button">Problems</div>
                <div className="button">Global Submissions</div>
                <div className="button selected">Standings</div>

            </div>
            <div className="standing-list-container">Standing List here</div>
        </div>

    )
}