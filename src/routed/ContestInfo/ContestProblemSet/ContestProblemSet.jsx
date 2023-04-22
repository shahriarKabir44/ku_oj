import React from 'react'
import './ContestProblemSet.css'
export default function ContestProblemSet({ problems }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>John</td>
                    <td>30</td>
                    <td>New York</td>
                </tr>
                <tr>
                    <td>Jane</td>
                    <td>25</td>
                    <td>London</td>
                </tr>
                <tr>
                    <td>Bob</td>
                    <td>40</td>
                    <td>Tokyo</td>
                </tr>
            </tbody>
        </table>
    );
}
