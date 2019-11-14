import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) =>{
    //Generic button definition. Button displays name and adds score accordingly
    return(
        <button onClick={props.onClick}>{props.name}</button>
    )
}

const Statistic = (props) =>{
    //Generic Score component definition for displaying feedback
    return(
        <tr>
            <td>{props.name }</td>
            <td>{props.score}</td>
        </tr>
    )
}

const Statistics = ({stats}) =>{
    //Statistics component displays stats
    
    if (stats.total === 0){
        return(
            <div>
                <h1>Statistics</h1>
                <p>No feedback given. Give us yours!</p>
            </div>
        )
    }

    return(
        <div>
                <h1>Statistics</h1>
                <table>
                    <tbody>
                        <Statistic name="Good" score={stats.good} />
                        <Statistic name="Neutral" score={stats.neutral} />
                        <Statistic name="Bad" score={stats.bad} />
                        <Statistic name="All" score={stats.total} />
                        <Statistic name="Average" score={stats.average} />
                        <Statistic name="Positive" score={stats.percentage} />
                    </tbody>
                </table>
            </div>
    )
}

const App = () => {
    // Save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    //Computes total
    let total = good+neutral+bad

    let average = 0

    let percentage = 0

    //If possible to compute
    if (total !== 0){
    //Computes average
    average = (good-bad)/total

    //Computes percentage
    percentage = 100 * good/total + '%'
    }

    //All stats are wrapped in an object
    let stats ={
        good: good,
        neutral: neutral,
        bad: bad,
        total: total,
        average: average,
        percentage: percentage
    }

    return(
        <div>
            <div>
                <h1>Give feedback</h1>
                <Button name="Good" onClick={() => setGood(good + 1)} />
                <Button name="Neutral" onClick={() => setNeutral(neutral + 1)}/>
                <Button name="Bad" onClick={() => setBad(bad + 1)}/>
            </div>
            <Statistics stats={stats} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
