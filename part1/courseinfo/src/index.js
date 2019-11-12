import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  //Main data as one single object
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  //Component for Header section. Info is passed as props.
  const Header = (props) => (
        <h1>{props.course}</h1>
  )

  //Component for Part. Each part is passed as props the info that needs to be rendered from Content.
  const Part = (props) => {
      return(
        <div>
            {props.name} {props.exercises}
        </div>
      )
  }

  //Component for Content. Content renders all the Part components. Content gets all data passed as props.
  const Content = (props) => (
      <div>
            <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
            <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
            <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
      </div>
  )

  //Component for Total.
  const Total = (props) =>{
    let total = 0
    props.parts.forEach(part => {
        total += part.exercises
    })
    return(
        <p>Number of exercises {total}</p>
  )}

  
  return (
    <div>
      <Header course = {course.name}/>
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
