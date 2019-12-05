import React from 'react';

//Person component renders a single person.



const Person = ({person, handleDelete}) => 
    <div> 
        {person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button>
    </div>

export default Person