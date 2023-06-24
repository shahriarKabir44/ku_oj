import React from "react";
import './Standings.css';
import { useParams } from "react-router-dom";



export default function Standings(){
    let {contestId} = useParams();

    return (
        <div className="main-container">
            <div className="title-container">global contest #round 1</div>
            <div className="buttons-container">Buttons here</div>
            <div className="standing-list-container">Standing List here</div>
        </div>

    )
}