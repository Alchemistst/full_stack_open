import React from 'react';

//Course renders all the course info
const Course = ({course}) =>{
    return(
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Sum parts={course.parts}/>
        </div>
    )
}

//Components:

//Header of the course
const Header = ({name}) => <h1> {name} </h1>

//Content renders all of the parts of the course
const Content = ({parts}) => {
    return(
        <div>
            {parts.map((part)=> 
                <Part 
                    key={part.id} 
                    name={part.name} 
                    exercises={part.exercises}
                />)
            }
        </div>
    )
}

//Part renders each part of the course
const Part = ({name,exercises}) => <p>{name} {exercises}</p>

//Sum displays the total number of exercises using reduce
const Sum = (props) =>{
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
        <p>
            <b>Total of {total} exercises</b>
        </p>
    )
}

export default Course