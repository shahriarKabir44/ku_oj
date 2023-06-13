import React from "react";
import "./ProblemSet.css";

function ListItem({ contestid, name, points }) {
  return (
    <div className="problemItem">
      <div className="contest-id-item">{contestid}</div>
      <div className="name-item">{name}</div>
      <div className="point-item">{points}</div>
    </div>
  );
}

export default function ProblemSet() {
  let items = [
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
    {
      contestid: 23423,
      name: "capture the rabbit",
      points: 1300,
    },
  ];

  return (
    <div className="Container">
      <div className="title">Problem Set</div>

      <div className="problemList">
        <div className="problemItem">
          <div className="contest-id">Contest ID</div>
          <div className="name">Name</div>
          <div className="point">Points</div>
        </div>
        { items.map((item)=><ListItem {...item}/>)}
      </div>
    </div>
  );
}
