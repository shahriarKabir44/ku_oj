import React from 'react';
import './CreateProblem.css'
function CreateProblem(props) {
    return (
        <div>
            <form action="">
                <label htmlFor="contestTitle">Title</label>
                <input type="text" name="contestTitle" />
                <label htmlFor="statementFile">Problem statement</label>
                <input type="file" name="statementFile" />
            </form>
        </div>
    );
}

export default CreateProblem;